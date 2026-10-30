/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { extractGuestName } from './utils/wedding';
import { SplashScreen } from './components/SplashScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { RsvpAndGuestbook } from './components/RsvpAndGuestbook';
import { DigitalGiftSection } from './components/DigitalGiftSection';
import { ProtocolSection } from './components/ProtocolSection';
import { FooterSection } from './components/FooterSection';
import { Toast } from './components/Toast';

export default function App() {
  const [guestName, setGuestName] = useState(() => {
    if (typeof window !== 'undefined') {
      return extractGuestName(window.location.search, 'Bapak/Ibu/Sahabat Terhormat');
    }
    return 'Tamu Undangan';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Target date for wedding celebration
  const WEDDING_DATE_ISO = '2026-12-12T08:00:00+07:00';

  useEffect(() => {
    const search = window.location.search;
    const extracted = extractGuestName(search, 'Bapak/Ibu/Sahabat Terhormat');
    setGuestName(extracted);

    // Support ?autostart=1 to bypass splash screen directly
    const params = new URLSearchParams(search);
    if (params.get('autostart') === '1') {
      setIsOpen(true);
      setIsPlayingAudio(true);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlayingAudio(true);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2D332D] relative selection:bg-[#C8A97E]/30 selection:text-[#332B1E]">
      {/* Splash Screen / Cover */}
      {!isOpen && (
        <SplashScreen
          guestName={guestName}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Main Content (Shown once opened or autostarted) */}
      <main className={`transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating Audio Controller */}
        {isOpen && (
          <AudioPlayer
            isPlaying={isPlayingAudio}
            onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
          />
        )}

        {/* 1. Hero Section with countdown */}
        <HeroSection weddingDateIso={WEDDING_DATE_ISO} />

        {/* 2. Couple Profiles & Ayat Ar-Rum */}
        <CoupleSection />

        {/* 3. Event Details (Akad & Resepsi) + Maps & Calendar */}
        <EventSection />

        {/* 4. Love Story Timeline */}
        <LoveStorySection />

        {/* 5. Photo Gallery & Lightbox */}
        <GallerySection />

        {/* 6. RSVP & Live Guestbook Wishes */}
        <RsvpAndGuestbook
          guestNameDefault={guestName}
          onShowToast={showToast}
        />

        {/* 7. Digital Gift / Amplop & QRIS */}
        <DigitalGiftSection onShowToast={showToast} />

        {/* 8. Protocol & Guest Etiquette */}
        <ProtocolSection />

        {/* 9. Footer & Gratitude */}
        <FooterSection onShowToast={showToast} />
      </main>

      {/* Global Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
