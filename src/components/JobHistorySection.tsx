import React from 'react';
import { portfolioData } from '../data/portfolioData.ts';

export const JobHistorySection: React.FC = () => {
  return (
    <section
      className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] mb-8"
      id="experience"
    >
      {/* Console Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
        </div>
        <span className="text-[var(--text-muted)]">CONSOLE: /WORK_EXPERIENCE</span>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="neo-badge bg-[var(--neo-purple)] text-black mb-2">
              EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[var(--text)]">
              Job History & Industry Experience
            </h2>
          </div>
          <span className="px-3 py-1 bg-[var(--neo-yellow)] text-black font-mono-code text-xs font-bold border border-black rounded-full shadow-[var(--shadow-xs)]">
            4 ROLES & INTERNSHIP
          </span>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {portfolioData.jobHistory.map((job, idx) => {
            const roleColor = {
              'tag-green': 'bg-[var(--neo-green)]',
              'tag-purple': 'bg-[var(--neo-purple)]',
              'tag-pink': 'bg-[var(--neo-pink)]',
              'tag-blue': 'bg-[var(--neo-cyan)]',
            }[job.colorTag] || 'bg-[var(--neo-yellow)]';

            return (
              <div
                key={idx}
                className="p-5 bg-[var(--surface-alt)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase rounded border border-black shadow-[var(--shadow-xs)] text-black mb-1.5 ${roleColor}`}
                      >
                        {job.tag}
                      </span>
                      <h3 className="font-display font-black text-xl text-[var(--text)] leading-snug">
                        {job.company}
                      </h3>
                      <p className="text-xs sm:text-sm font-display font-bold text-[var(--text-muted)]">
                        {job.role}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 bg-[var(--neo-yellow)] text-black font-mono-code text-xs font-bold border border-black rounded shadow-[var(--shadow-xs)] whitespace-nowrap">
                      {job.years}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] mb-3">
                    {job.summary}
                  </p>
                </div>

                {job.highlights && (
                  <ul className="space-y-1 pt-3 border-t border-[var(--border-light)] text-xs text-[var(--text-soft)]">
                    {job.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5">
                        <span className="text-[var(--neo-pink)] font-black">❯</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
