import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { serviceOptions } from '../data/portfolioData.ts';
import { validateInquiryForm, InquiryData } from '../utils/validation.ts';
import {
  getOrCreateLeadsSpreadsheet,
  appendInquiryToGoogleSheet,
} from '../services/googleWorkspace.ts';
import { SyncedLead } from '../types/index.ts';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string | null;
  onGoogleSignIn: () => Promise<void>;
  onLeadAdded: (lead: SyncedLead) => void;
  initialService?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  accessToken,
  onGoogleSignIn,
  onLeadAdded,
  initialService,
}) => {
  const [formData, setFormData] = useState<InquiryData>({
    fullName: '',
    email: '',
    phone: '',
    service: initialService || serviceOptions[0],
    scopeTimeline: 'Within 2-4 weeks',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    leadId: string;
    sheetUrl?: string;
    sheetName?: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateInquiryForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    // Mandatory confirmation dialog for Workspace data mutation
    setShowConfirmDialog(true);
  };

  const handleConfirmedSend = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const trackingId = `INQ-${Date.now().toString().slice(-6)}`;
    let sheetUrl: string | undefined;
    let sheetName: string | undefined;
    let syncedToSheets = false;

    try {
      if (accessToken) {
        // Log to Google Sheet via Google Workspace API
        const spreadsheet = await getOrCreateLeadsSpreadsheet(accessToken);
        await appendInquiryToGoogleSheet(
          accessToken,
          spreadsheet.id,
          formData,
          trackingId
        );
        sheetUrl = spreadsheet.url;
        sheetName = spreadsheet.title;
        syncedToSheets = true;
      }

      // Record lead in tracking dashboard
      const newLead: SyncedLead = {
        id: trackingId,
        type: 'inquiry',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        title: formData.service,
        dateOrTimeline: formData.scopeTimeline,
        timestamp: new Date().toISOString(),
        syncedToSheets,
        syncedToCalendar: false,
        sheetSpreadsheetId: sheetUrl,
        status: syncedToSheets ? 'synced' : 'local_cached',
      };

      onLeadAdded(newLead);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback if canvas is unavailable
      }

      setSubmitSuccess({
        leadId: trackingId,
        sheetUrl,
        sheetName,
      });
      setShowConfirmDialog(false);
    } catch (err: unknown) {
      console.error('Inquiry submission error:', err);
      const message = err instanceof Error ? err.message : 'Failed to submit inquiry';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: serviceOptions[0],
      scopeTimeline: 'Within 2-4 weeks',
      message: '',
    });
    setErrors({});
    setSubmitSuccess(null);
    setSubmitError(null);
    setShowConfirmDialog(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <div className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
            <span className="ml-2 text-[var(--text)]">DISPATCH: /SEND_INQUIRY</span>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
            aria-label="Close inquiry window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitSuccess ? (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[var(--neo-green)] text-black border-[var(--border-thick)] rounded-full flex items-center justify-center mx-auto shadow-[var(--shadow-sm)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-[var(--text)]">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-mono-code">
                  Tracking Reference: <strong className="text-black dark:text-white">{submitSuccess.leadId}</strong>
                </p>
              </div>

              {submitSuccess.sheetUrl ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/50 border-[var(--border)] rounded-[var(--radius-sm)] p-3.5 text-left text-xs font-mono-code space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Logged to Google Sheets Real-Time!</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your inquiry row has been written to: <strong>{submitSuccess.sheetName}</strong>
                  </p>
                  <a
                    href={submitSuccess.sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--neo-yellow)] text-black font-bold rounded border border-black hover:bg-yellow-300 text-xs mt-1"
                  >
                    <span>Open in Google Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded p-3 text-xs text-left text-amber-900 dark:text-amber-200">
                  <p className="font-bold">Captured in Lead Tracker!</p>
                  <p className="mt-0.5">
                    Sign in with Google in the Lead Tracker drawer anytime to sync these entries directly to your live Google Sheets.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="neo-btn px-6 py-2.5 bg-[var(--neo-yellow)] text-black text-xs font-extrabold"
                >
                  RETURN TO PORTFOLIO
                </button>
              </div>
            </div>
          ) : showConfirmDialog ? (
            /* Explicit User Confirmation for Google Workspace Data Mutation (MANDATORY) */
            <div className="space-y-4 py-2">
              <div className="bg-amber-100 dark:bg-amber-950/80 border-[var(--border-thick)] rounded-[var(--radius-sm)] p-4 shadow-[var(--shadow-xs)]">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1.5 text-xs text-amber-950 dark:text-amber-100">
                    <h4 className="font-display font-extrabold text-sm uppercase">
                      Confirm Inquiry & Sheet Synchronization
                    </h4>
                    <p>
                      You are about to transmit this inquiry. With your permission, it will append a new row to your Google Spreadsheet:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 font-mono-code pt-1">
                      <li><strong>Client:</strong> {formData.fullName} ({formData.email})</li>
                      <li><strong>Area:</strong> {formData.service}</li>
                      <li><strong>Timeline:</strong> {formData.scopeTimeline}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 dark:bg-red-950/50 border border-red-500 rounded p-3 text-xs text-red-700 dark:text-red-300 font-mono-code">
                  {submitError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowConfirmDialog(false)}
                  className="neo-btn px-4 py-2 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmedSend}
                  className="neo-btn px-5 py-2 bg-[var(--neo-green)] text-black text-xs font-extrabold flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>WRITING TO SHEET...</span>
                  ) : (
                    <>
                      <span>CONFIRM & TRANSMIT</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleInitialSubmit} className="space-y-3.5">
              <div>
                <h2 id="inquiry-title" className="font-display font-black text-xl sm:text-2xl text-[var(--text)] tracking-tight">
                  Project & Service Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                  Inquiries are logged automatically to a Google Sheet for real-time lead capture.
                </p>
              </div>

              {/* Google Workspace Connection Pill */}
              <div className="flex items-center justify-between p-2.5 bg-[var(--surface-alt)] border-[var(--border-light)] rounded-[var(--radius-sm)] text-xs">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono-code font-bold">
                    {accessToken ? 'Google Sheets Sync: Active' : 'Google Sheets Sync: Local Ready'}
                  </span>
                </div>
                {!accessToken && (
                  <button
                    type="button"
                    onClick={onGoogleSignIn}
                    className="text-[11px] font-bold bg-[var(--neo-yellow)] text-black px-2 py-0.5 rounded border border-black hover:bg-yellow-300"
                  >
                    Connect Google Account
                  </button>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Maria Santos / John Miller"
                  className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-pink)] text-[var(--text)]"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-pink)] text-[var(--text)]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-pink)] text-[var(--text)]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Service & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Service Focus *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-pink)] text-[var(--text)]"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Target Timeline
                  </label>
                  <select
                    name="scopeTimeline"
                    value={formData.scopeTimeline}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-pink)] text-[var(--text)]"
                  >
                    <option value="Urgent (Within 48 hours)">Urgent (Within 48 hours)</option>
                    <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                    <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                    <option value="Flexible / Exploration">Flexible / Exploration</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                  Project Brief or Inquiry Message *
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your network infrastructure requirements, server issues, or QA goals..."
                  className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-pink)] text-[var(--text)]"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono-code text-[var(--text-soft)]">
                  ⚡ Reviewed before dispatch
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="neo-btn px-3 py-2 bg-[var(--surface-alt)] text-[var(--text)] text-xs font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="neo-btn px-5 py-2 bg-[var(--neo-pink)] text-black text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <span>REVIEW & SEND</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
