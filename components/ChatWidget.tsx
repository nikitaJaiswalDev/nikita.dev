'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Nikita's AI assistant. Ask me anything about her experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I had trouble responding. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-[#1E2A45] rotate-90 scale-90'
            : 'bg-[#6C63FF] hover:scale-110 hover:shadow-[0_0_30px_rgba(108,99,255,0.5)]'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#F0F0F5]" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[360px] h-[480px] rounded-2xl bg-[#141830] border border-[#1E2A45] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2A45] bg-[#141830]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-5 h-5 text-[#6C63FF]" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <h3 className="text-sm font-semibold text-[#F0F0F5] font-[family-name:var(--font-space-grotesk)]">
                Chat with Nikita&apos;s AI
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8892A4] hover:text-[#F0F0F5] transition-colors duration-200"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-[#6C63FF]/20'
                      : 'bg-[#00D9FF]/10'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-[#6C63FF]" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-[#00D9FF]" />
                  )}
                </div>
                <div
                  className={`max-w-[260px] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-[#6C63FF]/15 text-[#F0F0F5] rounded-tr-sm'
                      : 'bg-[#0D0D1A] text-[#F0F0F5]/90 border border-[#1E2A45]/50 rounded-tl-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#00D9FF]/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#00D9FF]" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#0D0D1A] border border-[#1E2A45]/50 rounded-tl-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8892A4] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#8892A4] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#8892A4] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
                  {error}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-[#1E2A45] bg-[#141830]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Nikita..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0D0D1A] border border-[#1E2A45] text-sm text-[#F0F0F5] placeholder:text-[#8892A4]/60 focus:outline-none focus:border-[#6C63FF]/50 transition-colors duration-200"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-[#6C63FF] flex items-center justify-center text-white hover:bg-[#5a52e0] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
