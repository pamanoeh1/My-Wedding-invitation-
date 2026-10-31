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
  validateAdminLogin,
  isSecretAdminParam,
  DEFAULT_WEDDING_CONFIG,
} from './wedding';

test('isSecretAdminParam accurately detects secret admin link salam2408&risa1211', () => {
  assert.equal(isSecretAdminParam('?salam2408&risa1211'), true);
  assert.equal(isSecretAdminParam('?key=salam2408&risa1211'), true);
  assert.equal(isSecretAdminParam('?to=Budi&salam2408&risa1211=1'), true);
  assert.equal(isSecretAdminParam('', '/salam2408&risa1211'), true);
  assert.equal(isSecretAdminParam('?to=Dimas+Anggara'), false);
  assert.equal(isSecretAdminParam(''), false);
});

test('validateAdminLogin validates credentials accurately', () => {
  assert.equal(validateAdminLogin('admin', 'wedding2026'), true);
  assert.equal(validateAdminLogin(' admin ', 'wedding2026'), true);
  assert.equal(validateAdminLogin('admin', 'wrongpass'), false);
  assert.equal(validateAdminLogin('wronguser', 'wedding2026'), false);
  assert.equal(validateAdminLogin('', ''), false);
});

test('DEFAULT_WEDDING_CONFIG contains dynamic features, events, bank accounts, and QRIS', () => {
  assert.equal(DEFAULT_WEDDING_CONFIG.features.splashScreen, true);
  assert.equal(DEFAULT_WEDDING_CONFIG.features.audioPlayer, true);
  assert.ok(DEFAULT_WEDDING_CONFIG.event.eventsList.length >= 2);
  assert.ok(DEFAULT_WEDDING_CONFIG.gifts.bankAccounts.length >= 3);
  assert.ok(DEFAULT_WEDDING_CONFIG.gallery.length >= 6);
  assert.ok(DEFAULT_WEDDING_CONFIG.protocols.length >= 4);
  assert.equal(DEFAULT_WEDDING_CONFIG.gifts.qris.isActive, true);
  assert.equal(DEFAULT_WEDDING_CONFIG.gifts.qris.merchantName, 'Arya & Nabila Wedding');
  assert.equal(DEFAULT_WEDDING_CONFIG.gifts.qris.nmid, 'ID1020261212891');
});

test('extractGuestName extracts guest name from URL query params correctly', () => {
  assert.equal(extractGuestName('?to=Budi+Santoso'), 'Budi Santoso');
  assert.equal(extractGuestName('?to=dr.+Amanda+%26+Partner'), 'dr. Amanda & Partner');
  assert.equal(extractGuestName(''), 'Tamu Undangan');
});

test('calculateCountdown computes remaining days, hours, minutes, and seconds', () => {
  const now = new Date('2026-10-30T10:00:00Z');
  const targetFuture = new Date('2026-11-01T14:30:15Z');
  const result = calculateCountdown(targetFuture, now);
  assert.equal(result.isPassed, false);
  assert.equal(result.days, 2);
  assert.equal(result.hours, 4);
});

test('validateRsvp validates attendance and guest count rules', () => {
  const valid = validateRsvp({
    name: 'Dimas Anggara',
    attendance: 'hadir',
    guestsCount: 2,
    message: 'Selamat berbahagia!',
  });
  assert.equal(valid.valid, true);
});
