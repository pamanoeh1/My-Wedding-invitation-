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

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  features: {
    splashScreen: true,
    audioPlayer: true,
    countdown: true,
    quote: true,
    couple: true,
    events: true,
    story: true,
    gallery: true,
    videoTeaser: true,
    rsvp: true,
    digitalGift: true,
    physicalGift: true,
    protocol: true,
    downloadStandalone: true,
  },
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=wedding-love-18342.mp3',
  couple: {
    groom: {
      name: 'Arya',
      fullName: 'Raden Arya Wijaya, S.T.',
      father: 'Bpk. Ir. H. Bambang Wijaya',
      mother: 'Ibu Hj. Siti Rahmawati',
      instagram: 'aryawijaya',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    bride: {
      name: 'Nabila',
      fullName: 'dr. Nabila Putri Larasati',
      father: 'Bpk. Prof. Dr. Hendra Gunawan',
      mother: 'Ibu Drg. Ratna Sari',
      instagram: 'nabilalarasati',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    quoteArabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    quoteTranslation: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
    quoteSource: 'QS. Ar-Rum: 21',
    quoteFont: 'KFGQPC Uthman Taha Naskh Regular',
  },
  event: {
    weddingDateIso: '2026-12-12T08:00:00+07:00',
    dateDisplay: 'Sabtu, 12 Desember 2026 • Jakarta, Indonesia',
    heroSubtitle: 'The Wedding Celebration',
    heroPhotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    eventsList: [
      {
        id: 'event-1',
        tag: 'Akad Nikah',
        title: 'Akad Nikah',
        date: 'Sabtu, 12 Desember 2026',
        time: 'Pukul 08.00 - 10.00 WIB',
        venue: 'Masjid Agung Al-Ittihad',
        address: 'Jl. Tebet Mas Indah I No.1, Tebet Barat, Jakarta Selatan',
        mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Ittihad+Tebet+Jakarta',
        isActive: true,
      },
      {
        id: 'event-2',
        tag: 'Resepsi',
        title: 'Resepsi Pernikahan',
        date: 'Sabtu, 12 Desember 2026',
        time: 'Pukul 11.00 - 15.00 WIB',
        venue: 'Grand Ballroom Plataran Dharmawangsa',
        address: 'Jl. Dharmawangsa Raya No.6, Kebayoran Baru, Jakarta Selatan',
        mapsUrl: 'https://maps.google.com/?q=Plataran+Dharmawangsa+Jakarta',
        isActive: true,
      },
    ],
    parkingNote: 'Tersedia area parkir yang luas dan layanan valet di lokasi Plataran Dharmawangsa. Mohon mematuhi petunjuk petugas keamanan di gerbang utama demi kenyamanan bersama.',
  },
  videoTeaser: {
    isActive: true,
    title: 'Cinematic Love Teaser',
    description: 'Sebuah cuplikan perjalanan kisah dua insan mengarungi rasa cinta hingga melabuhkan janji suci.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  gallery: [
    {
      id: 'gal-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: 'The Promise of Forever — Momen pembuka cerita cinta kami',
      category: 'Pre-wedding',
      isActive: true,
    },
    {
      id: 'gal-2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      caption: 'Two Hearts, One Journey — Lambang komitmen suci',
      category: 'Details',
      isActive: true,
    },
    {
      id: 'gal-3',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      caption: 'Walking in Autumn Sunset — Di bawah langit senja',
      category: 'Moments',
      isActive: true,
    },
    {
      id: 'gal-4',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      caption: 'Delicate Blooms of Joy — Bunga ketulusan',
      category: 'Aesthetic',
      isActive: true,
    },
    {
      id: 'gal-5',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      caption: 'Hand in Hand — Bersama melangkah ke masa depan',
      category: 'Portrait',
      isActive: true,
    },
    {
      id: 'gal-6',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sacred Harmony — Ruang penuh rasa syukur',
      category: 'Venue',
      isActive: true,
    },
  ],
  protocols: [
    {
      id: 'prot-1',
      title: 'Dress Code Tamu',
      description: 'Disarankan mengenakan busana bernuansa Earth Tone, Sage Green, Champagne, atau Batik Formal.',
      isActive: true,
    },
    {
      id: 'prot-2',
      title: 'Kesehatan & Kebersihan',
      description: 'Mohon berkenan menggunakan masker dan menjaga kesehatan bila sedang kurang enak badan.',
      isActive: true,
    },
    {
      id: 'prot-3',
      title: 'Ketepatan Waktu',
      description: 'Hadir sesuai jadwal sesi demi kelancaran prosesi akad dan kenyamanan jamuan resepsi.',
      isActive: true,
    },
    {
      id: 'prot-4',
      title: 'Doa & Restu Tulus',
      description: 'Senyuman hangat serta doa tulus Anda adalah hadiah paling berharga bagi awal bahtera hidup kami.',
      isActive: true,
    },
  ],
  gifts: {
    bankAccounts: [
      {
        id: 'bank-1',
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '8691458291',
        accountHolder: 'Raden Arya Wijaya',
        isActive: true,
      },
      {
        id: 'bank-2',
        bankName: 'Bank Mandiri',
        accountNumber: '1370019284721',
        accountHolder: 'Nabila Putri Larasati',
        isActive: true,
      },
      {
        id: 'bank-3',
        bankName: 'Bank Syariah Indonesia (BSI)',
        accountNumber: '7192837482',
        accountHolder: 'Raden Arya Wijaya',
        isActive: true,
      },
    ],
    qris: {
      isActive: true,
      title: 'QRIS Pembayaran Digital',
      merchantName: 'Arya & Nabila Wedding',
      nmid: 'ID1020261212891',
      description: 'Mendukung BCA Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, dan seluruh aplikasi perbankan berbasis QRIS.',
      instruction: 'Buka aplikasi m-Banking atau e-Wallet pilihan Anda, lalu scan kode QRIS di atas.',
      qrImageUrl: '',
    },
    physicalAddress: 'Jl. Dharmawangsa X No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160',
    receiverContact: 'dr. Nabila / Arya Wijaya (0812-3456-7890)',
  },
  milestones: [
    {
      year: '2021',
      title: 'Pertemuan Pertama di Kampus',
      description: 'Takdir mempertemukan kami di sebuah simposium riset universitas. Sebuah percakapan sederhana tentang buku dan impian masa depan menjadi benih awal tumbuhnya rasa saling memahami.',
    },
    {
      year: '2023',
      title: 'Menautkan Komitmen & Doa',
      description: 'Setelah melewati berbagai fase suka dan duka bersama, kami menyadari bahwa cinta ini bukan sekadar tentang rasa nyaman, namun komitmen untuk saling mendukung dan bertumbuh dalam kebaikan.',
    },
    {
      year: 'Maret 2026',
      title: 'Momen Sakral Pertunangan',
      description: 'Di hadapan keluarga besar kedua belah pihak, Arya mengutarakan niat tulus untuk meminang Nabila. Dengan izin Allah dan restu kedua orang tua, janji pertunangan resmi terikat.',
    },
    {
      year: 'Desember 2026',
      title: 'Menuju Gerbang Pernikahan',
      description: 'Kini, dengan hati penuh syukur, kami siap melangkah bersama mengarungi mahligai rumah tangga yang sakinah, mawaddah, warahmah selamanya.',
    },
  ],
};

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

export function saveWeddingConfig(config: WeddingConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export function resetWeddingConfig(): WeddingConfig {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return DEFAULT_WEDDING_CONFIG;
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
