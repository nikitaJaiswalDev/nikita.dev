/**
 * Scripted (non-LLM) assistant for the portfolio chat widget.
 *
 * Each topic has: a chip label, keywords used to match typed questions,
 * an answer, optional action buttons, and follow-up topics to suggest next.
 * Answers read from content.json so they stay in sync with the site.
 *
 * To add a question: add a topic below and list its id in some `followUps`
 * (or in STARTERS) so visitors can reach it.
 */
import content from '@/content.json';

export type ChatAction = { label: string; href: string; external?: boolean };

export type Topic = {
  id: string;
  /** Text on the suggestion chip (also shown as the visitor's message). */
  label: string;
  /** Lowercase words/phrases that point to this topic. */
  keywords: string[];
  /** Extra weight for very specific keywords (e.g. product names). */
  weight?: number;
  answer: string;
  actions?: ChatAction[];
  followUps?: string[];
};

const { personal, projects, experience, skills, availability } = content;
const project = (name: string) => projects.find((p) => p.name === name);
const live = (name: string) => project(name)?.live ?? undefined;

const contactActions: ChatAction[] = [
  { label: 'Open contact form', href: '#contact' },
  { label: 'Email Nikita', href: `mailto:${personal.email}` },
];

const productTopic = (id: string, name: string, keywords: string[]): Topic => {
  const p = project(name);
  return {
    id,
    label: name,
    keywords,
    weight: 3,
    answer: p
      ? `${p.name} (${p.tagline}): ${'summary' in p && p.summary ? p.summary : p.description}\n\n${p.achievements
          .slice(0, 3)
          .map((a) => `• ${a}`)
          .join('\n')}\n\nNikita's role: ${'role' in p && p.role ? p.role : 'Developer'}.`
      : `${name} is one of Nikita's products.`,
    actions: [
      ...(live(name) ? [{ label: `Visit ${name}`, href: live(name)!, external: true }] : []),
      { label: 'See all projects', href: '#projects' },
    ],
    followUps: ['projects', 'availability', 'contact'],
  };
};

