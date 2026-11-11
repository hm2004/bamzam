export interface InquiryData {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  scopeTimeline: string;
  message: string;
}

export interface AppointmentData {
  fullName: string;
  email: string;
  phone?: string;
  serviceType: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM (e.g. "10:00")
  durationMinutes: number; // e.g. 30, 45, 60
  timeZone?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[\d\s+\-()]{7,20}$/;

export function validateInquiryForm(data: Partial<InquiryData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (data.phone && data.phone.trim().length > 0 && !PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid phone number or leave it blank.';
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.service = 'Please select a service or area of interest.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a detailed inquiry message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateAppointmentForm(data: Partial<AppointmentData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (data.phone && data.phone.trim().length > 0 && !PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid phone number.';
  }

  if (!data.date) {
    errors.date = 'Please select an appointment date.';
  } else {
    const selected = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime()) || selected < today) {
      errors.date = 'Appointment date must be today or a future date.';
    }
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select a meeting time slot.';
  }

  if (!data.serviceType) {
    errors.serviceType = 'Please select a consultation type.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates start and end ISO strings for Google Calendar event creation
 */
export function calculateEventTimeRange(
  dateStr: string,
  timeSlot: string,
  durationMinutes: number = 30
): { startIso: string; endIso: string } {
  const [hours, minutes] = timeSlot.split(':').map(Number);
  const startDate = new Date(dateStr);
  startDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  return {
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString(),
  };
}

/**
 * Formats inquiry data into an array of cell values for Google Sheets appending
 */
export function formatInquiryToSheetRow(
  inquiry: InquiryData,
  trackingId: string,
  timestamp: string = new Date().toISOString()
): (string | number)[] {
  return [
    trackingId,
    timestamp,
    inquiry.fullName.trim(),
    inquiry.email.trim(),
    inquiry.phone ? inquiry.phone.trim() : 'N/A',
    inquiry.service,
    inquiry.scopeTimeline || 'Flexible',
    inquiry.message.trim(),
    'New Lead',
  ];
}

/**
 * Formats appointment data into an array of cell values for Google Sheets appending
 */
export function formatAppointmentToSheetRow(
  appointment: AppointmentData,
  trackingId: string,
  calendarEventId: string = 'Pending/Direct',
  timestamp: string = new Date().toISOString()
): (string | number)[] {
  return [
    trackingId,
    timestamp,
    appointment.fullName.trim(),
    appointment.email.trim(),
    appointment.phone ? appointment.phone.trim() : 'N/A',
    appointment.serviceType,
    appointment.date,
    appointment.timeSlot,
    `${appointment.durationMinutes} mins`,
    calendarEventId,
    appointment.notes || 'No notes provided',
    'Confirmed',
  ];
}
