/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import defaultWeddingConfigJson from '../config/wedding-config.json';
import defaultWeddingWishesJson from '../config/wedding-wishes.json';

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
  timestamp?: number;
}

export interface BankAccountItem {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isActive: boolean;
}

export interface QrisConfig {
  isActive: boolean;
  title: string;
  merchantName: string;
  nmid: string;
  description: string;
  instruction: string;
  qrImageUrl: string;
}

export interface WeddingEventItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  isActive: boolean;
}

export interface GalleryPhotoItem {
  id: string;
  url: string;
  caption: string;
  category: string;
  isActive: boolean;
}

export interface ProtocolItem {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface WeddingConfig {
  features: {
    splashScreen: boolean;
    audioPlayer: boolean;
    countdown: boolean;
    quote: boolean;
    couple: boolean;
    events: boolean;
    story: boolean;
    gallery: boolean;
    videoTeaser: boolean;
    rsvp: boolean;
    digitalGift: boolean;
    physicalGift: boolean;
    protocol: boolean;
    downloadStandalone: boolean;
  };
  audioUrl: string;
  couple: {
    groom: {
      name: string;
      fullName: string;
      father: string;
      mother: string;
      instagram: string;
      photoUrl: string;
    };
    bride: {
      name: string;
      fullName: string;
      father: string;
      mother: string;
      instagram: string;
      photoUrl: string;
    };
    quoteArabic: string;
    quoteTranslation: string;
    quoteSource: string;
    quoteFont: string; // 'KFGQPC Uthman Taha Naskh Regular' | 'kfgqpc-uthmanic-script-hafs-regular' | 'Amiri Quran' | 'Traditional Arabic'
  };
  event: {
    weddingDateIso: string;
    dateDisplay: string;
    heroSubtitle: string;
    heroPhotoUrl: string;
    eventsList: WeddingEventItem[];
    parkingNote: string;
  };
  videoTeaser: {
    isActive: boolean;
    title: string;
    description: string;
    videoUrl: string;
    posterUrl: string;
  };
  gallery: GalleryPhotoItem[];
  protocols: ProtocolItem[];
  gifts: {
    bankAccounts: BankAccountItem[];
    qris: QrisConfig;
    physicalAddress: string;
    receiverContact: string;
  };
  milestones: Array<{
    year: string;
    title: string;
    description: string;
  }>;
}

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = defaultWeddingConfigJson as unknown as WeddingConfig;
export const DEFAULT_WEDDING_WISHES: GuestWish[] = defaultWeddingWishesJson as unknown as GuestWish[];

export const CONFIG_STORAGE_KEY = 'wedding_app_config_v2';
export const AUTH_STORAGE_KEY = 'wedding_admin_auth_v1';

/**
 * Checks whether the URL or query indicates the secret admin link "salam2408&risa1211"
 */
export function isSecretAdminParam(searchString: string, pathname = ''): boolean {
  if (!searchString && !pathname) return false;
  
  const cleanSearch = searchString.startsWith('?') ? searchString.slice(1) : searchString;
  
  // Directly matches "salam2408&risa1211" in search or path
  if (
    cleanSearch.includes('salam2408&risa1211') ||
    cleanSearch.includes('salam2408') && cleanSearch.includes('risa1211') ||
    pathname.includes('salam2408&risa1211') ||
    pathname.includes('salam2408') && pathname.includes('risa1211')
  ) {
    return true;
  }

  const params = new URLSearchParams(cleanSearch);
  if (
    params.has('salam2408&risa1211') ||
    params.get('key') === 'salam2408&risa1211' ||
    params.get('admin') === 'salam2408&risa1211' ||
    params.get('edit') === 'salam2408&risa1211' ||
    params.get('secret') === 'salam2408&risa1211'
  ) {
    return true;
  }

  return false;
}

export function loadWeddingConfig(): WeddingConfig {
  if (typeof window === 'undefined') return DEFAULT_WEDDING_CONFIG;
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_WEDDING_CONFIG,
        ...parsed,
        features: { ...DEFAULT_WEDDING_CONFIG.features, ...(parsed.features || {}) },
        couple: { ...DEFAULT_WEDDING_CONFIG.couple, ...(parsed.couple || {}) },
        event: {
          ...DEFAULT_WEDDING_CONFIG.event,
          ...(parsed.event || {}),
          eventsList: parsed.event?.eventsList || DEFAULT_WEDDING_CONFIG.event.eventsList,
        },
        gifts: {
          ...DEFAULT_WEDDING_CONFIG.gifts,
          ...(parsed.gifts || {}),
          bankAccounts: parsed.gifts?.bankAccounts || DEFAULT_WEDDING_CONFIG.gifts.bankAccounts,
          qris: {
            ...DEFAULT_WEDDING_CONFIG.gifts.qris,
            ...(parsed.gifts?.qris || {}),
          },
        },
        gallery: parsed.gallery || DEFAULT_WEDDING_CONFIG.gallery,
        protocols: parsed.protocols || DEFAULT_WEDDING_CONFIG.protocols,
        videoTeaser: { ...DEFAULT_WEDDING_CONFIG.videoTeaser, ...(parsed.videoTeaser || {}) },
      };
    }
  } catch {
    // fallback
  }
  return DEFAULT_WEDDING_CONFIG;
}

