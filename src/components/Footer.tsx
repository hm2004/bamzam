import React from 'react';
import { ArrowUp, Calendar, Send, Database } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: () => void;
  onOpenBooking: () => void;
  onOpenLeadTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInquiry,
  onOpenBooking,
  onOpenLeadTracker,
}) => {
  return (
    <footer className="mt-12 bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] p-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[var(--border-light)]">
        <div>
          <span className="font-display font-black text-xl text-[var(--text)] tracking-tight block">
            HERVIE KEITHRICK MARIANO
          </span>
          <span className="font-mono-code text-xs text-[var(--text-soft)] mt-1 block">
            Network Administrator • IT Specialist • Quality & Fraud Risk Analyst
          </span>
        </div>

        {/* Quick action buttons in footer */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="neo-btn px-3 py-1.5 bg-[var(--neo-pink)] text-black text-xs font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Inquiry</span>
          </button>
          <button
            type="button"
            onClick={onOpenBooking}
            className="neo-btn px-3 py-1.5 bg-[var(--neo-yellow)] text-black text-xs font-bold"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Call</span>
          </button>
          <button
            type="button"
            onClick={onOpenLeadTracker}
            className="neo-btn px-3 py-1.5 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Sheets Tracker</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs font-mono-code text-[var(--text-soft)]">
        <span>Designed in Neo-Brutalism style • © {new Date().getFullYear()} Hervie Keithrick Mariano</span>
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--neo-yellow)] text-black font-extrabold rounded border border-black shadow-[var(--shadow-xs)] hover:-translate-y-0.5 transition-transform"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  );
};
