import Image from 'next/image';
import { CalendarCheck, FileText, HeartHandshake, PhoneCall } from 'lucide-react';

type Props = { name: string; image?: string | null };

/**
 * Top visual of a project card. Uses the real screenshot when `image` is set
 * in content.json (put files in /public/projects/), otherwise a small
 * illustrated mock of that product's UI.
 */
export default function ProjectVisual({ name, image }: Props) {
  if (image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image src={image} alt={`${name} screenshot`} fill sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
      </div>
    );
  }

  return (
    <div aria-hidden className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-tint via-surface to-highlight/70">
      <div className="absolute inset-x-[10%] bottom-0 top-[16%] rounded-t-xl border border-b-0 border-line bg-elevated shadow-[0_20px_40px_-20px_rgb(var(--c-ink)/0.35)] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-1 border-b border-line px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="ml-2 text-[9px] font-semibold text-faint">{name}</span>
        </div>
        <div className="p-3">{mocks[name] ?? mocks.default}</div>
      </div>
    </div>
  );
}

const line = (w: string, tone = 'bg-line') => <span className={`block h-1.5 rounded-full ${tone}`} style={{ width: w }} />;

const mocks: Record<string, JSX.Element> = {
  Heymeena: (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 rounded-lg bg-surface p-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
          <PhoneCall className="h-3 w-3" />
        </span>
        <div className="flex h-6 flex-1 items-center gap-[2px]">
          {[4, 10, 16, 8, 20, 12, 18, 6, 14, 10, 18, 8, 12, 16, 6].map((h, i) => (
            <span key={i} className="w-[2px] rounded-full bg-brand-soft/70" style={{ height: h }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {['Calls', 'Booked', 'Margin'].map((k) => (
          <div key={k} className="rounded-md border border-line p-1.5">
            <p className="text-[7px] text-faint">{k}</p>
            {line('70%', 'bg-brand-soft/40')}
          </div>
        ))}
      </div>
    </div>
  ),
  'Moonaria Care': (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[8px] font-semibold text-brand-soft">
        <HeartHandshake className="h-3 w-3" /> CBT session
      </div>
      <div className="w-3/4 space-y-1 rounded-lg rounded-bl-sm bg-surface p-2">{line('90%')}{line('60%')}</div>
      <div className="ml-auto w-2/3 space-y-1 rounded-lg rounded-br-sm bg-brand p-2">{line('85%', 'bg-white/50')}{line('55%', 'bg-white/50')}</div>
      <div className="w-1/2 space-y-1 rounded-lg rounded-bl-sm bg-surface p-2">{line('80%')}</div>
    </div>
  ),
  'Moonaria Insights': (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[8px] font-semibold text-brand-soft">
        <FileText className="h-3 w-3" /> SOAP note · auto-generated
      </div>
      {['S', 'O', 'A', 'P'].map((k, i) => (
        <div key={k} className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-tint text-[7px] font-bold text-brand-soft">{k}</span>
          {line(['80%', '65%', '72%', '50%'][i])}
        </div>
      ))}
    </div>
  ),
  Docly: (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[8px] font-semibold text-brand-soft">
        <CalendarCheck className="h-3 w-3" /> Appointments
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className={`h-3 rounded-sm ${i === 9 ? 'bg-brand' : [2, 5, 12, 16].includes(i) ? 'bg-brand-soft/40' : 'bg-surface'}`}
          />
        ))}
      </div>
    </div>
  ),
  default: <div className="space-y-1.5">{line('80%')}{line('60%')}{line('70%')}</div>,
};