/**
 * Loads wedding configuration from server (/api/config)
 * and keeps local storage updated.
 */
export async function fetchServerWeddingConfig(): Promise<WeddingConfig> {
  if (typeof window === 'undefined') return DEFAULT_WEDDING_CONFIG;
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.config) {
        try {
          localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(data.config));
        } catch {
          // ignore
        }
        return data.config;
      }
    }
  } catch (err) {
    console.warn('Could not fetch server config, using local cache:', err);
  }
  return loadWeddingConfig();
}

/**
 * Saves wedding config to localStorage AND broadcasts/saves to server across entire codebase.
 */
export function saveWeddingConfig(config: WeddingConfig, syncToServer = true): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }

  if (syncToServer) {
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    }).catch((err) => {
      console.warn('Background server sync error:', err);
    });
  }
}

/**
 * Saves config to server with awaitable Promise for confirmation feedback
 */
export async function saveWeddingConfigToServer(config: WeddingConfig): Promise<{ success: boolean; message?: string }> {
  saveWeddingConfig(config, false);
  try {
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, message: data.message };
    }
  } catch (err: any) {
    console.error('Server save failed:', err);
  }
  return { success: false, message: 'Gagal menghubungkan ke server' };
}

export function resetWeddingConfig(): WeddingConfig {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // ignore
    }
    fetch('/api/config/reset', { method: 'POST' }).catch(() => {});
  }
  return DEFAULT_WEDDING_CONFIG;
}

/**
 * Fetches persistent guest wishes from server
 */
export async function fetchServerWishes(): Promise<GuestWish[]> {
  try {
    const res = await fetch('/api/wishes');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.wishes)) {
        return data.wishes;
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_WEDDING_WISHES;
}

/**
 * Submits a new guest wish to server
 */
export async function postServerWish(wish: Partial<GuestWish>): Promise<GuestWish | null> {
  try {
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.wish) {
        return data.wish;
      }
    }
  } catch {
    // fallback
  }
  return null;
}

/**
 * Permanently deletes a wish from the server across files
 */
export async function deleteServerWish(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/wishes/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const data = await res.json();
      return Boolean(data && data.success);
    }
  } catch (err) {
    console.error('Error deleting server wish:', err);
  }
  return false;
}

/**
 * Extracts the father's family/last name from his full formal title/name.
 * Example: 'Bpk. Ir. H. Bambang Wijaya' -> 'Wijaya'
 * Example: 'Bpk. Prof. Dr. Hendra Gunawan' -> 'Gunawan'
 */
