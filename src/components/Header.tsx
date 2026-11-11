import React, { useState } from 'react';
import {
  Calendar,
  Send,
  Database,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Terminal,
} from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenInquiry: (initialService?: string) => void;
  onOpenBooking: () => void;
  onOpenLeadTracker: () => void;
  onOpenResume: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  leadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenInquiry,
  onOpenBooking,
  onOpenLeadTracker,
  onOpenResume,
  onToggleTerminal,
  isTerminalOpen,
  leadCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Academics', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Honors', href: '#achievements' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-3 z-40 mb-6 sm:mb-8 transition-all">
      <div className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] p-3 sm:p-4 flex items-center justify-between gap-3">
        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
          aria-label="Hervie Mariano - Back to top"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--neo-cyan)] text-black border-[var(--border-light)] rounded-[var(--radius-xs)] font-mono-code font-extrabold text-sm sm:text-base flex items-center justify-center shadow-[var(--shadow-xs)] -rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:bg-[var(--neo-yellow)] transition-transform">
            HM
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight leading-none text-[var(--text)]">
                Hervie Mariano
              </span>
              <span className="pulse-dot" title="Status: Online & Available"></span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono-code text-[var(--text-soft)] hidden xs:block">
              Network Admin & IT Specialist
            </span>
          </div>
        </a>

        {/* Desktop / Tablet Navigation Links */}
        <nav
          className="hidden xl:flex items-center gap-1 bg-[var(--surface-alt)] p-1.5 border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)]"
          aria-label="Desktop primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2.5 py-1 text-xs font-display font-bold rounded-[var(--radius-xs)] border-2 border-transparent hover:border-black hover:bg-[var(--neo-yellow)] hover:text-black hover:-translate-y-0.5 hover:shadow-[var(--shadow-xs)] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Lead Tracker / Google Workspace Sync status button */}
          <button
            type="button"
            onClick={onOpenLeadTracker}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] font-display font-bold text-xs hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] hover:bg-[var(--neo-purple-light)] transition-all relative"
            title="Open Real-time Google Workspace Lead & Appointment Tracker"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden md:inline">Sheets & Sync</span>
            {leadCount > 0 && (
              <span className="bg-[var(--neo-pink)] text-black text-[10px] font-mono-code font-bold px-1.5 py-0.2 rounded-full border border-black">
                {leadCount}
              </span>
            )}
          </button>

          {/* Schedule Consultation Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--neo-yellow)] text-black border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] font-display font-extrabold text-xs hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] hover:bg-[var(--neo-yellow-light)] transition-all"
            title="Schedule IT consultation (Syncs with Google Calendar)"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Call</span>
          </button>

          {/* Send Inquiry Button */}
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--neo-pink)] text-black border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] font-display font-extrabold text-xs sm:text-xs hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] transition-all"
            title="Send an inquiry (Automatically appends to Google Sheet)"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[var(--neo-purple)] text-black border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] font-mono-code font-bold text-xs flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] transition-all"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-black" />
            )}
            <span className="hidden lg:inline">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 bg-[var(--surface-alt)] border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] hover:bg-[var(--neo-yellow)] text-[var(--text)] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-center text-xs font-display font-bold bg-[var(--surface-alt)] border-[var(--border-light)] rounded-[var(--radius-xs)] hover:bg-[var(--neo-yellow)] hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t-[var(--border-light)]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--neo-yellow)] text-black border-[var(--border)] rounded-[var(--radius-sm)] font-display font-extrabold text-xs shadow-[var(--shadow-xs)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment (Calendar Sync)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadTracker();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--neo-purple-light)] text-black border-[var(--border)] rounded-[var(--radius-sm)] font-display font-bold text-xs shadow-[var(--shadow-xs)]"
            >
              <Database className="w-4 h-4" />
              <span>Lead & Sync Tracker ({leadCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border)] rounded-[var(--radius-sm)] font-display font-bold text-xs shadow-[var(--shadow-xs)]"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Download CV / Resume</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleTerminal();
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border)] rounded-[var(--radius-sm)] font-display font-bold text-xs shadow-[var(--shadow-xs)]"
            >
              <Terminal className="w-4 h-4 text-orange-600" />
              <span>{isTerminalOpen ? 'Hide Terminal CLI' : 'Open Terminal CLI'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
