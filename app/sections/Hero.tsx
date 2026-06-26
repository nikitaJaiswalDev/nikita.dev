'use client';

import content from '../../content.json';

export default function Hero() {
  const { personal } = content;

  return (
    <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0D0D1A] border-b border-[#1E2A45]">
      {/* Background ambient radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(108,99,255,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-10">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          {/* Left Side */}
          <div className="flex flex-col items-start text-left">
            <span className="font-mono-label text-[11px] font-semibold text-[#6C63FF] tracking-[0.15em] mb-4">
              AVAILABLE FOR FREELANCE & CONTRACT
            </span>
            
            <div className="relative inline-block mb-4">
              <h1
                className="font-[family-name:var(--font-space-grotesk)] text-[#F0F0F5] tracking-tight leading-none"
                style={{ fontWeight: 800, fontSize: 'clamp(48px, 7vw, 80px)' }}
              >
                {personal.name}
              </h1>
              <div className="h-[3px] bg-gradient-to-r from-[#6C63FF] to-[#00D9FF] w-full animate-underline mt-2" />
            </div>

            <div className="text-[20px] text-[#6C63FF] font-semibold mb-4 font-[family-name:var(--font-space-grotesk)] leading-tight">
              Senior Full Stack Developer
            </div>

            <p className="text-[17px] text-[#8892A4] max-w-[520px] mb-8 leading-relaxed">
              Building scalable AI-powered applications with Node.js, React.js and cloud architecture. 5+ years shipping production code.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-[#6C63FF] text-white font-semibold hover:bg-[#574feb] transition-colors duration-300 shadow-lg shadow-[#6C63FF]/20 text-sm"
              >
                View My Work
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="px-6 py-3 rounded-lg border border-[#6C63FF] text-[#6C63FF] font-semibold hover:bg-[rgba(108,99,255,0.08)] transition-all duration-300 text-sm"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full">
            <div className="w-full bg-[#0D1117] border border-[#1E2A45] rounded-xl p-5 font-mono-label shadow-2xl">
              {/* macOS window dots */}
              <div className="flex gap-1.5 mb-5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]"></span>
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                <span className="w-3 h-3 rounded-full bg-[#28CA41]"></span>
              </div>
              
              <div className="text-sm sm:text-base space-y-1.5 text-[#F0F0F5] leading-relaxed">
                <div>
                  <span className="text-[#6C63FF]">const</span> nikita = {'{'}
                </div>
                <div>&nbsp;&nbsp;role: <span className="text-[#00D9FF]">&quot;Senior Full Stack Dev&quot;</span>,</div>
                <div>&nbsp;&nbsp;experience: <span className="text-[#00D9FF]">&quot;5+ years&quot;</span>,</div>
                <div>&nbsp;&nbsp;location: <span className="text-[#00D9FF]">&quot;Ludhiana, India&quot;</span>,</div>
                <div>&nbsp;&nbsp;available: <span className="text-[#00D9FF]">true</span>,</div>
                <div>
                  &nbsp;&nbsp;focus: [<span className="text-[#00D9FF]">&quot;Node.js&quot;</span>, <span className="text-[#00D9FF]">&quot;React.js&quot;</span>, <span className="text-[#00D9FF]">&quot;AI/LLM&quot;</span>],
                </div>
                <div>
                  {'}'}
                  <span className="text-[#6C63FF] animate-cursor font-bold ml-1">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#1E2A45]/30 w-full mt-4">
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#6C63FF] font-[family-name:var(--font-space-grotesk)]">5+</span>
            <span className="text-xs text-[#8892A4] mt-1 font-semibold uppercase tracking-wider">Years Experience</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#6C63FF] font-[family-name:var(--font-space-grotesk)]">4</span>
            <span className="text-xs text-[#8892A4] mt-1 font-semibold uppercase tracking-wider">Projects Shipped</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#6C63FF] font-[family-name:var(--font-space-grotesk)]">30%</span>
            <span className="text-xs text-[#8892A4] mt-1 font-semibold uppercase tracking-wider">Avg Performance Gain</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#6C63FF] font-[family-name:var(--font-space-grotesk)]">3</span>
            <span className="text-xs text-[#8892A4] mt-1 font-semibold uppercase tracking-wider">Cloud Platforms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
