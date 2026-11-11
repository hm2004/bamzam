import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateInquiryForm,
  validateAppointmentForm,
  calculateEventTimeRange,
  formatInquiryToSheetRow,
  formatAppointmentToSheetRow,
} from './validation.ts';

test('validateInquiryForm accepts valid inputs', () => {
  const result = validateInquiryForm({
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+63 9123456789',
    service: 'Network Administration',
    scopeTimeline: 'Within 2 weeks',
    message: 'Need help designing a resilient multi-VLAN topology.',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateInquiryForm detects missing or invalid fields', () => {
  const result = validateInquiryForm({
    fullName: '',
    email: 'not-an-email',
    message: 'Short',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.service);
  assert.ok(result.errors.message);
});

test('validateAppointmentForm checks future date and required fields', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const dateStr = tomorrow.toISOString().split('T')[0];

  const valid = validateAppointmentForm({
    fullName: 'Mark Spencer',
    email: 'mark@networkcorp.com',
    date: dateStr,
    timeSlot: '14:00',
    serviceType: '30-min IT Infrastructure Discovery',
  });
  assert.equal(valid.isValid, true);

  const pastResult = validateAppointmentForm({
    fullName: 'Mark Spencer',
    email: 'mark@networkcorp.com',
    date: '2020-01-01',
    timeSlot: '14:00',
    serviceType: '30-min IT Infrastructure Discovery',
  });
  assert.equal(pastResult.isValid, false);
  assert.ok(pastResult.errors.date);
});

test('calculateEventTimeRange generates consistent start and end ISO strings', () => {
  const { startIso, endIso } = calculateEventTimeRange('2026-11-20', '10:00', 45);
  const start = new Date(startIso);
  const end = new Date(endIso);
  const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  assert.equal(diffMinutes, 45);
});

test('formatInquiryToSheetRow creates a 9-column row array', () => {
  const row = formatInquiryToSheetRow(
    {
      fullName: 'Alice Smith',
      email: 'alice@domain.com',
      phone: '+1 555-0199',
      service: 'Cisco Routing',
      scopeTimeline: '1 month',
      message: 'Looking for a certified network specialist.',
    },
    'INQ-1001',
    '2026-11-10T12:00:00Z'
  );

  assert.equal(row.length, 9);
  assert.equal(row[0], 'INQ-1001');
  assert.equal(row[2], 'Alice Smith');
  assert.equal(row[3], 'alice@domain.com');
  assert.equal(row[8], 'New Lead');
});

test('formatAppointmentToSheetRow creates a 12-column row array', () => {
  const row = formatAppointmentToSheetRow(
    {
      fullName: 'Bob Davis',
      email: 'bob@enterprise.org',
      serviceType: '60-min Network Architecture Consultation',
      date: '2026-11-25',
      timeSlot: '15:30',
      durationMinutes: 60,
      notes: 'Review topology map',
    },
    'APT-2001',
    'CAL-EVT-778',
    '2026-11-10T12:00:00Z'
  );

  assert.equal(row.length, 12);
  assert.equal(row[0], 'APT-2001');
  assert.equal(row[2], 'Bob Davis');
  assert.equal(row[6], '2026-11-25');
  assert.equal(row[8], '60 mins');
  assert.equal(row[9], 'CAL-EVT-778');
  assert.equal(row[11], 'Confirmed');
});
