/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractGuestName,
  calculateCountdown,
  createGoogleCalendarUrl,
  validateRsvp,
} from './wedding';

test('extractGuestName extracts guest name from URL query params correctly', () => {
  assert.equal(extractGuestName('?to=Budi+Santoso'), 'Budi Santoso');
  assert.equal(extractGuestName('?to=dr.+Amanda+%26+Partner'), 'dr. Amanda & Partner');
  assert.equal(extractGuestName('?guest=Keluarga+Besar+Sutrisno'), 'Keluarga Besar Sutrisno');
  assert.equal(extractGuestName(''), 'Tamu Undangan');
  assert.equal(extractGuestName('?other=123'), 'Tamu Undangan');
  assert.equal(extractGuestName('?to=<script>alert(1)</script>Ahmad'), 'scriptalert(1)/scriptAhmad');
});

test('calculateCountdown computes remaining days, hours, minutes, and seconds', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  const targetFuture = new Date('2026-11-01T14:30:15Z'); // 2 days, 4 hours, 30 min, 15 sec

  const result = calculateCountdown(targetFuture, now);
  assert.equal(result.isPassed, false);
  assert.equal(result.days, 2);
  assert.equal(result.hours, 4);
  assert.equal(result.minutes, 30);
  assert.equal(result.seconds, 15);

  // Past target
  const targetPast = new Date('2026-10-29T10:00:00Z');
  const pastResult = calculateCountdown(targetPast, now);
  assert.equal(pastResult.isPassed, true);
  assert.equal(pastResult.days, 0);
  assert.equal(pastResult.hours, 0);
});

test('createGoogleCalendarUrl produces valid google calendar URL', () => {
  const url = createGoogleCalendarUrl({
    title: 'Pernikahan Arya & Nabila',
    details: 'Resepsi Pernikahan Arya & Nabila',
    location: 'Grand Ballroom Hotel Mulia, Jakarta',
    start: new Date('2026-12-12T09:00:00Z'),
    end: new Date('2026-12-12T14:00:00Z'),
  });

  assert.ok(url.startsWith('https://calendar.google.com/calendar/render?'));
  assert.ok(url.includes('Pernikahan+Arya'));
  assert.ok(url.includes('Grand+Ballroom'));
});

test('validateRsvp validates attendance and guest count rules', () => {
  const valid = validateRsvp({
    name: 'Dimas Anggara',
    attendance: 'hadir',
    guestsCount: 2,
    message: 'Selamat berbahagia!',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  const invalidName = validateRsvp({
    name: 'A',
    attendance: 'hadir',
    guestsCount: 1,
  });
  assert.equal(invalidName.valid, false);
  assert.ok(invalidName.errors.name);

  const invalidCount = validateRsvp({
    name: 'Rina',
    attendance: 'hadir',
    guestsCount: 0,
  });
  assert.equal(invalidCount.valid, false);
  assert.ok(invalidCount.errors.guestsCount);
});
