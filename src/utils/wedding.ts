/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CalendarEvent {
  title: string;
  details: string;
  location: string;
  start: Date;
  end: Date;
}

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  totalSeconds: number;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  message: string;
  createdAt: string;
}

/**
 * Extracts the guest name from a URL query string (supports ?to=, ?guest=, ?u=)
 */
export function extractGuestName(queryString: string, defaultName = 'Tamu Undangan'): string {
  if (!queryString) return defaultName;
  
  const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  const params = new URLSearchParams(cleanQuery);
  
  const candidate = params.get('to') || params.get('guest') || params.get('u') || params.get('nama');
  if (!candidate) return defaultName;

  const trimmed = candidate.trim().replace(/[<>]/g, '');
  return trimmed.length > 0 ? trimmed : defaultName;
}

/**
 * Calculates remaining countdown time between now and target date
 */
export function calculateCountdown(targetDate: string | Date, nowDate: string | Date = new Date()): CountdownResult {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = typeof nowDate === 'string' ? new Date(nowDate) : nowDate;

  const diffMs = target.getTime() - now.getTime();
  
  if (diffMs <= 0 || isNaN(diffMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isPassed: false,
    totalSeconds,
  };
}

/**
 * Generates an official Google Calendar event creation URL
 */
export function createGoogleCalendarUrl(event: CalendarEvent): string {
  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const startFormatted = formatTime(event.start);
  const endFormatted = formatTime(event.end);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.details,
    location: event.location,
    dates: `${startFormatted}/${endFormatted}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Formats date into formal Indonesian wedding announcement format
 */
export function formatIndonesianDate(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Validates RSVP form input
 */
export function validateRsvp(data: {
  name: string;
  attendance: string;
  guestsCount: number;
  message?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Nama lengkap wajib diisi minimal 2 karakter.';
  }

  if (!['hadir', 'tidak_hadir', 'ragu'].includes(data.attendance)) {
    errors.attendance = 'Silakan pilih status konfirmasi kehadiran.';
  }

  if (data.attendance === 'hadir' && (!data.guestsCount || data.guestsCount < 1 || data.guestsCount > 10)) {
    errors.guestsCount = 'Jumlah tamu harus antara 1 sampai 10 orang.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
