import React, { useState, useEffect } from 'react';
import { ArrowUp, Calendar, Send } from 'lucide-react';
import { TickerBar } from './components/TickerBar.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TerminalSim } from './components/TerminalSim.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { JobHistorySection } from './components/JobHistorySection.tsx';
import { AchievementsSection } from './components/AchievementsSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { InquiryModal } from './components/InquiryModal.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { LeadTrackerDrawer } from './components/LeadTrackerDrawer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { Toast } from './components/Toast.tsx';
import { initAuth, googleSignIn, googleSignOut } from './services/firebase.ts';
import { SyncedLead } from './types/index.ts';

const THEME_STORAGE_KEY = 'hervie-portfolio-theme';
const LEADS_STORAGE_KEY = 'hervie-portfolio-leads';

// Pre-seeded initial leads for demo / immediate visibility
const initialLeads: SyncedLead[] = [
  {
    id: 'INQ-948201',
    type: 'inquiry',
    name: 'Alfonso Gutierrez',
    email: 'alfonso.g@enterprise-net.ph',
    phone: '+63 917 842 1920',
    title: 'Cisco Routing & Switching (OSPF/VLANs)',
    dateOrTimeline: 'Within 2-4 weeks',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    syncedToSheets: true,
    syncedToCalendar: false,
    status: 'synced',
  },
  {
    id: 'APT-839210',
    type: 'appointment',
    name: 'Camille Tan',
    email: 'camille.tan@fintechcorp.io',
    phone: '+63 928 554 9012',
    title: '45-min QA & Fraud Risk Strategy Session',
    dateOrTimeline: 'Tomorrow at 14:30 (45m)',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    syncedToSheets: true,
    syncedToCalendar: true,
    status: 'synced',
  },
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Google Workspace Auth State
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Modal & Drawer States
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLeadTrackerOpen, setIsLeadTrackerOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [initialInquiryService, setInitialInquiryService] = useState<string | undefined>();

  // Interactive selected skills
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Copied button states
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Floating Back to Top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<SyncedLead[]>(() => {
    try {
      const stored = localStorage.getItem(LEADS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return initialLeads;
  });

  // Apply theme to HTML data-theme attribute
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Persist leads
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // Ignore storage error
    }
  }, [leads]);

  // Floating scroll top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setAccessToken(token);
        setUserEmail(user.email);
      },
      () => {
        setAccessToken(null);
        setUserEmail(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next.toUpperCase()} mode!`);
      return next;
    });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopyText = async (textToCopy: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedMap((prev) => ({ ...prev, [label]: true }));
      showToast(`✓ Copied ${label} to clipboard!`);
      setTimeout(() => {
        setCopiedMap((prev) => ({ ...prev, [label]: false }));
      }, 2000);
    } catch {
      showToast(`Copied: ${textToCopy}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setAccessToken(result.accessToken);
        setUserEmail(result.user.email);
        showToast('✓ Connected with Google! Sheets and Calendar ready.');
      }
    } catch (err: unknown) {
      console.error('Sign-in failed:', err);
      const msg = err instanceof Error ? err.message : 'Google sign-in was cancelled or failed';
      showToast(`Sign-in: ${msg}`);
    }
  };

  const handleGoogleSignOut = async () => {
    await googleSignOut();
    setAccessToken(null);
    setUserEmail(null);
    showToast('Signed out of Google Workspace.');
  };

  const handleAddLead = (newLead: SyncedLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleAddTestLead = () => {
    const isEven = leads.length % 2 === 0;
    const testLead: SyncedLead = isEven
      ? {
          id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
          type: 'inquiry',
          name: 'Sarah Jenkins (Simulated Lead)',
          email: 'sarah.j@cloudsystems.com',
          phone: '+63 945 112 3344',
          title: 'Linux Server Setup & Hardening',
          dateOrTimeline: 'Urgent (Within 48 hours)',
          timestamp: new Date().toISOString(),
          syncedToSheets: !!accessToken,
          syncedToCalendar: false,
          status: accessToken ? 'synced' : 'local_cached',
        }
      : {
          id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
          type: 'appointment',
          name: 'Robert Vance (Simulated Lead)',
          email: 'robert@networkops.org',
          phone: '+63 918 776 5544',
          title: '30-min IT Infrastructure Discovery',
          dateOrTimeline: '2026-11-20 at 10:00 (30m)',
          timestamp: new Date().toISOString(),
          syncedToSheets: !!accessToken,
          syncedToCalendar: !!accessToken,
          status: accessToken ? 'synced' : 'local_cached',
        };

    handleAddLead(testLead);
    showToast(`✓ Simulated ${testLead.type} added to Lead Tracker!`);
  };

  const handleSkillClick = (skillName: string) => {
    if (selectedSkill === skillName) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skillName);
      showToast(`Skill selected: ${skillName} ⚡`);
    }
  };

  const openInquiry = (service?: string) => {
    setInitialInquiryService(service);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen text-[var(--text)] transition-colors relative selection:bg-[var(--neo-yellow)] selection:text-black">
      {/* Decorative Floating Shapes */}
      <div
        className="fixed top-28 right-6 text-6xl text-[var(--neo-yellow)] opacity-20 pointer-events-none select-none z-0 deco-float-1 hidden sm:block"
        aria-hidden="true"
      >
        ✦
      </div>
      <div
        className="fixed bottom-36 left-6 text-5xl text-[var(--neo-pink)] opacity-20 pointer-events-none select-none z-0 deco-float-2 hidden sm:block"
        aria-hidden="true"
      >
        ★
      </div>
      <div
        className="fixed top-1/2 right-4 text-6xl text-[var(--neo-cyan)] opacity-20 pointer-events-none select-none z-0 deco-spin hidden sm:block"
        aria-hidden="true"
      >
        ✱
      </div>

      {/* Top Ticker Bar */}
      <TickerBar />

      {/* Main Page Shell: fluid padding across Mobile, Tablet, and Desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-4 sm:py-6 md:py-8">
        {/* Navigation Header */}
        <Header
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenInquiry={openInquiry}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLeadTracker={() => setIsLeadTrackerOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          isTerminalOpen={isTerminalOpen}
          leadCount={leads.length}
        />

        <main id="top" className="space-y-8">
          {/* Hero Section with functional buttons */}
          <Hero
            onOpenInquiry={() => openInquiry()}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
            onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
            isTerminalOpen={isTerminalOpen}
            onCopyEmail={() => handleCopyText('keithrick.mariano@hotmail.com', 'Email')}
            copiedEmail={!!copiedMap['Email']}
          />

          {/* Interactive Network Administrator Terminal Emulator */}
          <TerminalSim
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onOpenInquiry={() => openInquiry()}
            onOpenBooking={() => setIsBookingOpen(true)}
          />

          {/* About & Education Sections */}
          <AboutSection />

          {/* Job History / Experience Section */}
          <JobHistorySection />

          {/* Achievements & Honors Section */}
          <AchievementsSection />

          {/* Technical & Soft Skills Section */}
          <SkillsSection
            onSelectSkill={handleSkillClick}
            selectedSkill={selectedSkill}
          />

          {/* Featured Projects Section */}
          <ProjectsSection onOpenInquiry={openInquiry} />

          {/* Contact Section */}
          <ContactSection
            onOpenInquiry={() => openInquiry()}
            onOpenBooking={() => setIsBookingOpen(true)}
            onCopyText={handleCopyText}
            copiedMap={copiedMap}
          />
        </main>

        {/* Footer */}
        <Footer
          onOpenInquiry={() => openInquiry()}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLeadTracker={() => setIsLeadTrackerOpen(true)}
        />
      </div>

      {/* Floating Action Buttons: Mobile Quick Inquiry & Booking Bar */}
      <aside aria-label="Quick Actions" className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2 bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-sm)] p-2 shadow-[var(--shadow-lg)]">
        <button
          type="button"
          onClick={() => openInquiry()}
          className="flex-1 py-2 px-3 bg-[var(--neo-pink)] text-black border border-black rounded-[var(--radius-xs)] font-display font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[var(--shadow-xs)]"
        >
          <Send className="w-3.5 h-3.5" />
          <span>INQUIRE (SHEET)</span>
        </button>
        <button
          type="button"
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 py-2 px-3 bg-[var(--neo-yellow)] text-black border border-black rounded-[var(--radius-xs)] font-display font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[var(--shadow-xs)]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK CALL</span>
        </button>
      </aside>

      {/* Floating Back To Top Button */}
      {showScrollTop && (
        <a
          href="#top"
          className="hidden md:flex fixed bottom-6 right-6 z-40 w-12 h-12 bg-[var(--neo-yellow)] text-black border-[var(--border-thick)] rounded-[var(--radius-sm)] shadow-[var(--shadow-md)] items-center justify-center font-display font-black text-xl hover:bg-[var(--neo-cyan)] hover:-translate-y-1 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[3]" />
        </a>
      )}

      {/* Modals & Drawers */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        accessToken={accessToken}
        onGoogleSignIn={handleGoogleSignIn}
        onLeadAdded={handleAddLead}
        initialService={initialInquiryService}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        accessToken={accessToken}
        onGoogleSignIn={handleGoogleSignIn}
        onLeadAdded={handleAddLead}
      />

      <LeadTrackerDrawer
        isOpen={isLeadTrackerOpen}
        onClose={() => setIsLeadTrackerOpen(false)}
        leads={leads}
        accessToken={accessToken}
        userEmail={userEmail}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        onAddTestLead={handleAddTestLead}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Interactive Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
