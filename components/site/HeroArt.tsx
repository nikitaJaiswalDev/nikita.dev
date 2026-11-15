import { Mic, PhoneCall } from 'lucide-react';

const bars = [6, 14, 22, 12, 28, 18, 34, 20, 26, 10, 30, 16, 24, 8, 20, 12, 26, 14, 8];

/**
 * Illustration for the hero: a soft blob with a "live AI call" app window
 * and a pinned sticky note. Pure markup/CSS — no image assets needed.
 */
export default function HeroArt() {
  return (
    <div aria-hidden className="relative mx-auto aspect-[5/4] w-full max-w-[560px] select-none">
      {/* Blob backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-tint via-surface to-highlight"
        style={{ borderRadius: '58% 42% 46% 54% / 46% 52% 48% 54%' }}
      />
      {/* Window-light stripes */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          borderRadius: '58% 42% 46% 54% / 46% 52% 48% 54%',
          background:
            'repeating-linear-gradient(115deg, transparent 0 38px, rgb(255 255 255 / 0.55) 38px 70px, transparent 70px 120px)',
          maskImage: 'linear-gradient(to bottom right, #000 10%, transparent 65%)',
          WebkitMaskImage: 'linear-gradient(to bottom right, #000 10%, transparent 65%)',
        }}
      />

      {/* App window */}
      <div className="absolute left-[9%] top-[24%] w-[70%] rotate-[-2deg] overflow-hidden rounded-2xl border border-line bg-elevated shadow-[0_30px_60px_-24px_rgb(var(--c-ink)/0.35)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 text-[10px] font-medium text-faint">Live call · AI receptionist</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-brand-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-2" />
            LIVE
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
              <PhoneCall className="h-3.5 w-3.5" />
            </span>
            <div className="flex h-8 flex-1 items-center gap-[3px]">
              {bars.map((h, i) => (
                <span key={i} className="w-[3px] rounded-full bg-brand-soft/70" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span className="font-mono-label text-[10px] text-faint">02:14</span>
          </div>

          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-surface px-3 py-2 text-[11px] leading-snug text-subtle">
            Hi! Can I book a haircut for Saturday morning?
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-[11px] leading-snug text-white">
            Of course. I have 10:30 or 11:15 free. Which works for you?
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {['Deepgram', 'Claude', 'Cartesia'].map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[9px] font-semibold text-brand-soft">{s}</span>
                {i < 2 && <span className="text-[9px] text-faint">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mic bubble */}
      <div className="absolute bottom-[12%] left-[4%] flex h-12 w-12 items-center justify-center rounded-2xl bg-elevated text-brand-soft shadow-[0_12px_30px_-12px_rgb(var(--c-ink)/0.4)]">
        <Mic className="h-5 w-5" />
      </div>

      {/* Sticky note */}
      <div className="absolute right-[5%] top-[8%] w-[28%] min-w-[118px] rotate-[4deg] bg-[#FBFAF6] px-4 pb-4 pt-5 font-hand text-[clamp(1rem,2vw,1.35rem)] leading-tight text-ink shadow-[0_14px_30px_-14px_rgb(var(--c-ink)/0.45)]">
        <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-soft shadow" />
        <p>Build ✓</p>
        <p>Ship ✓</p>
        <p>Iterate ✓</p>
        <p>Impact ♡</p>
      </div>
    </div>
  );
}
