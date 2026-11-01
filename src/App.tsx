/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  extractGuestName,
  loadWeddingConfig,
  fetchServerWeddingConfig,
  saveWeddingConfig,
  isSecretAdminParam,
  WeddingConfig,
} from './utils/wedding';
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
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Sliders, Lock, ShieldCheck } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(() => loadWeddingConfig());

  // Admin authentication state
  const [adminUsername, setAdminUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wedding_admin_user') || 'admin';
    }
    return 'admin';
  });
  const [adminPassword, setAdminPassword] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wedding_admin_pass') || 'wedding2026';
    }
    return 'wedding2026';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return isSecretAdminParam(window.location.search, window.location.pathname);
    }
    return false;
  });
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');

  const [guestName, setGuestName] = useState(() => {
    if (typeof window !== 'undefined') {
      return extractGuestName(window.location.search, 'Bapak/Ibu/Sahabat Terhormat');
    }
    return 'Tamu Undangan';
  });

  const [isOpen, setIsOpen] = useState(() => {
    // If splashScreen feature is disabled, open automatically
    const initialConfig = loadWeddingConfig();
    return !initialConfig.features.splashScreen;
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch live server configuration on mount
  useEffect(() => {
    fetchServerWeddingConfig().then((serverConfig) => {
      setConfig(serverConfig);
    });

    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.username) setAdminUsername(data.username);
      })
      .catch(() => {});
  }, []);

  // Listen to browser URL and navigation once on mount without re-triggering loops
  useEffect(() => {
    const checkUrlParams = () => {
      if (typeof window === 'undefined') return;
      const search = window.location.search;
      const pathname = window.location.pathname;
      const extracted = extractGuestName(search, 'Bapak/Ibu/Sahabat Terhormat');
      setGuestName((prev) => (prev !== extracted ? extracted : prev));

      const params = new URLSearchParams(search);
      if (params.get('autostart') === '1') {
        setIsOpen(true);
        setIsPlayingAudio(true);
      }

      // Secret admin access link: salam2408&risa1211
      if (isSecretAdminParam(search, pathname)) {
        setIsLoginModalOpen(true);
      }
    };

    checkUrlParams();
    window.addEventListener('popstate', checkUrlParams);
    return () => window.removeEventListener('popstate', checkUrlParams);
  }, []);

  // If splashScreen feature is turned off in config, reveal main invitation automatically
  useEffect(() => {
    if (!config.features.splashScreen) {
      setIsOpen(true);
    }
  }, [config.features.splashScreen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (config.features.audioPlayer) {
      setIsPlayingAudio(true);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenAdminTrigger = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsLoginModalOpen(false);
    setViewMode('admin');
    showToast('Berhasil masuk ke mode editor admin!');
  };

  const handleUpdateCredentials = (newU: string, newP: string) => {
    setAdminUsername(newU);
    setAdminPassword(newP);
    localStorage.setItem('wedding_admin_user', newU);
    localStorage.setItem('wedding_admin_pass', newP);

    fetch('/api/admin/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUsername: newU, newPassword: newP }),
    }).catch(() => {});
  };

  const handleUpdateConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    saveWeddingConfig(newConfig, true);
    showToast('Perubahan berhasil diterapkan ke seluruh kode & server!');
  };

  // If in admin view mode, show Admin Dashboard
  if (viewMode === 'admin') {
    return (
      <>
        <AdminPanel
          config={config}
          onUpdateConfig={handleUpdateConfig}
          onExitAdmin={() => setViewMode('public')}
          onShowToast={showToast}
          currentUsername={adminUsername}
          currentPassword={adminPassword}
          onUpdateCredentials={handleUpdateCredentials}
        />
        <Toast message={toastMessage} />
      </>
    );
  }

  const coupleNames = `${config.couple.groom.name} & ${config.couple.bride.name}`;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2D332D] relative selection:bg-[#C8A97E]/30 selection:text-[#332B1E]">
      {/* Splash Screen / Cover (If feature enabled and not yet opened) */}
      {config.features.splashScreen && !isOpen && (
        <SplashScreen
          guestName={guestName}
          onOpen={handleOpenInvitation}
          groomName={config.couple.groom.name}
          brideName={config.couple.bride.name}
        />
      )}

      {/* Main Content (Shown once opened or if splash screen disabled) */}
      <main className={`transition-opacity duration-700 ${isOpen || !config.features.splashScreen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating Audio Controller */}
        {config.features.audioPlayer && (isOpen || !config.features.splashScreen) && (
          <AudioPlayer
            isPlaying={isPlayingAudio}
            onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
            audioUrl={config.audioUrl}
          />
        )}

        {/* 1. Hero Section with countdown toggle */}
        <HeroSection
          weddingDateIso={config.event.weddingDateIso}
          groomName={config.couple.groom.name}
          brideName={config.couple.bride.name}
          dateDisplay={config.event.dateDisplay}
          heroPhotoUrl={config.event.heroPhotoUrl}
          heroSubtitle={config.event.heroSubtitle}
          showCountdown={config.features.countdown}
        />

        {/* 2. Couple Profiles & Ayat Suci (Respects features.quote and features.couple) */}
        {(config.features.couple || config.features.quote) && (
          <CoupleSection
            couple={config.couple}
            showQuote={config.features.quote}
            showCouple={config.features.couple}
          />
        )}

        {/* 3. Event Details (Akad, Resepsi, & Custom Added Events) */}
        {config.features.events && (
          <EventSection
            events={config.event.eventsList}
            parkingNote={config.event.parkingNote}
            coupleNames={coupleNames}
          />
        )}

        {/* 4. Love Story Timeline */}
        {config.features.story && (
          <LoveStorySection milestones={config.milestones} />
        )}

        {/* 5. Photo Gallery & Cinematic Video Teaser */}
        {(config.features.gallery || config.features.videoTeaser) && (
          <GallerySection
            gallery={config.gallery}
            showVideo={config.features.videoTeaser}
            videoTeaser={config.videoTeaser}
          />
        )}

        {/* 6. RSVP & Live Guestbook Wishes */}
        {config.features.rsvp && (
          <RsvpAndGuestbook
            guestNameDefault={guestName}
            onShowToast={showToast}
          />
        )}

        {/* 7. Digital Gift / Bank Accounts & Physical Gift */}
        {(config.features.digitalGift || config.features.physicalGift) && (
          <DigitalGiftSection
            onShowToast={showToast}
            gifts={config.gifts}
            showDigitalGift={config.features.digitalGift}
            showPhysicalGift={config.features.physicalGift}
          />
        )}

        {/* 8. Protocol & Guest Etiquette */}
        {config.features.protocol && (
          <ProtocolSection protocols={config.protocols} />
        )}

        {/* 9. Footer Section */}
        <FooterSection
          groomName={config.couple.groom.name}
          brideName={config.couple.bride.name}
          groomFather={config.couple.groom.father}
          brideFather={config.couple.bride.father}
          config={config}
          onShowToast={showToast}
          showDownload={config.features.downloadStandalone}
        />
      </main>

      {/* Admin Login Modal (Triggered by salam2408&risa1211 link) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        savedUsername={adminUsername}
        savedPassword={adminPassword}
      />

      {/* Global Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
