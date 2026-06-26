# nikita.dev — Personal Portfolio

Personal portfolio website of **Nikita Jaiswal**, Senior Full Stack Developer specializing in Node.js, React.js, and AI integration.

🌐 **Live Site:** [nikitajaiswal.com](https://nikitajaiswal.com)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Chatbot:** Anthropic Claude API (claude-sonnet-4-6)
- **Deployment:** Vercel
- **Content:** JSON-driven (`/data/content.json`)

---

## Features

- Fully responsive dark navy portfolio
- JSON-driven content — update all data from a single file
- AI-powered chatbot representing Nikita's professional profile
- Smooth scroll navigation
- Scroll-triggered animations
- Project showcase with tech stack details
- Optimized for performance and SEO

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/nikitaJaiswalDev/nikita.dev.git
cd nikita.dev
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure