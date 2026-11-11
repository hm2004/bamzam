import React from 'react';
import { portfolioData } from '../data/portfolioData.ts';

export const AboutSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8" id="about">
      {/* About Me Card */}
      <div className="lg:col-span-6 bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] transition-all">
        <div>
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
            </div>
            <span className="text-[var(--text-muted)]">FOLDER: /ABOUT_ME</span>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4">
              <span className="neo-badge bg-[var(--neo-yellow)] text-black mb-2">
                PROFILE
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[var(--text)]">
                About Me
              </h2>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {portfolioData.about.map((paragraph, idx) => (
                <p key={idx} className="flex items-start gap-2.5">
                  <span className="text-[var(--neo-pink)] font-black font-mono-code mt-0.5 select-none">
                    ❯
                  </span>
                  <span>{paragraph}</span>
                </p>
              ))}
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6 pt-6 border-t border-[var(--border-light)]">
              {portfolioData.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[var(--surface-alt)] border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] flex items-center gap-2.5 text-xs sm:text-sm"
                >
                  <span className="text-base select-none">{detail.icon}</span>
                  <div>
                    <span className="text-[11px] font-mono-code text-[var(--text-soft)] block uppercase">
                      {detail.label}
                    </span>
                    <strong className="text-[var(--text)] font-semibold leading-tight">
                      {detail.value}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Background Card */}
      <div
        className="lg:col-span-6 bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] transition-all"
        id="education"
      >
        <div>
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
            </div>
            <span className="text-[var(--text-muted)]">LOG: /ACADEMICS</span>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-4">
              <span className="neo-badge bg-[var(--neo-cyan)] text-black mb-2">
                LEARNING
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[var(--text)]">
                Educational Background
              </h2>
            </div>

            <div className="space-y-4">
              {portfolioData.education.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[var(--surface-alt)] border-[var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="neo-badge bg-[var(--neo-purple)] text-black text-[10px] mb-1">
                        {item.tag}
                      </span>
                      <h3 className="font-display font-black text-lg text-[var(--text)] leading-snug">
                        {item.school}
                      </h3>
                      <p className="text-xs sm:text-sm font-display font-bold text-[var(--text-muted)] mt-0.5">
                        {item.degree}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 bg-[var(--neo-yellow)] text-black font-mono-code text-xs font-bold border border-black rounded shadow-[var(--shadow-xs)] whitespace-nowrap">
                      {item.years}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-3 pt-2 border-t border-[var(--border-light)] text-xs text-[var(--text-muted)]">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[var(--neo-pink)] font-black text-[11px] mt-0.5">
                          ◆
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
