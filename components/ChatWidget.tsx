'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Send, X } from 'lucide-react';
import { FALLBACK, STARTERS, WELCOME, matchTopic, topicById, type ChatAction } from '@/lib/chat-script';
import { cn } from '@/lib/utils';

type Message =
  | { role: 'user'; text: string }
  | { role: 'bot'; text: string; actions?: ChatAction[]; followUps?: string[] };

const TYPING_DELAY = 550;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: WELCOME, followUps: STARTERS }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isOpen, messages, typing]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const reply = useCallback((userText: string, topicId?: string) => {
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setTyping(true);
    const topic = topicId ? topicById(topicId) : matchTopic(userText);
    const answer = topic ?? FALLBACK;
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: answer.answer, actions: answer.actions, followUps: answer.followUps },
      ]);
    }, TYPING_DELAY);
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput('');
    reply(text);
  };

  const lastBotIndex = messages.map((m) => m.role).lastIndexOf('bot');

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          'fixed bottom-5 right-5 z-[9999] flex h-14 items-center gap-2 rounded-full pl-4 pr-5 text-sm font-semibold shadow-[0_12px_30px_-10px_rgb(var(--c-brand)/0.6)] transition-all duration-300 sm:bottom-6 sm:right-6',
          isOpen ? 'w-14 justify-center bg-elevated pl-0 pr-0 text-ink ring-1 ring-line' : 'bg-brand text-white hover:bg-brand-hover'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Ask about Nikita</span>
          </>
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with Nikita's assistant"
          className="fixed inset-x-3 bottom-24 top-20 z-[9998] flex animate-fade-in-up flex-col overflow-hidden rounded-3xl border border-line bg-elevated shadow-[0_30px_70px_-20px_rgb(var(--c-ink)/0.35)] sm:inset-x-auto sm:right-6 sm:top-auto sm:h-[560px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-brand px-5 py-4 text-white">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
              <Image src="/nikita.jpg" alt="" fill sizes="40px" className="object-cover object-[50%_25%]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Nikita&apos;s assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Instant answers about her work
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-page px-4 py-5" aria-live="polite">
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={i} className="space-y-2.5">
                  <p className="max-w-[88%] whitespace-pre-line rounded-2xl rounded-bl-md border border-line bg-elevated px-4 py-3 text-sm leading-relaxed text-ink">
                    {m.text}
                  </p>

                  {m.actions && m.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {m.actions.map((a) => (
                        <a
                          key={a.label}
                          href={a.href}
                          {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          onClick={() => a.href.startsWith('#') && setIsOpen(false)}
                          className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
                        >
                          {a.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Suggestions only under the latest answer */}
                  {i === lastBotIndex && !typing && m.followUps && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {m.followUps.map((id) => {
                        const t = topicById(id);
                        if (!t) return null;
                        return (
                          <button
                            key={id}
                            onClick={() => reply(t.label, t.id)}
                            className="rounded-full border border-brand-soft/40 bg-elevated px-3 py-1.5 text-xs font-medium text-brand-soft transition-colors hover:border-brand-soft hover:bg-brand-tint"
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}

            {typing && (
              <div className="flex w-fit gap-1.5 rounded-2xl rounded-bl-md border border-line bg-elevated px-4 py-3.5" aria-label="Typing">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-faint" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-line bg-elevated p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              maxLength={300}
              className="flex-1 rounded-full border border-line bg-code px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-brand-soft focus:outline-none focus:ring-[3px] focus:ring-brand-soft/15"
              aria-label="Your question"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
