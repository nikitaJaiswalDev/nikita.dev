import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields required' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'nikujais2405@gmail.com',
      replyTo: email,
      subject: `New Contact: ${subject} — from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; 
             margin: 0 auto; background: #0D0D1A; color: #F0F0F5; 
             padding: 32px; border-radius: 12px;">
          
          <h2 style="color: #6C63FF; margin-bottom: 24px;">
            New Portfolio Contact
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1E2A45;">
              <td style="padding: 12px 0; color: #8892A4; width: 120px;">
                Name
              </td>
              <td style="padding: 12px 0; color: #F0F0F5;">
                ${name}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #1E2A45;">
              <td style="padding: 12px 0; color: #8892A4;">
                Email
              </td>
              <td style="padding: 12px 0;">
                <a href="mailto:${email}" style="color: #6C63FF;">
                  ${email}
                </a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #1E2A45;">
              <td style="padding: 12px 0; color: #8892A4;">
                Subject
              </td>
              <td style="padding: 12px 0; color: #F0F0F5;">
                ${subject}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #8892A4; 
                   vertical-align: top;">
                Message
              </td>
              <td style="padding: 12px 0; color: #F0F0F5; 
                   line-height: 1.6;">
                ${message.replace(/\n/g, '<br/>')}
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; 
               background: #141830; border-radius: 8px;
               border: 1px solid #1E2A45;">
            <p style="margin: 0; color: #8892A4; font-size: 13px;">
              Sent from your portfolio contact form<br/>
              ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>

          <div style="margin-top: 16px; text-align: center;">
            <a href="mailto:${email}" 
               style="display: inline-block; background: #6C63FF; 
                      color: white; padding: 12px 24px; 
                      border-radius: 6px; text-decoration: none;
                      font-size: 14px;">
              Reply to ${name}
            </a>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send' },
      { status: 500 }
    )
  }
}
