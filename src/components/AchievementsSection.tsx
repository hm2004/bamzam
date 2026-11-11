import React from 'react';
import { portfolioData } from '../data/portfolioData.ts';

export const AchievementsSection: React.FC = () => {
  return (
    <section
      className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] mb-8"
      id="achievements"
    >
      {/* Trophy Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
        </div>
        <span className="text-[var(--text-muted)]">TROPHY: /MILESTONES</span>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <span className="neo-badge bg-[var(--neo-pink)] text-black mb-2">
            MILESTONES
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[var(--text)]">
            Achievements & Honors
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolioData.achievements.map((item, idx) => {
            const cardBg = {
              yellow: 'bg-[var(--neo-yellow-light)] text-black',
              pink: 'bg-[var(--neo-pink-light)] text-black',
              green: 'bg-[var(--neo-green-light)] text-black',
              cyan: 'bg-[var(--neo-cyan-light)] text-black',
            }[item.color] || 'bg-white text-black';

            return (
              <div
                key={idx}
                className={`p-5 border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all flex flex-col justify-between ${cardBg}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono-code font-bold rounded">
                      {item.badge}
                    </span>
                    <span className="px-2 py-0.5 bg-white text-black border border-black text-xs font-mono-code font-bold rounded shadow-[var(--shadow-xs)]">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-black leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
