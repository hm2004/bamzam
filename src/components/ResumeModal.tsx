import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 print:p-0 print:bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] w-full max-w-3xl overflow-hidden max-h-[92vh] flex flex-col print:border-none print:shadow-none print:max-w-none print:max-h-none print:rounded-none">
        {/* Modal Window Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
            <span className="ml-2 text-[var(--text)]">DOCUMENT: /HERVIE_MARIANO_CV.PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--neo-yellow)] text-black rounded border border-black hover:bg-yellow-300 text-xs font-bold"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
              aria-label="Close CV window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-[var(--text)] font-body print:p-0">
          {/* Header */}
          <div className="border-b-2 border-black dark:border-white pb-4">
            <h1 id="resume-title" className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--text)]">
              {portfolioData.name}
            </h1>
            <p className="font-display font-bold text-sm sm:text-base text-[var(--neo-pink)] mt-0.5">
              {portfolioData.role}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code mt-3 text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Antipolo City, Rizal, Philippines
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                keithrick.mariano@hotmail.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                +63 938 973 4983
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black inline-block px-2 py-0.5 mb-2 rounded">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">
              {portfolioData.summary}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black inline-block px-2 py-0.5 mb-3 rounded">
              Work Experience
            </h3>
            <div className="space-y-4">
              {portfolioData.jobHistory.map((job, idx) => (
                <div key={idx} className="border-l-2 border-black dark:border-white pl-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <strong className="font-display text-sm font-bold text-[var(--text)]">
                        {job.role}
                      </strong>
                      <p className="text-xs text-[var(--text-soft)]">{job.company}</p>
                    </div>
                    <span className="text-[11px] font-mono-code font-bold bg-[var(--surface-alt)] px-2 py-0.5 rounded border border-black">
                      {job.years}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {job.summary}
                  </p>
                  {job.highlights && (
                    <ul className="list-disc list-inside text-[11px] text-[var(--text-soft)] space-y-0.5 pt-1">
                      {job.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black inline-block px-2 py-0.5 mb-3 rounded">
              Education
            </h3>
            <div className="space-y-3">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-black dark:border-white pl-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <strong className="font-display text-sm font-bold text-[var(--text)]">
                        {edu.school}
                      </strong>
                      <p className="text-xs text-[var(--text-soft)]">{edu.degree}</p>
                    </div>
                    <span className="text-[11px] font-mono-code font-bold bg-[var(--surface-alt)] px-2 py-0.5 rounded border border-black">
                      {edu.years}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-[var(--text-soft)] space-y-0.5 pt-1">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black inline-block px-2 py-0.5 mb-2 rounded">
              Core Skills & Tools
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {portfolioData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[var(--surface-alt)] border border-black text-xs font-mono-code font-bold rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden on print) */}
        <div className="p-3 bg-[var(--surface-alt)] border-t border-[var(--border-light)] flex items-center justify-between print:hidden">
          <span className="text-xs font-mono-code text-[var(--text-soft)]">
            Hervie Keithrick Mariano • Curriculum Vitae 2026
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="neo-btn px-4 py-1.5 bg-[var(--neo-yellow)] text-black text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SAVE / PRINT</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="neo-btn px-3 py-1.5 bg-[var(--surface)] text-[var(--text)] text-xs font-bold"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
