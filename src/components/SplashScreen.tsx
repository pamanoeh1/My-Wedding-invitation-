import React from 'react';
import { MailOpen, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  guestName: string;
  onOpen: () => void;
  groomName?: string;
  brideName?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  guestName,
  onOpen,
  groomName = 'Arya',
  brideName = 'Nabila',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FBF9F5] overflow-hidden transition-all duration-700">
      {/* Background soft botanical watermark / gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EAF0E8]/70 via-[#FBF9F5] to-[#F5ECE0]/60 pointer-events-none" />
      
      {/* Decorative luxury corners */}
      <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-[#C8A97E]/40 pointer-events-none hidden sm:block" />
      <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-[#C8A97E]/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-[#C8A97E]/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-[#C8A97E]/40 pointer-events-none hidden sm:block" />

      {/* Main Invitation Envelope Card */}
      <div className="relative z-10 w-full max-w-lg p-8 sm:p-12 text-center rounded-3xl glass-card shadow-2xl border border-[#C8A97E]/40 bg-white/85 transition-transform duration-500 hover:scale-[1.01]">
        <div className="flex items-center justify-center gap-2 mb-4 text-[#889A82]">
          <span className="h-[1px] w-8 bg-[#C8A97E]/60"></span>
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#7D6B4E]">
            Walimatul 'Ursy
          </span>
          <span className="h-[1px] w-8 bg-[#C8A97E]/60"></span>
        </div>

        <p className="text-xs tracking-[0.25em] text-[#606F5D] uppercase font-semibold mb-2">
          The Wedding of
        </p>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2D332D] tracking-wide my-3">
          {groomName} <span className="font-script text-[#C8A97E] text-5xl sm:text-6xl font-normal">&</span> {brideName}
        </h1>

        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent mx-auto my-5" />

        <div className="my-6 p-4 rounded-2xl bg-[#F8F5EE] border border-[#C8A97E]/30 text-center">
          <p className="text-xs text-[#7A8678] tracking-wider uppercase mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-xl sm:text-2xl font-serif font-bold text-[#3F4E3E] capitalize">
            {guestName}
          </p>
          <p className="text-[11px] text-[#8C988A] mt-1 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#556054] leading-relaxed mb-8 max-w-sm mx-auto">
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada hari istimewa pernikahan kami.
        </p>

        <button
          onClick={onOpen}
          aria-label="Buka Undangan Pernikahan"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#3F4E3E] text-[#FBF9F5] shadow-lg hover:bg-[#344033] hover:shadow-xl hover:shadow-[#3F4E3E]/20 transition-all duration-300 border border-[#C8A97E]/40 cursor-pointer active:scale-95"
        >
          <MailOpen className="w-4 h-4 text-[#C8A97E] transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="text-sm font-semibold tracking-wide">
            Buka Undangan
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C8A97E]/80 animate-pulse" />
        </button>
      </div>
    </div>
  );
};
