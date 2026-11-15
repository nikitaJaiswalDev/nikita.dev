import './globals.css';
import type { Metadata } from 'next';
import { Caveat, Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
  weight: ['500'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nikita Jaiswal — AI Product Engineer',
  description: 'AI Product Engineer building and shipping AI products end-to-end: voice agents, RAG pipelines, clinical AI, billing and auth.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSerif.variable} ${caveat.variable} ${jetbrainsMono.variable} bg-page font-sans text-ink antialiased`}
      >
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
