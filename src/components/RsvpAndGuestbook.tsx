import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, XCircle, HelpCircle, Users, MessageSquareHeart, HeartHandshake } from 'lucide-react';
import {
  GuestWish,
  validateRsvp,
  DEFAULT_WEDDING_WISHES,
  fetchServerWishes,
  postServerWish,
  formatWishRelativeTime,
} from '../utils/wedding';

interface RsvpAndGuestbookProps {
  guestNameDefault?: string;
  onShowToast: (msg: string) => void;
}

const DEFAULT_WISHES: GuestWish[] = DEFAULT_WEDDING_WISHES;

const STORAGE_KEY = 'wedding_wishes_v1';

export const RsvpAndGuestbook: React.FC<RsvpAndGuestbookProps> = ({
  guestNameDefault = '',
  onShowToast,
}) => {
  const [currentNow, setCurrentNow] = useState(() => Date.now());
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_WISHES;
  });

  // Live timer tick every 10 seconds to update relative timestamps (e.g. "Baru saja" to "5 menit yang lalu")
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNow(Date.now());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const [name, setName] = useState(
    guestNameDefault && guestNameDefault !== 'Tamu Undangan' ? guestNameDefault : ''
  );
  const [relationship, setRelationship] = useState('Sahabat');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch latest persistent wishes from server on mount
  useEffect(() => {
    fetchServerWishes().then((serverWishes) => {
      if (serverWishes && serverWishes.length > 0) {
        setWishes(serverWishes);
      }
    });
  }, []);

  useEffect(() => {
    if (guestNameDefault && guestNameDefault !== 'Tamu Undangan' && !name) {
      setName(guestNameDefault);
    }
  }, [guestNameDefault]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateRsvp({
      name,
      attendance,
      guestsCount,
      message,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    if (!message.trim()) {
      setErrors({ message: 'Mohon tuliskan pesan ucapan atau doa restu Anda.' });
      return;
    }

    setIsSubmitting(true);

    const nowEpoch = Date.now();
    const newWish: GuestWish = {
      id: `wish-${nowEpoch}`,
      name: name.trim(),
      relationship,
      attendance,
      message: message.trim(),
      createdAt: new Date(nowEpoch).toISOString(),
      timestamp: nowEpoch,
    };

    // Save locally immediately
    setWishes((prev) => [newWish, ...prev]);

    // Persist to server
    postServerWish(newWish).then((persisted) => {
      if (persisted) {
        setWishes((prev) => [persisted, ...prev.filter((w) => w.id !== newWish.id)]);
      }
    }).finally(() => {
      setIsSubmitting(false);
      setMessage('');
      onShowToast('Terima kasih! Konfirmasi kehadiran & doa Anda berhasil dikirim.');
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FBF9F5] relative" id="rsvp">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Reservasi & Doa Restu
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D332D]">
            Konfirmasi Kehadiran (RSVP)
          </h2>
          <p className="text-xs sm:text-sm text-[#667265] max-w-lg mx-auto mt-3">
            Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan kado terindah bagi kami. Mohon konfirmasi kehadiran Anda di bawah ini:
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Form RSVP */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-card bg-white/90 shadow-xl border border-[#C8A97E]/40">
            <div className="flex items-center gap-2 mb-6 text-[#3F4E3E]">
              <HeartHandshake className="w-5 h-5 text-[#C8A97E]" />
              <h3 className="text-xl font-serif font-bold text-[#2D332D]">
                Formulir RSVP & Ucapan
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1.5 uppercase tracking-wider">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Dimas Anggara, S.Kom"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-stone-300 focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1.5 uppercase tracking-wider">
                  Hubungan / Kategori
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-stone-300 focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 outline-none transition-all"
                >
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sahabat">Sahabat</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Teman Kuliah">Teman Kuliah / Sekolah</option>
                  <option value="Tetangga">Tetangga / Kerabat</option>
                  <option value="Tamu Lainnya">Tamu Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1.5 uppercase tracking-wider">
                  Konfirmasi Kehadiran *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('hadir')}
                    className={`py-2.5 px-2 text-xs font-semibold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      attendance === 'hadir'
                        ? 'bg-[#3F4E3E] text-white border-[#3F4E3E] shadow-sm'
                        : 'bg-[#FBF9F5] text-[#556054] border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('tidak_hadir')}
                    className={`py-2.5 px-2 text-xs font-semibold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      attendance === 'tidak_hadir'
                        ? 'bg-stone-700 text-white border-stone-700 shadow-sm'
                        : 'bg-[#FBF9F5] text-[#556054] border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Tidak Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('ragu')}
                    className={`py-2.5 px-2 text-xs font-semibold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      attendance === 'ragu'
                        ? 'bg-[#C8A97E] text-white border-[#C8A97E] shadow-sm'
                        : 'bg-[#FBF9F5] text-[#556054] border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Masih Ragu</span>
                  </button>
                </div>
                {errors.attendance && (
                  <p className="text-xs text-rose-500 mt-1">{errors.attendance}</p>
                )}
              </div>

              {attendance === 'hadir' && (
                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1.5 uppercase tracking-wider flex items-center justify-between">
                    <span>Jumlah Tamu yang Hadir (Pax)</span>
                    <Users className="w-3.5 h-3.5 text-[#C8A97E]" />
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-stone-300 focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 outline-none transition-all"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang (Bersama Pasangan)</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang (Keluarga)</option>
                    <option value={5}>5 Orang</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1.5 uppercase tracking-wider">
                  Ucapan & Doa Restu *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat dan doa tulus Anda..."
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-stone-300 focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 outline-none transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] font-semibold text-sm shadow-md transition-all duration-300 border border-[#C8A97E]/40 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#C8A97E]" />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim RSVP & Doa Restu'}</span>
              </button>
            </form>
          </div>

          {/* Live Wishes Feed */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-[#C8A97E]" />
                <h3 className="text-xl font-serif font-bold text-[#2D332D]">
                  Untaian Doa & Ucapan ({wishes.length})
                </h3>
              </div>
              <span className="text-xs text-[#7A8678]">Real-time Feed</span>
            </div>

            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl glass-card bg-white/80 border border-[#C8A97E]/30 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#2D332D]">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#7A8678]">
                        {item.relationship} • {formatWishRelativeTime(item, currentNow)}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase shrink-0 ${
                        item.attendance === 'hadir'
                          ? 'bg-[#EAF0E8] text-[#3F4E3E] border border-[#3F4E3E]/20'
                          : item.attendance === 'tidak_hadir'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.attendance === 'hadir'
                        ? 'Hadir'
                        : item.attendance === 'tidak_hadir'
                        ? 'Tidak Hadir'
                        : 'Ragu'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4E5B4D] leading-relaxed whitespace-pre-line">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
