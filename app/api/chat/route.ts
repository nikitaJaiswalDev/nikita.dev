import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import contentData from '@/content.json';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const systemPrompt = `You are an AI assistant representing ${contentData.personal.name}, a ${contentData.personal.title}. You help visitors learn about ${contentData.personal.name}'s background, skills, experience, projects, and professional interests.

Here is ${contentData.personal.name}'s complete profile information:

PERSONAL:
- Name: ${contentData.personal.name}
- Title: ${contentData.personal.title}
- Tagline: ${contentData.personal.tagline}
- Email: ${contentData.personal.email}
- GitHub: ${contentData.personal.github}
- LinkedIn: ${contentData.personal.linkedin}

ABOUT:
${contentData.about.summary}

Key highlights:
${contentData.about.highlights.map(h => `- ${h}`).join('\n')}

SKILLS:
- Languages: ${contentData.skills.languages.join(', ')}
- Frontend: ${contentData.skills.frontend.join(', ')}
- Backend: ${contentData.skills.backend.join(', ')}
- Cloud & Infra: ${contentData.skills.cloud.join(', ')}
- Databases: ${contentData.skills.databases.join(', ')}
- Tools: ${contentData.skills.tools.join(', ')}

EXPERIENCE:
${contentData.experience.map((exp, idx) => `
${idx + 1}. ${exp.company} (${exp.period}) — ${exp.role}
Role info: ${exp.description}
Achievements:
${exp.achievements.map(a => `- ${a}`).join('\n')}
Tech: ${exp.technologies.join(', ')}`).join('\n')}

PROJECTS:
${contentData.projects.map((proj, idx) => `
${idx + 1}. ${proj.name} — ${proj.tagline} (${proj.period})
Description: ${proj.description}
Achievements:
${proj.achievements.map(a => `- ${a}`).join('\n')}
Tech: ${proj.technologies.join(', ')}
${proj.live ? `Live Link: ${proj.live}` : ''}`).join('\n')}

FREELANCE AVAILABILITY:
- Status: ${contentData.availability.status}
- Focus: ${contentData.availability.subheading}
- Contact: Email ${contentData.availability.cta_email} or visit ${contentData.availability.cta_linkedin}.

INSTRUCTIONS:
- Be helpful, friendly, and professional.
- Keep responses concise (2-4 sentences unless the user asks for detail).
- If a visitor shows interest in freelance work, hiring ${contentData.personal.name}, or getting in touch, proactively ask them for their email, phone number, and a brief description of their requirements so that ${contentData.personal.name} can reach out to them directly.
- If asked about something not in the profile, say you don't have that information and suggest contacting ${contentData.personal.name} directly at ${contentData.personal.email}.
- Don't make up information not present in this profile.
- Use "she/her" pronouns for ${contentData.personal.name}.
- When discussing projects, mention the relevant tech stack.`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages.map((m: { role: string; content: string }) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Send email notification (fire-and-forget)
    try {
      if (process.env.RESEND_API_KEY) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'user') {
          const visitorMessage = lastMessage.content;
          const resend = new Resend(process.env.RESEND_API_KEY);

          resend.emails.send({
            from: 'Portfolio Chatbot <onboarding@resend.dev>',
            to: 'nikujais2405@gmail.com',
            subject: 'New Portfolio Visitor — Chatbot Message',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <title>New Portfolio Visitor — Chatbot Message</title>
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0D0D1A; color: #F0F0F5; margin: 0; padding: 20px; -webkit-font-smoothing: antialiased;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #141830; border: 1px solid #1E2A45; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);">
                  <div style="background-color: #1E2A45; padding: 20px 24px; border-bottom: 1px solid #2B3A5A;">
                    <h1 style="color: #6C63FF; margin: 0; font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                      New Chatbot Interaction
                    </h1>
                  </div>
                  <div style="padding: 24px;">
                    <div style="margin-bottom: 24px;">
                      <span style="font-size: 12px; color: #8892A4; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: block; margin-bottom: 8px;">
                        Visitor Message
                      </span>
                      <div style="background-color: #0D0D1A; border: 1px solid #1E2A45; border-radius: 8px; padding: 16px; color: #F0F0F5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${visitorMessage}</div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                      <span style="font-size: 12px; color: #8892A4; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: block; margin-bottom: 8px;">
                        AI Response
                      </span>
                      <div style="background-color: #0D0D1A; border: 1px solid #1E2A45; border-radius: 8px; padding: 16px; color: #00D9FF; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${reply}</div>
                    </div>
                    
                    <div style="border-top: 1px solid #1E2A45; padding-top: 16px; margin-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #8892A4;">
                      <span>Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</span>
                    </div>
                  </div>
                </div>
              </body>
              </html>
            `
          }).catch(err => {
            console.error('Failed to send email via Resend:', err);
          });
        }
      }
    } catch (emailErr) {
      console.error('Resend instantiation or email execution failed:', emailErr);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
