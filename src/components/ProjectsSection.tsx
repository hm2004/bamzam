import React, { useState } from 'react';
import { Send, ArrowRight, CheckCircle, Info, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData.ts';
import { ProjectItem } from '../types/index.ts';

interface ProjectsSectionProps {
  onOpenInquiry: (initialService?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenInquiry }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] mb-8"
      id="projects"
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
        </div>
        <span className="text-[var(--text-muted)]">REPO: /PORTFOLIO_PROJECTS</span>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <span className="neo-badge bg-[var(--neo-orange)] text-black mb-2">
            ENGINEERING WORK
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[var(--text)]">
            Featured Projects & Prototypes
          </h2>
        </div>

        {/* Projects Grid: 2-column on desktop/tablet, 1-col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {portfolioData.projects.map((project) => {
            return (
              <div
                key={project.id}
                className="p-5 bg-[var(--surface-alt)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-[var(--neo-cyan)] text-black text-[10px] font-mono-code font-bold rounded border border-black shadow-[var(--shadow-xs)]">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 bg-[var(--neo-purple)] text-black text-[10px] font-mono-code font-bold rounded border border-black">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-[var(--text)] leading-snug mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-[var(--surface)] border border-[var(--border-light)] rounded-[var(--radius-xs)] text-[11px] font-mono-code text-[var(--text)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border-light)]">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-mono-code font-bold text-[var(--text)] hover:underline"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Specs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry(project.title)}
                    className="neo-btn px-3 py-1.5 bg-[var(--neo-yellow)] text-black text-xs font-extrabold flex items-center gap-1.5"
                    title={`Inquire about ${project.title}`}
                  >
                    <span>Inquire</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Specs Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-xl)] w-full max-w-lg p-5 space-y-4">
            <div className="flex items-start justify-between gap-2 border-b-[var(--border-light)] pb-3">
              <div>
                <span className="neo-badge bg-[var(--neo-cyan)] text-black text-[10px]">
                  {selectedProject.category}
                </span>
                <h3 className="font-display font-black text-xl text-[var(--text)] mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {selectedProject.description}
            </p>

            {selectedProject.features && (
              <div>
                <h4 className="text-xs font-mono-code font-bold uppercase mb-2 text-[var(--text)]">
                  Key Technical Capabilities:
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
                  {selectedProject.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono-code font-bold uppercase mb-1.5 text-[var(--text)]">
                Technology Stack:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[var(--surface-alt)] border border-black rounded text-xs font-mono-code font-bold text-[var(--text)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-light)]">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="neo-btn px-4 py-2 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold"
              >
                CLOSE
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenInquiry(title);
                }}
                className="neo-btn px-4 py-2 bg-[var(--neo-yellow)] text-black text-xs font-extrabold flex items-center gap-1.5"
              >
                <span>INQUIRE ABOUT THIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
