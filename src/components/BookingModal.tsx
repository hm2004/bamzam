import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  FileSpreadsheet,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { consultationTypes } from '../data/portfolioData.ts';
import {
  validateAppointmentForm,
  AppointmentData,
} from '../utils/validation.ts';
import {
  scheduleGoogleCalendarEvent,
  getOrCreateLeadsSpreadsheet,
  appendAppointmentToGoogleSheet,
} from '../services/googleWorkspace.ts';
import { SyncedLead } from '../types/index.ts';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string | null;
  onGoogleSignIn: () => Promise<void>;
  onLeadAdded: (lead: SyncedLead) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  accessToken,
  onGoogleSignIn,
  onLeadAdded,
}) => {
  // Pre-calculate tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<AppointmentData>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: consultationTypes[0].title,
    date: defaultDate,
    timeSlot: '10:00',
    durationMinutes: consultationTypes[0].duration,
    timeZone: 'Asia/Manila',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingId: string;
    calendarLink?: string;
    sheetUrl?: string;
    dateTimeStr: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '13:30',
    '14:30',
    '15:30',
    '16:30',
  ];

  const handleConsultationSelect = (plan: typeof consultationTypes[0]) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: plan.title,
      durationMinutes: plan.duration,
    }));
  };

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
    const result = validateAppointmentForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setShowConfirmDialog(true);
  };

  const handleConfirmedBooking = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const bookingId = `APT-${Date.now().toString().slice(-6)}`;
    let calendarLink: string | undefined;
    let calendarEventId: string = 'Pending/Direct';
    let sheetUrl: string | undefined;
    let syncedToCalendar = false;
    let syncedToSheets = false;

    try {
      if (accessToken) {
        // 1. Create Google Calendar event
        const calEvent = await scheduleGoogleCalendarEvent(accessToken, formData);
        calendarLink = calEvent.htmlLink;
        calendarEventId = calEvent.id;
        syncedToCalendar = true;

        // 2. Append booking to Google Sheet
        const spreadsheet = await getOrCreateLeadsSpreadsheet(accessToken);
        await appendAppointmentToGoogleSheet(
          accessToken,
          spreadsheet.id,
          formData,
          bookingId,
          calendarEventId
        );
        sheetUrl = spreadsheet.url;
        syncedToSheets = true;
      }

      // Record lead in tracking dashboard
      const newLead: SyncedLead = {
        id: bookingId,
        type: 'appointment',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        title: formData.serviceType,
        dateOrTimeline: `${formData.date} at ${formData.timeSlot} (${formData.durationMinutes}m)`,
        timestamp: new Date().toISOString(),
        syncedToSheets,
        syncedToCalendar,
        sheetSpreadsheetId: sheetUrl,
        calendarEventId,
        calendarLink,
        status: syncedToCalendar ? 'synced' : 'local_cached',
      };

      onLeadAdded(newLead);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore canvas error
      }

      setBookingSuccess({
        bookingId,
        calendarLink,
        sheetUrl,
        dateTimeStr: `${formData.date} at ${formData.timeSlot} (PHT)`,
      });
      setShowConfirmDialog(false);
    } catch (err: unknown) {
      console.error('Booking submission error:', err);
      const message = err instanceof Error ? err.message : 'Failed to schedule appointment';
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
      serviceType: consultationTypes[0].title,
      date: defaultDate,
      timeSlot: '10:00',
      durationMinutes: consultationTypes[0].duration,
      timeZone: 'Asia/Manila',
      notes: '',
    });
    setErrors({});
    setBookingSuccess(null);
    setSubmitError(null);
    setShowConfirmDialog(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
            <span className="ml-2 text-[var(--text)]">CALENDAR: /SCHEDULE_SYNC</span>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
            aria-label="Close scheduling window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {bookingSuccess ? (
            /* Booking Confirmed State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[var(--neo-yellow)] text-black border-[var(--border-thick)] rounded-full flex items-center justify-center mx-auto shadow-[var(--shadow-sm)]">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-[var(--text)]">
                  Consultation Confirmed & Synced!
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-mono-code">
                  Scheduled for: <strong className="text-black dark:text-white">{bookingSuccess.dateTimeStr}</strong>
                </p>
                <p className="text-xs text-[var(--text-soft)] font-mono-code mt-0.5">
                  Reference: <strong>{bookingSuccess.bookingId}</strong>
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border-[var(--border)] rounded-[var(--radius-sm)] p-3.5 text-left text-xs font-mono-code space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Synchronized to Google Calendar & Google Sheets!</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  The appointment has been created on your calendar and logged to your tracker sheet.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {bookingSuccess.calendarLink && (
                    <a
                      href={bookingSuccess.calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--neo-yellow)] text-black font-extrabold rounded border border-black hover:bg-yellow-300 text-xs shadow-[var(--shadow-xs)]"
                    >
                      <span>Open in Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {bookingSuccess.sheetUrl && (
                    <a
                      href={bookingSuccess.sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] text-[var(--text)] font-bold rounded border border-black hover:bg-slate-100 text-xs shadow-[var(--shadow-xs)]"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>View in Google Sheet</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="neo-btn px-6 py-2.5 bg-[var(--neo-yellow)] text-black text-xs font-extrabold"
                >
                  DONE
                </button>
              </div>
            </div>
          ) : showConfirmDialog ? (
            /* Explicit User Confirmation for Workspace Mutation (MANDATORY) */
            <div className="space-y-4 py-2">
              <div className="bg-amber-100 dark:bg-amber-950/80 border-[var(--border-thick)] rounded-[var(--radius-sm)] p-4 shadow-[var(--shadow-xs)]">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1.5 text-xs text-amber-950 dark:text-amber-100">
                    <h4 className="font-display font-extrabold text-sm uppercase">
                      Confirm Appointment & Calendar Synchronization
                    </h4>
                    <p>
                      You are about to book this appointment. With your permission, the application will:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 font-mono-code pt-1">
                      <li>Create an event on your primary <strong>Google Calendar</strong> for <strong>{formData.date} at {formData.timeSlot}</strong>.</li>
                      <li>Append an entry into your <strong>Google Sheet</strong> (Appointments tab).</li>
                      <li>Send invite notification to <strong>{formData.email}</strong>.</li>
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
                  GO BACK
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmedBooking}
                  className="neo-btn px-5 py-2 bg-[var(--neo-yellow)] text-black text-xs font-extrabold flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>CREATING EVENT & SYNCING...</span>
                  ) : (
                    <>
                      <span>CONFIRM & BOOK</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div>
                <h2 id="booking-title" className="font-display font-black text-xl sm:text-2xl text-[var(--text)] tracking-tight">
                  Schedule IT Consultation
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                  Direct appointment synchronization with Google Calendar & Google Sheets lead tracking.
                </p>
              </div>

              {/* Consultation Type Selector */}
              <div>
                <label className="block text-xs font-mono-code font-bold uppercase mb-1.5 text-[var(--text)]">
                  Select Consultation Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {consultationTypes.map((plan) => {
                    const isSelected = formData.serviceType === plan.title;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => handleConsultationSelect(plan)}
                        className={`p-2.5 text-left border rounded-[var(--radius-xs)] transition-all ${
                          isSelected
                            ? 'bg-[var(--neo-yellow)] text-black border-black shadow-[var(--shadow-xs)] scale-[1.02]'
                            : 'bg-[var(--surface-alt)] text-[var(--text)] border-[var(--border-light)] hover:bg-[var(--surface)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-black text-xs">
                            {plan.duration} MINS
                          </span>
                          {isSelected && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <p className="text-[11px] font-bold mt-1 line-clamp-1">{plan.title}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Meeting Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={defaultDate}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-yellow)] text-[var(--text)]"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Time Slot (PHT / GMT+8) *
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-yellow)] text-[var(--text)]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} (Morning/Afternoon)
                      </option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              {/* Attendee Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-yellow)] text-[var(--text)]"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                    Calendar Invite Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-yellow)] text-[var(--text)]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-mono-code flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Meeting Notes */}
              <div>
                <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-yellow)] text-[var(--text)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code font-bold uppercase mb-1 text-[var(--text)]">
                  Topics to Discuss / Agenda Notes
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. Discuss Cisco switch VLAN migration, Linux server security hardening, or QA metrics..."
                  className="w-full px-3 py-2 bg-[var(--surface)] border-[var(--border)] rounded-[var(--radius-xs)] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neo-yellow)] text-[var(--text)]"
                ></textarea>
              </div>

              {/* Google Workspace Connection Pill */}
              <div className="flex items-center justify-between p-2.5 bg-[var(--surface-alt)] border-[var(--border-light)] rounded-[var(--radius-sm)] text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span className="font-mono-code font-bold">
                    {accessToken ? 'Google Calendar Sync: Active' : 'Google Calendar: Connect to sync'}
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

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono-code text-[var(--text-soft)]">
                  ⚡ Auto-syncs to calendar & sheet
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
                    className="neo-btn px-5 py-2 bg-[var(--neo-yellow)] text-black text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <span>REVIEW & BOOK</span>
                    <Clock className="w-3.5 h-3.5" />
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
