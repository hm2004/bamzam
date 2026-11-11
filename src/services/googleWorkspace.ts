import {
  InquiryData,
  AppointmentData,
  formatInquiryToSheetRow,
  formatAppointmentToSheetRow,
  calculateEventTimeRange,
} from '../utils/validation.ts';

const SPREADSHEET_STORAGE_KEY = 'hm_leads_spreadsheet_id';

export interface CalendarEventResponse {
  id: string;
  htmlLink: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

/**
 * Retrieves the stored leads spreadsheet ID, or creates a new formatted Google Sheet
 */
export async function getOrCreateLeadsSpreadsheet(accessToken: string): Promise<{
  id: string;
  title: string;
  url: string;
  isNew: boolean;
}> {
  const cachedId = localStorage.getItem(SPREADSHEET_STORAGE_KEY);
  if (cachedId) {
    try {
      const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${cachedId}?fields=spreadsheetId,properties.title`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.spreadsheetId,
          title: data.properties?.title || 'Hervie Mariano - Leads & Inquiries',
          url: `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
          isNew: false,
        };
      }
    } catch {
      // If cached spreadsheet is deleted or inaccessible, proceed to create a new one
    }
  }

  // Create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Hervie Mariano - Real-Time Leads & Appointment Tracker',
      },
      sheets: [
        {
          properties: {
            title: 'Inquiries',
            gridProperties: { rowCount: 100, columnCount: 10, frozenRowCount: 1 },
          },
        },
        {
          properties: {
            title: 'Appointments',
            gridProperties: { rowCount: 100, columnCount: 13, frozenRowCount: 1 },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Spreadsheet: ${errorText}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;

  // Add header rows
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            range: 'Inquiries!A1:I1',
            majorDimension: 'ROWS',
            values: [
              [
                'Lead ID',
                'Submission Timestamp',
                'Client Name',
                'Email Address',
                'Phone / WhatsApp',
                'Service Area',
                'Timeline / Scope',
                'Message / Project Brief',
                'Status',
              ],
            ],
          },
          {
            range: 'Appointments!A1:L1',
            majorDimension: 'ROWS',
            values: [
              [
                'Booking ID',
                'Booking Timestamp',
                'Client Name',
                'Email Address',
                'Phone / WhatsApp',
                'Consultation Topic',
                'Scheduled Date',
                'Time Slot',
                'Duration',
                'Google Calendar Event ID',
                'Client Meeting Notes',
                'Booking Status',
              ],
            ],
          },
        ],
      }),
    }
  );

  localStorage.setItem(SPREADSHEET_STORAGE_KEY, spreadsheetId);

  return {
    id: spreadsheetId,
    title: sheetData.properties?.title || 'Hervie Mariano - Real-Time Leads & Appointment Tracker',
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    isNew: true,
  };
}

/**
 * Appends an inquiry row to the Google Sheet
 */
export async function appendInquiryToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  inquiry: InquiryData,
  trackingId: string
): Promise<void> {
  const rowValues = formatInquiryToSheetRow(inquiry, trackingId);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A:I:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'Inquiries!A:I',
        majorDimension: 'ROWS',
        values: [rowValues],
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Sheets append failed: ${errorText}`);
  }
}

/**
 * Schedules an event on the user's primary Google Calendar
 */
export async function scheduleGoogleCalendarEvent(
  accessToken: string,
  appointment: AppointmentData
): Promise<CalendarEventResponse> {
  const { startIso, endIso } = calculateEventTimeRange(
    appointment.date,
    appointment.timeSlot,
    appointment.durationMinutes
  );

  const eventPayload = {
    summary: `[Consultation] Hervie Mariano & ${appointment.fullName}`,
    description: `IT & Network Consultation with Hervie Keithrick Mariano\n\nClient Name: ${appointment.fullName}\nEmail: ${appointment.email}\nPhone: ${appointment.phone || 'N/A'}\nTopic: ${appointment.serviceType}\nNotes: ${appointment.notes || 'None'}\n\nSynchronized via Hervie Mariano Portfolio Appointment Portal.`,
    start: {
      dateTime: startIso,
      timeZone: appointment.timeZone || 'Asia/Manila',
    },
    end: {
      dateTime: endIso,
      timeZone: appointment.timeZone || 'Asia/Manila',
    },
    attendees: [
      { email: appointment.email, displayName: appointment.fullName },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventPayload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Calendar booking failed: ${errorText}`);
  }

  const data = await res.json();
  return {
    id: data.id,
    htmlLink: data.htmlLink || `https://calendar.google.com/calendar/r/eventedit/${data.id}`,
    summary: data.summary,
    start: data.start,
    end: data.end,
  };
}

/**
 * Appends a scheduled appointment row to the Google Sheet
 */
export async function appendAppointmentToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  appointment: AppointmentData,
  trackingId: string,
  calendarEventId: string
): Promise<void> {
  const rowValues = formatAppointmentToSheetRow(
    appointment,
    trackingId,
    calendarEventId
  );

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Appointments!A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'Appointments!A:L',
        majorDimension: 'ROWS',
        values: [rowValues],
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Sheets appointment log failed: ${errorText}`);
  }
}
