import React, { useEffect, useState } from 'react';
import { Calendar, Heart, Clock } from 'lucide-react';
import { calculateCountdown, CountdownResult } from '../utils/wedding';

interface HeroSectionProps {
  weddingDateIso: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ weddingDateIso }) => {
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateCountdown(weddingDateIso)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(weddingDateIso));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDateIso]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 overflow-hidden bg-[#FBF9F5]">
      {/* Background radial gradient & ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F4ECE1] via-[#FBF9F5] to-[#EAF0E8]/40 pointer-events-none" />

      {/* Floating ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C8A97E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Top greeting badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#C8A97E]/30 text-xs tracking-[0.25em] text-[#606F5D] uppercase font-semibold mb-6 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-[#C8A97E] fill-[#C8A97E]" />
          <span>The Wedding Celebration</span>
          <Heart className="w-3.5 h-3.5 text-[#C8A97E] fill-[#C8A97E]" />
        </div>

        {/* Big Couple Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-[#2D332D] tracking-tight mb-2">
          Arya <span className="font-script text-[#C8A97E] text-6xl sm:text-8xl md:text-9xl font-normal block sm:inline">&</span> Nabila
        </h1>

        {/* Date string */}
        <div className="flex items-center gap-2 text-sm sm:text-base text-[#606F5D] font-medium tracking-wide my-4">
          <Calendar className="w-4 h-4 text-[#C8A97E]" />
          <span>Sabtu, 12 Desember 2026 • Jakarta, Indonesia</span>
        </div>

        {/* Couple Hero Photo Frame */}
        <div className="relative my-8 p-3 bg-white rounded-3xl shadow-2xl border border-[#C8A97E]/35 max-w-sm sm:max-w-md w-full group">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
              alt="Arya & Nabila"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <p className="font-script text-3xl text-[#FBF9F5] drop-shadow-md">
                Forever & Always
              </p>
            </div>
          </div>
          <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#C8A97E]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#C8A97E]" />
        </div>

        {/* Countdown Timer Block */}
        <div className="w-full max-w-lg mt-4">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs tracking-widest text-[#7D6B4E] uppercase font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Menghitung Hari Menuju Hari Bahagia</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Hari', value: countdown.days },
              { label: 'Jam', value: countdown.hours },
              { label: 'Menit', value: countdown.minutes },
              { label: 'Detik', value: countdown.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl glass-card bg-white/80 shadow-md border border-[#C8A97E]/30"
              >
                <span className="text-2xl sm:text-4xl font-serif font-bold text-[#3F4E3E]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-[#7A8678] uppercase tracking-wider font-medium mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="mt-12 flex flex-col items-center text-[#8C988A] text-xs">
        <span className="mb-2 tracking-widest uppercase">Scroll ke Bawah</span>
        <div className="w-5 h-8 border-2 border-[#C8A97E]/60 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#C8A97E] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
