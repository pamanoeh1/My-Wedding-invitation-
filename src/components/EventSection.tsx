import React from 'react';
import { Calendar, Clock, MapPin, CalendarPlus } from 'lucide-react';
import { createGoogleCalendarUrl } from '../utils/wedding';

export const EventSection: React.FC = () => {
  const akadEvent = {
    title: 'Akad Nikah Arya & Nabila',
    details: 'Momen sakral pengucapan ijab kabul pernikahan Arya & Nabila.',
    location: 'Masjid Agung Al-Ittihad, Jl. Tebet Mas Indah, Jakarta Selatan',
    start: new Date('2026-12-12T08:00:00+07:00'),
    end: new Date('2026-12-12T10:00:00+07:00'),
  };

  const resepsiEvent = {
    title: 'Resepsi Pernikahan Arya & Nabila',
    details: 'Resepsi perayaan dan jamuan syukuran pernikahan Arya & Nabila.',
    location: 'Grand Ballroom Plataran Dharmawangsa, Jl. Dharmawangsa Raya No.6, Kebayoran Baru, Jakarta Selatan',
    start: new Date('2026-12-12T11:00:00+07:00'),
    end: new Date('2026-12-12T14:30:00+07:00'),
  };

  const akadCalendarUrl = createGoogleCalendarUrl(akadEvent);
  const resepsiCalendarUrl = createGoogleCalendarUrl(resepsiEvent);

  const mapsAkadUrl = 'https://maps.google.com/?q=Masjid+Agung+Al-Ittihad+Tebet+Jakarta';
  const mapsResepsiUrl = 'https://maps.google.com/?q=Plataran+Dharmawangsa+Jakarta';

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FBF9F5] relative" id="events">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Rangkaian Acara
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D332D]">
            Waktu & Tempat Pelaksanaan
          </h2>
          <p className="text-xs sm:text-sm text-[#667265] max-w-lg mx-auto mt-3">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir pada rangkaian acara berikut:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Akad Nikah Card */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl glass-card bg-white/90 shadow-xl border border-[#C8A97E]/40 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="absolute top-0 right-0 px-5 py-2 rounded-bl-2xl bg-[#3F4E3E] text-white text-xs font-semibold tracking-wider">
              Akad Nikah
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] text-[#3F4E3E] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#2D332D] mb-4">
                Akad Nikah
              </h3>

              <div className="space-y-4 text-sm text-[#556054]">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2D332D] block">Hari & Tanggal:</strong>
                    <span>Sabtu, 12 Desember 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2D332D] block">Waktu:</strong>
                    <span>Pukul 08.00 - 10.00 WIB</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2D332D] block">Lokasi:</strong>
                    <span>Masjid Agung Al-Ittihad</span>
                    <p className="text-xs text-[#7A8678] mt-0.5">
                      Jl. Tebet Mas Indah I No.1, Tebet Barat, Jakarta Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row gap-3">
              <a
                href={akadCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Google Calendar</span>
              </a>

              <a
                href={mapsAkadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] transition-all text-xs font-semibold shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>

          {/* Resepsi Pernikahan Card */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl glass-card bg-white/90 shadow-xl border border-[#C8A97E]/40 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="absolute top-0 right-0 px-5 py-2 rounded-bl-2xl bg-[#C8A97E] text-white text-xs font-semibold tracking-wider">
              Resepsi
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5ECE0] text-[#7D6B4E] flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#2D332D] mb-4">
                Resepsi Pernikahan
              </h3>

              <div className="space-y-4 text-sm text-[#556054]">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2D332D] block">Hari & Tanggal:</strong>
                    <span>Sabtu, 12 Desember 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2D332D] block">Waktu:</strong>
                    <span>Pukul 11.00 - 15.00 WIB</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2D332D] block">Lokasi:</strong>
                    <span>Grand Ballroom Plataran Dharmawangsa</span>
                    <p className="text-xs text-[#7A8678] mt-0.5">
                      Jl. Dharmawangsa Raya No.6, Kebayoran Baru, Jakarta Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row gap-3">
              <a
                href={resepsiCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Google Calendar</span>
              </a>

              <a
                href={mapsResepsiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] transition-all text-xs font-semibold shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Venue Preview Map & Direct Notice */}
        <div className="mt-12 p-6 rounded-3xl glass-card bg-white/75 border border-[#C8A97E]/30 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-[#3F4E3E] font-medium mb-2">
            <MapPin className="w-4 h-4 text-[#C8A97E]" />
            <span>Petunjuk Lokasi & Parkir</span>
          </div>
          <p className="text-xs sm:text-sm text-[#667265] max-w-xl mx-auto leading-relaxed">
            Tersedia area parkir yang luas dan layanan valet di lokasi Plataran Dharmawangsa. Mohon mematuhi petunjuk petugas keamanan di gerbang utama demi kenyamanan bersama.
          </p>
        </div>
      </div>
    </section>
  );
};
