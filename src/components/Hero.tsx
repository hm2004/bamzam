import React from 'react';
import {
  Send,
  Calendar,
  Copy,
  Check,
  FileText,
  Terminal,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData.ts';

interface HeroProps {
  onOpenInquiry: () => void;
  onOpenBooking: () => void;
  onOpenResume: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenInquiry,
  onOpenBooking,
  onOpenResume,
  onToggleTerminal,
  isTerminalOpen,
  onCopyEmail,
  copiedEmail,
}) => {
  return (
    <section className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] mb-8">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs sm:text-sm font-bold select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
        </div>
        <span className="text-[var(--text-muted)] tracking-wider">
          TERMINAL: HERVIE_MARIANO.EXE
        </span>
        <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded-[var(--radius-xs)] text-[11px]">
          v2.0.26
        </span>
      </div>

      <div className="p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Bio & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="neo-badge bg-[var(--neo-yellow)] text-black -rotate-2">
              {portfolioData.eyebrow}
            </span>
            <span className="neo-badge bg-[var(--neo-green)] text-black rotate-1">
              ● OPEN FOR OPPORTUNITIES
            </span>
            <span className="neo-badge bg-[var(--neo-purple-light)] text-black hidden sm:inline-flex">
              ✓ GOOGLE SYNC READY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[var(--text)] uppercase leading-[1.05] mb-3">
            {portfolioData.name}
          </h1>

          <div className="mb-4">
            <span className="inline-block px-3 py-1.5 bg-[var(--neo-cyan)] text-black border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] font-display font-bold text-xs sm:text-sm md:text-base">
              {portfolioData.role}
            </span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--text-muted)] max-w-2xl mb-6">
            {portfolioData.summary}
          </p>

          {/* Action Buttons Matrix */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="neo-btn px-4 sm:px-5 py-2.5 sm:py-3 bg-[var(--neo-pink)] text-black text-xs sm:text-sm font-extrabold"
              title="Submit client inquiry (Logged to Google Sheets)"
            >
              <Send className="w-4 h-4" />
              <span>SEND INQUIRY</span>
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="neo-btn px-4 sm:px-5 py-2.5 sm:py-3 bg-[var(--neo-yellow)] text-black text-xs sm:text-sm font-extrabold"
              title="Schedule consultation (Syncs to Google Calendar)"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK CALL</span>
            </button>

            <button
              type="button"
              onClick={onCopyEmail}
              className="neo-btn px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="neo-btn px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--neo-orange-light)] text-black text-xs font-bold"
              title="View and download complete resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV / RESUME</span>
            </button>

            <button
              type="button"
              onClick={onToggleTerminal}
              className="neo-btn px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold"
              title="Launch interactive network CLI emulator"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-600" />
              <span>{isTerminalOpen ? 'CLOSE CLI' : 'NETWORK CLI'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Snapshot Stats Card */}
        <div className="lg:col-span-5">
          <div className="bg-[var(--surface-alt)] border-[var(--border-thick)] rounded-[var(--radius-md)] p-4 sm:p-5 shadow-[var(--shadow-md)] flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between border-b-[var(--border)] pb-2.5">
              <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[var(--text)]">
                SYSTEM SNAPSHOT
              </span>
              <span className="neo-badge bg-[var(--neo-purple)] text-black text-[11px]">
                SYS_STAT
              </span>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {portfolioData.stats.map((stat, idx) => {
                const colorMap = {
                  yellow: 'bg-[var(--neo-yellow-light)] text-black',
                  cyan: 'bg-[var(--neo-cyan-light)] text-black',
                  pink: 'bg-[var(--neo-pink-light)] text-black',
                  green: 'bg-[var(--neo-green-light)] text-black',
                  purple: 'bg-[var(--neo-purple-light)] text-black',
                  orange: 'bg-[var(--neo-orange-light)] text-black',
                };
                return (
                  <div
                    key={idx}
                    className={`p-3 border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] ${colorMap[stat.color] || 'bg-white text-black'}`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono-code font-bold mb-1 opacity-80">
                      <span>● ACTIVE</span>
                      <span>#0{idx + 1}</span>
                    </div>
                    <span className="block font-display font-black text-2xl sm:text-3xl leading-none tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block text-xs font-bold mt-1 text-slate-800 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Availability and Location Footer */}
            <div className="bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-sm)] p-2.5 flex items-center justify-between text-xs font-mono-code">
              <div className="flex items-center gap-2">
                <span className="pulse-dot"></span>
                <span className="font-bold text-[var(--text)]">
                  READY & AVAILABLE
                </span>
              </div>
              <div className="flex items-center gap-1 font-bold text-slate-800 bg-[var(--neo-orange-light)] px-2 py-0.5 rounded-[var(--radius-xs)] border border-black">
                <MapPin className="w-3 h-3 text-red-600" />
                <span>Antipolo, PH</span>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-600/40 rounded p-2 text-[11px] font-mono-code flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Google Sheets & Calendar synchronization enabled.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
