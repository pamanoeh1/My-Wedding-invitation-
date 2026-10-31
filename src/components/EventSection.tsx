import React from 'react';
import { Calendar, Clock, MapPin, CalendarPlus } from 'lucide-react';
import { WeddingEventItem, createGoogleCalendarUrl } from '../utils/wedding';

interface EventSectionProps {
  events?: WeddingEventItem[];
  parkingNote?: string;
  coupleNames?: string;
}

export const EventSection: React.FC<EventSectionProps> = ({
  events = [],
  parkingNote = 'Tersedia area parkir yang luas dan layanan valet. Mohon mematuhi petunjuk petugas keamanan di gerbang utama.',
  coupleNames = 'Arya & Nabila',
}) => {
  const activeEvents = events.filter((e) => e.isActive);
  if (activeEvents.length === 0) return null;

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

        <div className={`grid gap-8 items-stretch ${activeEvents.length === 1 ? 'max-w-lg mx-auto' : 'md:grid-cols-2'}`}>
          {activeEvents.map((evt, idx) => {
            const calendarUrl = createGoogleCalendarUrl({
              title: `${evt.title} ${coupleNames}`,
              details: `${evt.title} pernikahan ${coupleNames}.`,
              location: `${evt.venue}, ${evt.address}`,
              start: new Date('2026-12-12T08:00:00+07:00'),
              end: new Date('2026-12-12T14:30:00+07:00'),
            });

            return (
              <div
                key={evt.id || idx}
                className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl glass-card bg-white/90 shadow-xl border border-[#C8A97E]/40 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`absolute top-0 right-0 px-5 py-2 rounded-bl-2xl text-white text-xs font-semibold tracking-wider ${
                    idx % 2 === 0 ? 'bg-[#3F4E3E]' : 'bg-[#C8A97E]'
                  }`}
                >
                  {evt.tag || evt.title}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] text-[#3F4E3E] flex items-center justify-center mb-6">
                    <Clock className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#2D332D] mb-4">
                    {evt.title}
                  </h3>

                  <div className="space-y-4 text-sm text-[#556054]">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                      <div>
                        <strong className="text-[#2D332D] block">Hari & Tanggal:</strong>
                        <span>{evt.date}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                      <div>
                        <strong className="text-[#2D332D] block">Waktu:</strong>
                        <span>{evt.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C8A97E] shrink-0 mt-1" />
                      <div>
                        <strong className="text-[#2D332D] block">Lokasi:</strong>
                        <span>{evt.venue}</span>
                        <p className="text-xs text-[#7A8678] mt-0.5">
                          {evt.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row gap-3">
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all text-xs font-semibold shadow-sm"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Google Calendar</span>
                  </a>

                  {evt.mapsUrl && (
                    <a
                      href={evt.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] transition-all text-xs font-semibold shadow-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Buka Google Maps</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {parkingNote && (
          <div className="mt-12 p-6 rounded-3xl glass-card bg-white/75 border border-[#C8A97E]/30 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-[#3F4E3E] font-medium mb-2">
              <MapPin className="w-4 h-4 text-[#C8A97E]" />
              <span>Petunjuk Lokasi & Parkir</span>
            </div>
            <p className="text-xs sm:text-sm text-[#667265] max-w-xl mx-auto leading-relaxed">
              {parkingNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
