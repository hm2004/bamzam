import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData.ts';

interface SkillsSectionProps {
  onSelectSkill: (skillName: string) => void;
  selectedSkill: string | null;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onSelectSkill,
  selectedSkill,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Networking',
    'DevOps & SysAdmin',
    'Security & Risk',
    'Leadership & Support',
  ];

  const filteredSkills = portfolioData.skills.filter((skill) => {
    if (activeCategory === 'All') return true;
    return skill.category === activeCategory;
  });

  return (
    <section
      className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] mb-8"
      id="skills"
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
        </div>
        <span className="text-[var(--text-muted)]">STACK: /CORE_SKILLS</span>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="neo-badge bg-[var(--neo-green)] text-black mb-2">
              STRENGTHS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[var(--text)]">
              Technical & Soft Skills
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono-code mt-1">
              Select any skill chip to filter or inspect details:
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-mono-code font-bold rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black shadow-[var(--shadow-xs)]'
                    : 'bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border-light)] hover:bg-[var(--neo-yellow)] hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Chips Cloud */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {filteredSkills.map((skill, idx) => {
            const isSelected = selectedSkill === skill.name;
            const colorClass = {
              yellow: 'bg-[var(--neo-yellow)]',
              cyan: 'bg-[var(--neo-cyan)]',
              pink: 'bg-[var(--neo-pink)]',
              green: 'bg-[var(--neo-green)]',
              purple: 'bg-[var(--neo-purple)]',
              orange: 'bg-[var(--neo-orange)]',
            }[skill.color] || 'bg-[var(--neo-yellow)]';

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSkill(skill.name)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border-[var(--border)] shadow-[var(--shadow-xs)] font-display font-extrabold text-xs sm:text-sm text-black transition-all cursor-pointer ${colorClass} ${
                  isSelected
                    ? 'ring-4 ring-black dark:ring-white scale-105 shadow-[var(--shadow-md)] -rotate-1'
                    : 'hover:-translate-y-1 hover:shadow-[var(--shadow-sm)]'
                }`}
              >
                <span className="text-xs">✦</span>
                <span>{skill.name}</span>
                {isSelected && <span className="text-[10px] bg-black text-white px-1.5 py-0.2 rounded-full">ACTIVE</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
