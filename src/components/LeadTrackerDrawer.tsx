import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Calendar,
  ExternalLink,
  Download,
  PlusCircle,
  Database,
  Mail,
  UserCheck,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { SyncedLead } from '../types/index.ts';

interface LeadTrackerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: SyncedLead[];
  accessToken: string | null;
  userEmail: string | null;
  onGoogleSignIn: () => Promise<void>;
  onGoogleSignOut: () => Promise<void>;
  onAddTestLead: () => void;
}

export const LeadTrackerDrawer: React.FC<LeadTrackerDrawerProps> = ({
  isOpen,
  onClose,
  leads,
  accessToken,
  userEmail,
  onGoogleSignIn,
  onGoogleSignOut,
  onAddTestLead,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'inquiry' | 'appointment'>('all');
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    if (activeFilter === 'all') return true;
    return lead.type === activeFilter;
  });

  const inquiryCount = leads.filter((l) => l.type === 'inquiry').length;
  const appointmentCount = leads.filter((l) => l.type === 'appointment').length;

  const handleSignInClick = async () => {
    setIsSigningIn(true);
    try {
      await onGoogleSignIn();
    } catch (err) {
      console.error('Sign-in error:', err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'Lead ID',
      'Type',
      'Client Name',
      'Email',
      'Phone',
      'Topic / Service',
      'Date / Timeline',
      'Created At',
      'Synced to Sheet',
      'Synced to Calendar',
    ];

    const rows = leads.map((l) => [
      l.id,
      l.type,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone || 'N/A',
      `"${l.title.replace(/"/g, '""')}"`,
      `"${l.dateOrTimeline.replace(/"/g, '""')}"`,
      l.timestamp,
      l.syncedToSheets ? 'YES' : 'NO',
      l.syncedToCalendar ? 'YES' : 'NO',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hervie-mariano-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-title"
    >
      <div className="bg-[var(--surface)] border-l-[var(--border-thick)] shadow-[var(--shadow-xl)] w-full max-w-xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-[var(--surface-alt)] border-b-[var(--border-thick)] flex items-center justify-between font-mono-code">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <div>
              <h2 id="tracker-title" className="font-display font-black text-base sm:text-lg text-[var(--text)] leading-none">
                Real-Time Lead & Booking Tracker
              </h2>
              <span className="text-[11px] text-[var(--text-soft)]">
                Google Sheets & Google Calendar Sync Center
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
            aria-label="Close lead tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Integration Status Strip */}
        <div className="p-4 border-b-[var(--border-light)] bg-slate-50 dark:bg-slate-900/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <span className="text-xs font-mono-code font-bold uppercase text-[var(--text-soft)] block">
                Google Workspace Authorization
              </span>
              {accessToken ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-[var(--text)] font-mono-code">
                    {userEmail || 'Authorized (Sheets & Calendar)'}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  ● Ready to connect for live Google Sheets & Calendar sync
                </span>
              )}
            </div>

            {accessToken ? (
              <button
                type="button"
                onClick={onGoogleSignOut}
                className="text-xs font-bold text-red-600 hover:text-red-700 underline font-mono-code self-start sm:self-auto"
              >
                Sign Out Google
              </button>
            ) : (
              /* Official Sign in with Google Button */
              <button
                type="button"
                disabled={isSigningIn}
                onClick={handleSignInClick}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded border border-slate-300 shadow-sm hover:bg-slate-50 focus:outline-none transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>

          {/* Quick Direct Links to Google Sheet & Calendar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <a
              href="https://docs.google.com/spreadsheets/u/0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-[var(--surface)] border border-[var(--border-light)] rounded-[var(--radius-xs)] text-xs hover:bg-[var(--neo-yellow-light)] text-[var(--text)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">Google Sheets</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-[var(--surface)] border border-[var(--border-light)] rounded-[var(--radius-xs)] text-xs hover:bg-[var(--neo-cyan-light)] text-[var(--text)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-bold">Google Calendar</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Controls: Filter & Actions */}
        <div className="p-3 border-b-[var(--border-light)] flex flex-wrap items-center justify-between gap-2 bg-[var(--surface)]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 text-xs font-mono-code font-bold rounded border ${
                activeFilter === 'all'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black'
                  : 'bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border-light)]'
              }`}
            >
              All ({leads.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('inquiry')}
              className={`px-2.5 py-1 text-xs font-mono-code font-bold rounded border ${
                activeFilter === 'inquiry'
                  ? 'bg-[var(--neo-pink)] text-black border-black'
                  : 'bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border-light)]'
              }`}
            >
              Inquiries ({inquiryCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('appointment')}
              className={`px-2.5 py-1 text-xs font-mono-code font-bold rounded border ${
                activeFilter === 'appointment'
                  ? 'bg-[var(--neo-yellow)] text-black border-black'
                  : 'bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border-light)]'
              }`}
            >
              Appointments ({appointmentCount})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onAddTestLead}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--neo-cyan-light)] text-black text-xs font-bold rounded border border-black hover:bg-[var(--neo-cyan)]"
              title="Add a sample lead to test tracking pipeline"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Simulate Lead</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold rounded border border-[var(--border-light)] hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50"
              title="Download CSV database export"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Lead Entries List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-soft)] font-mono-code text-xs space-y-2">
              <Database className="w-8 h-8 mx-auto text-slate-400" />
              <p>No {activeFilter !== 'all' ? activeFilter : ''} leads recorded yet.</p>
              <p className="text-[11px]">
                Click "Simulate Lead" above or submit the inquiry / appointment form to test real-time tracking!
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)] transition-shadow space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase rounded border border-black ${
                        lead.type === 'inquiry'
                          ? 'bg-[var(--neo-pink)] text-black'
                          : 'bg-[var(--neo-yellow)] text-black'
                      }`}
                    >
                      {lead.type === 'inquiry' ? 'Inquiry' : 'Calendar Booking'}
                    </span>
                    <span className="text-xs font-mono-code text-[var(--text-soft)]">
                      {lead.id}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono-code text-[var(--text-soft)]">
                    {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-sm text-[var(--text)]">
                    {lead.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] font-mono-code mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {lead.email}
                    </span>
                    {lead.phone && <span>📞 {lead.phone}</span>}
                  </div>
                </div>

                <div className="p-2 bg-[var(--surface-alt)] rounded text-xs">
                  <p className="font-bold text-[var(--text)]">{lead.title}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Target: {lead.dateOrTimeline}
                  </p>
                </div>

                {/* Sync Status Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--border-light)] text-[11px] font-mono-code">
                  <div className="flex items-center gap-2">
                    {lead.syncedToSheets ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Synced to Google Sheet</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>Locally Tracked</span>
                      </span>
                    )}

                    {lead.type === 'appointment' && lead.syncedToCalendar && (
                      <span className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 font-bold">
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                        <span>Calendar Synced</span>
                      </span>
                    )}
                  </div>

                  {lead.calendarLink && (
                    <a
                      href={lead.calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Calendar Event</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