export function extractFatherLastName(fullName: string, fallback = ''): string {
  if (!fullName || typeof fullName !== 'string') return fallback;
  // Strip out titles like Bpk, Bapak, Ibu, Ir, Dr, Prof, H, Hj, Drs, S.T., M.M., etc.
  const withoutTitles = fullName
    .replace(/\b(Bpk\.?|Bapak\.?|Ibu\.?|Ir\.?|Dr\.?|Drs\.?|Dra\.?|Prof\.?|H\.?|Hj\.?|S\.T\.?|S\.E\.?|S\.Kom\.?|M\.M\.?|M\.Si\.?|M\.T\.?|Ph\.D\.?)\b/gi, '')
    .trim();
  
  const words = withoutTitles.split(/\s+/).filter(Boolean);
  if (words.length > 0) {
    const lastWord = words[words.length - 1].replace(/^[,\.\s]+|[,\.\s]+$/g, '');
    if (lastWord.length > 0) return lastWord;
  }
  return fallback;
}

/**
 * Formats family announcement text dynamically based on father names.
 * 'Beserta segenap Keluarga Besar {groomFamily} & {brideFamily}'
 */
export function formatFamilyAnnouncement(
  groomFather: string,
  brideFather: string,
  fallback = 'Wijaya & Gunawan'
): string {
  const groomFamily = extractFatherLastName(groomFather, 'Wijaya');
  const brideFamily = extractFatherLastName(brideFather, 'Gunawan');

  if (groomFamily && brideFamily) {
    return `Beserta segenap Keluarga Besar ${groomFamily} & ${brideFamily}`;
  } else if (groomFamily || brideFamily) {
    return `Beserta segenap Keluarga Besar ${groomFamily || brideFamily}`;
  }
  return `Beserta segenap Keluarga Besar ${fallback}`;
}

/**
 * Formats relative time for guest wishes in real-time.
 * Rule: "Baru saja akan hilang kalau sudah 5 menit lebih"
 * - Under 5 minutes: 'Baru saja'
 * - 5 to 59 minutes: '{mins} menit yang lalu'
 * - 1 to 23 hours: '{hours} jam yang lalu'
 * - 1 to 6 days: '{days} hari yang lalu'
 * - 7+ days: Indonesian date format
 */
export function formatWishRelativeTime(wish: GuestWish, nowMs: number = Date.now()): string {
  let wishEpoch: number | null = null;

  if (typeof wish.timestamp === 'number' && !isNaN(wish.timestamp) && wish.timestamp > 0) {
    wishEpoch = wish.timestamp;
  } else if (wish.createdAt && wish.createdAt !== 'Baru saja') {
    const parsed = Date.parse(wish.createdAt);
    if (!isNaN(parsed)) {
      wishEpoch = parsed;
    } else {
      // Check if createdAt has strings like "2 jam yang lalu", "1 hari yang lalu"
      const matchMin = wish.createdAt.match(/(\d+)\s+menit\s+yang\s+lalu/i);
      if (matchMin) {
        wishEpoch = nowMs - parseInt(matchMin[1], 10) * 60 * 1000;
      }
      const matchHour = wish.createdAt.match(/(\d+)\s+jam\s+yang\s+lalu/i);
      if (matchHour) {
        wishEpoch = nowMs - parseInt(matchHour[1], 10) * 60 * 60 * 1000;
      }
      const matchDay = wish.createdAt.match(/(\d+)\s+hari\s+yang\s+lalu/i);
      if (matchDay) {
        wishEpoch = nowMs - parseInt(matchDay[1], 10) * 24 * 60 * 60 * 1000;
      }
    }
  }

  // If no date could be parsed and it was marked as 'Baru saja'
  if (!wishEpoch) {
    if (wish.createdAt === 'Baru saja') {
      return 'Baru saja';
    }
    return wish.createdAt || 'Baru saja';
  }

  const diffMs = Math.max(0, nowMs - wishEpoch);
  const diffMinutes = Math.floor(diffMs / 60000);

  // Exact rule: "Baru saja akan hilang kalau sudah 5 menit lebih"
  if (diffMinutes < 5) {
    return 'Baru saja';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} hari yang lalu`;
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(wishEpoch));
}

/**
 * Validates admin credentials
 */
export function validateAdminLogin(
  userInput: string,
  passInput: string,
  expectedUser = 'admin',
  expectedPass = 'wedding2026'
): boolean {
  if (!userInput || !passInput) return false;
  return userInput.trim() === expectedUser.trim() && passInput === expectedPass;
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
