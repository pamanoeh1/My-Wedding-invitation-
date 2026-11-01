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
  extractFatherLastName,
  formatFamilyAnnouncement,
  formatWishRelativeTime,
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

test('extractFatherLastName extracts father family name cleanly', () => {
  assert.equal(extractFatherLastName('Bpk. Ir. H. Bambang Wijaya'), 'Wijaya');
  assert.equal(extractFatherLastName('Bpk. Prof. Dr. Hendra Gunawan'), 'Gunawan');
  assert.equal(extractFatherLastName('Rahmat Santoso'), 'Santoso');
  assert.equal(extractFatherLastName(''), '');
});

test('formatFamilyAnnouncement formats dynamic family announcement', () => {
  const result = formatFamilyAnnouncement('Bpk. Ir. H. Bambang Wijaya', 'Bpk. Prof. Dr. Hendra Gunawan');
  assert.equal(result, 'Beserta segenap Keluarga Besar Wijaya & Gunawan');

  const custom = formatFamilyAnnouncement('Bpk. Rahmat Santoso', 'Bpk. Budi Pratama');
  assert.equal(custom, 'Beserta segenap Keluarga Besar Santoso & Pratama');
});

test('formatWishRelativeTime displays "Baru saja" only under 5 minutes and relative time otherwise', () => {
  const now = Date.now();

  // 1 minute ago -> "Baru saja"
  const recentWish: any = {
    id: '1',
    name: 'Tamu 1',
    relationship: 'Sahabat',
    attendance: 'hadir',
    message: 'Selamat!',
    createdAt: new Date(now - 60 * 1000).toISOString(),
    timestamp: now - 60 * 1000,
  };
  assert.equal(formatWishRelativeTime(recentWish, now), 'Baru saja');

  // 4 minutes 59 seconds ago -> "Baru saja"
  const under5Wish: any = {
    ...recentWish,
    timestamp: now - 4.9 * 60 * 1000,
  };
  assert.equal(formatWishRelativeTime(under5Wish, now), 'Baru saja');

  // 5 minutes ago -> "5 menit yang lalu" (Baru saja must be gone!)
  const fiveMinWish: any = {
    ...recentWish,
    timestamp: now - 5 * 60 * 1000,
  };
  assert.equal(formatWishRelativeTime(fiveMinWish, now), '5 menit yang lalu');

  // 12 minutes ago -> "12 menit yang lalu"
  const twelveMinWish: any = {
    ...recentWish,
    timestamp: now - 12 * 60 * 1000,
  };
  assert.equal(formatWishRelativeTime(twelveMinWish, now), '12 menit yang lalu');

  // 2 hours ago -> "2 jam yang lalu"
  const twoHourWish: any = {
    ...recentWish,
    timestamp: now - 2 * 3600 * 1000,
  };
  assert.equal(formatWishRelativeTime(twoHourWish, now), '2 jam yang lalu');
});