export const TOPICS: Topic[] = [
  {
    id: 'greeting',
    label: 'Hi!',
    keywords: ['hi', 'hello', 'hey', 'hii', 'namaste', 'good morning', 'good evening', 'yo'],
    weight: 0.5, // any real question in the same message wins
    answer: `Hello! 👋 I can tell you about ${personal.name}'s work, projects, skills and availability. Pick a question below or type your own.`,
    followUps: ['about', 'projects', 'availability'],
  },
  {
    id: 'about',
    label: 'Who is Nikita?',
    keywords: ['who', 'introduce', 'background', 'yourself', 'summary', 'nikita', 'profile'],
    answer: `${personal.name} is an AI Product Engineer with 5+ years of full-stack experience, based in Ludhiana, India. She builds AI products end to end: LLM agents, RAG pipelines, real-time voice AI and healthcare AI, plus the billing, auth and cloud systems behind them. She has shipped 4 live AI products.`,
    followUps: ['projects', 'services', 'experience'],
  },
  {
    id: 'services',
    label: 'What can she build?',
    keywords: ['build', 'services', 'service', 'help', 'offer', 'what does she do', 'what can she do', 'what do you do', 'specialize', 'speciality', 'expertise'],
    answer:
      'Nikita can help you build:\n• AI-powered apps: tool-calling LLM agents, RAG over your data, safety guardrails\n• Real-time voice AI: phone agents on LiveKit with Deepgram, Claude/OpenAI and Cartesia\n• SaaS backends: multi-tenant Postgres, Stripe usage billing, MFA and RBAC\n• Integrations: WhatsApp, Google Calendar, EHRs, Stripe, shipped on AWS/GCP with CI/CD',
    actions: [{ label: 'See services', href: '#services' }],
    followUps: ['projects', 'availability', 'rates'],
  },
  {
    id: 'projects',
    label: 'Show me her projects',
    keywords: ['project', 'projects', 'portfolio', 'built', 'products', 'product', 'work samples', 'case study', 'shipped', 'apps'],
    answer: `Her featured AI products:\n${projects
      .filter((p) => p.featured)
      .map((p) => `• ${p.name}: ${p.tagline}`)
      .join('\n')}\n\nAsk about any of them by name for details.`,
    actions: [{ label: 'See projects', href: '#projects' }],
    followUps: ['heymeena', 'moonaria-care', 'moonaria-insights', 'docly'],
  },
  productTopic('heymeena', 'Heymeena', ['heymeena', 'meena', 'receptionist', 'voice receptionist', 'salon', 'restaurant']),
  productTopic('moonaria-care', 'Moonaria Care', ['moonaria care', 'wellness', 'mental health', 'companion', 'therapy', 'dsm']),
  productTopic('moonaria-insights', 'Moonaria Insights', ['moonaria insights', 'insights', 'scribe', 'ehr', 'clinical notes', 'soap', 'therapist', 'chrome extension', 'extension']),
  productTopic('docly', 'Docly', ['docly', 'scheduling', 'appointment', 'appointments', 'clinic', 'booking', 'whatsapp']),
  {
    id: 'voice',
    label: 'Voice AI experience?',
    keywords: ['voice', 'call', 'calls', 'phone', 'livekit', 'deepgram', 'cartesia', 'elevenlabs', 'speech', 'telephony', 'sip', 'tts', 'stt'],
    weight: 2,
    answer:
      'Yes, voice AI is one of her specialities. On Heymeena she works on real-time phone agents (LiveKit Agents with Deepgram → Claude → Cartesia, over Telnyx SIP). On Moonaria Care she shipped real-time voice with custom avatars and cloned voices. She has also worked with medical speech-to-text (Deepgram Nova-2 Medical, AssemblyAI, ElevenLabs Scribe).',
    followUps: ['heymeena', 'ai', 'availability'],
  },
  {
    id: 'ai',
    label: 'LLM & RAG experience?',
    keywords: ['llm', 'rag', 'agent', 'agents', 'ai', 'gpt', 'openai', 'claude', 'anthropic', 'bedrock', 'embedding', 'embeddings', 'pinecone', 'vector', 'prompt', 'tool calling', 'chatbot'],
    answer:
      'Lots of it. She built a tool-calling agent with 14 tools and a safety-scan layer (Moonaria Care), RAG over DSM-5 and over per-patient session transcripts with OpenAI embeddings and Pinecone, and one shared LLM service over OpenAI and AWS Bedrock with token tracking and usage billing. She works with Claude, OpenAI and Bedrock.',
    followUps: ['moonaria-care', 'voice', 'stack'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare / HIPAA?',
    keywords: ['hipaa', 'healthcare', 'health', 'medical', 'clinical', 'patient', 'patients', 'phi', 'compliance', 'gdpr', 'security', 'encryption'],
    weight: 2,
    answer:
      'Healthcare is her strongest domain. Moonaria Insights (an AI scribe + EHR), Moonaria Care and Docly all handle patient data with HIPAA-oriented practices: AES-256-GCM encryption, RBAC, audit logs, consent and BAA flows. Before that she led BEEK Health, an AI lab-test platform.',
    followUps: ['moonaria-insights', 'docly', 'availability'],
  },
  {
    id: 'stack',
    label: 'What is her tech stack?',
    keywords: ['stack', 'tech', 'technology', 'technologies', 'skills', 'skill', 'language', 'languages', 'framework', 'react', 'node', 'python', 'typescript', 'nextjs', 'next.js', 'fastapi', 'postgres', 'aws', 'gcp', 'docker'],
    answer: `• AI: ${skills.ai.slice(0, 7).join(', ')}\n• Languages: ${skills.languages.join(', ')}\n• Frontend: ${skills.frontend.slice(0, 4).join(', ')}\n• Backend: ${skills.backend.slice(0, 6).join(', ')}\n• Data: ${skills.databases.slice(0, 3).join(', ')}\n• Cloud: ${skills.cloud.join(', ')}`,
    actions: [{ label: 'See tech stack', href: '#skills' }],
    followUps: ['ai', 'experience', 'services'],
  },
  {
    id: 'experience',
    label: 'Her work experience',
    keywords: ['experience', 'years', 'job', 'jobs', 'career', 'company', 'companies', 'worked', 'resume', 'cv', 'previous', 'employer', 'senior'],
    answer: `5+ years in total:\n${experience.map((e) => `• ${e.role}, ${e.company} (${e.period.replace(' — ', ' – ')})`).join('\n')}`,
    actions: [{ label: 'See experience', href: '#experience' }],
    followUps: ['projects', 'stack', 'availability'],
  },
  {
    id: 'availability',
    label: 'Is she available?',
    keywords: ['available', 'availability', 'hire', 'hiring', 'freelance', 'contract', 'full time', 'full-time', 'job offer', 'open to', 'start', 'opportunity', 'work with', 'onboard'],
    weight: 2,
    answer: `Yes! ${availability.status}. ${content.contact.availability}. The quickest way to start is the contact form: share a few lines about your project and she usually replies within 24 hours.`,
    actions: contactActions,
    followUps: ['rates', 'services', 'location'],
  },
  {
    id: 'rates',
    label: 'What are her rates?',
    keywords: ['rate', 'rates', 'price', 'pricing', 'cost', 'charge', 'fee', 'fees', 'budget', 'quote', 'hourly', 'salary', 'ctc', 'expensive'],
    weight: 2,
    answer:
      "Rates depend on scope, timeline and engagement type (fixed project, monthly contract or full-time). Send a short brief through the contact form and she'll come back with an estimate.",
    actions: contactActions,
    followUps: ['availability', 'services'],
  },
  {
    id: 'location',
    label: 'Where is she based?',
    keywords: ['where', 'location', 'based', 'country', 'city', 'india', 'timezone', 'time zone', 'remote', 'relocate', 'onsite', 'hours'],
    answer:
      'She is based in Ludhiana, Punjab, India (IST, UTC+5:30) and works remotely with teams worldwide. She can overlap with European and US East Coast hours.',
    followUps: ['availability', 'contact'],
  },
  {
    id: 'contact',
    label: 'How do I contact her?',
    keywords: ['contact', 'email', 'mail', 'reach', 'talk', 'connect', 'linkedin', 'message her', 'get in touch', 'phone number', 'number', 'meeting', 'schedule'],
    answer: `You can use the contact form on this page, email ${personal.email}, or connect on LinkedIn.`,
    actions: [...contactActions, { label: 'LinkedIn', href: personal.linkedin, external: true }],
    followUps: ['availability', 'rates'],
  },
  {
    id: 'thanks',
    label: 'Thanks!',
    keywords: ['thanks', 'thank', 'thank you', 'thx', 'great', 'awesome', 'cool', 'ok', 'okay', 'bye'],
    weight: 0.5,
    answer: "You're welcome! If you'd like to work together, the contact form is the fastest way to reach Nikita.",
    actions: [{ label: 'Open contact form', href: '#contact' }],
    followUps: ['projects', 'availability'],
  },
];

export const STARTERS = ['about', 'projects', 'services', 'availability', 'contact'];

export const WELCOME =
  "Hi! I'm Nikita's assistant. Pick a question below or type your own, and I'll answer from her portfolio.";

export const FALLBACK: Pick<Topic, 'answer' | 'actions' | 'followUps'> = {
  answer:
    "Sorry, I only have answers to common questions, so I didn't catch that one. Try one of these, or send your question to Nikita directly and she'll reply personally.",
  actions: contactActions,
  followUps: ['about', 'projects', 'availability', 'contact'],
};

export const topicById = (id: string) => TOPICS.find((t) => t.id === id);

const normalize = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/[^a-z0-9.+\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;

/** Picks the best-matching topic for typed text, or null if nothing matches. */
export function matchTopic(text: string): Topic | null {
  const q = normalize(text);
  let best: Topic | null = null;
  let bestScore = 0;

  for (const topic of TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      // whole-word / whole-phrase match, so "hi" doesn't match "hire"
      if (q.includes(` ${kw} `)) score += (topic.weight ?? 1) * (kw.includes(' ') ? 2 : 1);
    }
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }
  return best;
}
