import React, { useState } from 'react';
import {
  WeddingConfig,
  saveWeddingConfig,
  resetWeddingConfig,
  DEFAULT_WEDDING_CONFIG,
  GuestWish,
  WeddingEventItem,
  BankAccountItem,
  GalleryPhotoItem,
  ProtocolItem,
} from '../utils/wedding';
import { MediaInput } from './MediaInput';
import {
  Heart,
  Calendar,
  Gift,
  Clock,
  Users,
  Settings,
  Save,
  RotateCcw,
  ExternalLink,
  LogOut,
  Trash2,
  Copy,
  Check,
  ToggleLeft,
  ToggleRight,
  Plus,
  Image as ImageIcon,
  Film,
  ShieldCheck,
  Link as LinkIcon,
  Music,
  QrCode,
} from 'lucide-react';

interface AdminPanelProps {
  config: WeddingConfig;
  onUpdateConfig: (newConfig: WeddingConfig) => void;
  onExitAdmin: () => void;
  onShowToast: (msg: string) => void;
  currentUsername: string;
  currentPassword: string;
  onUpdateCredentials: (u: string, p: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  config,
  onUpdateConfig,
  onExitAdmin,
  onShowToast,
  currentUsername,
  currentPassword,
  onUpdateCredentials,
}) => {
  const [activeTab, setActiveTab] = useState<
    'features' | 'couple' | 'events' | 'gifts' | 'media' | 'protocols' | 'story' | 'guests' | 'security'
  >('features');

  const [formData, setFormData] = useState<WeddingConfig>(config);

  // Credentials state
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newPassword, setNewPassword] = useState(currentPassword);

  // Guest invitation link generator
  const [generatorGuestName, setGeneratorGuestName] = useState('Bpk. Ir. Suryanto & Keluarga');
  const [copiedLink, setCopiedLink] = useState(false);

  // Live wishes from localStorage
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSave = () => {
    saveWeddingConfig(formData);
    onUpdateConfig(formData);
    onShowToast('Semua pengaturan undangan berhasil disimpan!');
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal?')) {
      const def = resetWeddingConfig();
      setFormData(def);
      onUpdateConfig(def);
      onShowToast('Pengaturan dikembalikan ke setelan default.');
    }
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim().length < 3 || newPassword.trim().length < 4) {
      alert('Username minimal 3 karakter dan password minimal 4 karakter.');
      return;
    }
    onUpdateCredentials(newUsername.trim(), newPassword.trim());
    onShowToast('Username & Password admin berhasil diperbarui!');
  };

  const handleDeleteWish = (id: string) => {
    const updated = wishes.filter((w) => w.id !== id);
    setWishes(updated);
    try {
      localStorage.setItem('wedding_wishes_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
    onShowToast('Ucapan berhasil dihapus.');
  };

  // Toggle single feature
  const handleToggleFeature = (featureKey: keyof WeddingConfig['features']) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureKey]: !prev.features[featureKey],
      },
    }));
  };

  // Event list helpers
  const handleAddEvent = () => {
    const newId = `evt_${Date.now()}`;
    const newEvent: WeddingEventItem = {
      id: newId,
      tag: 'Acara Khusus',
      title: 'Acara Tambahan',
      date: 'Sabtu, 12 Desember 2026',
      time: '19:00 - 21:00 WIB',
      venue: 'Grand Ballroom',
      address: 'Jl. Jenderal Sudirman No. 1, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
      isActive: true,
    };
    setFormData((prev) => ({
      ...prev,
      event: {
        ...prev.event,
        eventsList: [...prev.event.eventsList, newEvent],
      },
    }));
  };

  const handleUpdateEvent = (id: string, updates: Partial<WeddingEventItem>) => {
    setFormData((prev) => ({
      ...prev,
      event: {
        ...prev.event,
        eventsList: prev.event.eventsList.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    }));
  };

  const handleDeleteEvent = (id: string) => {
    if (formData.event.eventsList.length <= 1) {
      alert('Minimal harus ada satu acara.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      event: {
        ...prev.event,
        eventsList: prev.event.eventsList.filter((item) => item.id !== id),
      },
    }));
  };

  // Bank account helpers
  const handleAddBankAccount = () => {
    const newId = `bank_${Date.now()}`;
    const newBank: BankAccountItem = {
      id: newId,
      bankName: 'Bank Lain / E-Wallet',
      accountNumber: '1234567890',
      accountHolder: formData.couple.groom.name || 'Pengantin',
      isActive: true,
    };
    setFormData((prev) => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        bankAccounts: [...prev.gifts.bankAccounts, newBank],
      },
    }));
  };

  const handleUpdateBankAccount = (id: string, updates: Partial<BankAccountItem>) => {
    setFormData((prev) => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        bankAccounts: prev.gifts.bankAccounts.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    }));
  };

  const handleDeleteBankAccount = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        bankAccounts: prev.gifts.bankAccounts.filter((item) => item.id !== id),
      },
    }));
  };

  // Gallery helpers
  const handleAddGalleryPhoto = () => {
    const newPhoto: GalleryPhotoItem = {
      id: `photo_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Momen Indah Bersama',
      category: 'Pre-wedding',
      isActive: true,
    };
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newPhoto],
    }));
  };

  const handleUpdateGalleryPhoto = (id: string, updates: Partial<GalleryPhotoItem>) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }));
  };

  const handleDeleteGalleryPhoto = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item.id !== id),
    }));
  };

  // Protocol helpers
  const handleAddProtocol = () => {
    const newP: ProtocolItem = {
      id: `proto_${Date.now()}`,
      title: 'Catatan Kehadiran',
      description: 'Mohon hadir tepat waktu dan mematuhi etiket acara.',
      isActive: true,
    };
    setFormData((prev) => ({
      ...prev,
      protocols: [...prev.protocols, newP],
    }));
  };

  const handleUpdateProtocol = (id: string, updates: Partial<ProtocolItem>) => {
    setFormData((prev) => ({
      ...prev,
      protocols: prev.protocols.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }));
  };

  const handleDeleteProtocol = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      protocols: prev.protocols.filter((item) => item.id !== id),
    }));
  };

  // Generate guest URL
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const generatedInvitationUrl = `${baseUrl}?to=${encodeURIComponent(generatorGuestName.trim())}`;

  const copyInvitationLink = () => {
    navigator.clipboard.writeText(generatedInvitationUrl);
    setCopiedLink(true);
    onShowToast('Link undangan khusus tamu berhasil disalin!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2D332D] pb-16">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#C8A97E]/30 shadow-sm px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3F4E3E] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
            E
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-[#2D332D]">
              Panel Editor Undangan Pernikahan
            </h1>
            <p className="text-[11px] text-[#7A8678]">
              Login: <strong className="text-[#3F4E3E]">{currentUsername}</strong> &bull; Link akses: <code className="text-[#7D6B4E]">salam2408&risa1211</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all text-xs font-semibold shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Undangan</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] transition-all text-xs font-semibold shadow-md border border-[#C8A97E]/40 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Simpan Perubahan</span>
          </button>

          <button
            onClick={onExitAdmin}
            aria-label="Keluar dari Panel Admin"
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 border-b border-stone-300">
          {[
            { id: 'features', label: 'Penonaktifan Fitur', icon: <ToggleLeft className="w-4 h-4" /> },
            { id: 'couple', label: 'Info Mempelai & Font', icon: <Heart className="w-4 h-4" /> },
            { id: 'events', label: 'Rangkaian Acara & Hero', icon: <Calendar className="w-4 h-4" /> },
            { id: 'gifts', label: 'Rekening Bank & Kado', icon: <Gift className="w-4 h-4" /> },
            { id: 'media', label: 'Galeri & Video Teaser', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'protocols', label: 'Etiket & Catatan Tamu', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'story', label: 'Kisah Cinta', icon: <Clock className="w-4 h-4" /> },
            { id: 'guests', label: 'RSVP & Buat Link Tamu', icon: <Users className="w-4 h-4" /> },
            { id: 'security', label: 'Username & Password', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#3F4E3E] text-white shadow-md'
                  : 'bg-white/80 text-[#556054] hover:bg-white border border-stone-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: PENONAKTIFAN FITUR (Toggle on/off every feature)        */}
        {/* ============================================================== */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Pengaturan Status Aktif / Nonaktif Fitur
                  </h3>
                  <p className="text-xs text-[#7A8678]">
                    Pilih fitur mana saja yang ingin ditampilkan atau disembunyikan pada website undangan pernikahan Anda.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    key: 'splashScreen' as const,
                    title: 'Cover / Splash Screen',
                    desc: 'Tampilan awal "Buka Undangan" dan amplop',
                  },
                  {
                    key: 'audioPlayer' as const,
                    title: 'Floating Audio Player',
                    desc: 'Pemutar musik otomatis saat undangan dibuka',
                  },
                  {
                    key: 'countdown' as const,
                    title: 'Hitung Mundur (Countdown)',
                    desc: 'Timer hitung mundur Hari, Jam, Menit, Detik',
                  },
                  {
                    key: 'quote' as const,
                    title: 'Kutipan Ayat Suci / Kata Mutiara',
                    desc: 'Kaligrafi Al-Quran & terjemahan di profil',
                  },
                  {
                    key: 'couple' as const,
                    title: 'Profil Mempelai (Pria & Wanita)',
                    desc: 'Foto, nama lengkap, orang tua, & Instagram',
                  },
                  {
                    key: 'events' as const,
                    title: 'Rangkaian Acara (Waktu & Tempat)',
                    desc: 'Kartu acara, Google Maps & Simpan ke Kalender',
                  },
                  {
                    key: 'story' as const,
                    title: 'Kisah Cinta (Love Story)',
                    desc: 'Timeline momen perjalanan cinta kedua mempelai',
                  },
                  {
                    key: 'gallery' as const,
                    title: 'Galeri Foto Memori',
                    desc: 'Koleksi foto pre-wedding dengan pop-up Lightbox',
                  },
                  {
                    key: 'videoTeaser' as const,
                    title: 'Cinematic Love Teaser',
                    desc: 'Pemutar video teaser cinta dan momen romantis',
                  },
                  {
                    key: 'rsvp' as const,
                    title: 'RSVP & Ucapan Tamu (Live Feed)',
                    desc: 'Formulir kehadiran dan pesan doa restu tamu',
                  },
                  {
                    key: 'digitalGift' as const,
                    title: 'Amplop Digital & Rekening Bank',
                    desc: 'Salin nomor rekening dan QRIS digital gift',
                  },
                  {
                    key: 'physicalGift' as const,
                    title: 'Alamat Kirim Kado Fisik',
                    desc: 'Alamat pengiriman hadiah dan kontak penerima',
                  },
                  {
                    key: 'protocol' as const,
                    title: 'Etiket & Catatan Tamu (Panduan)',
                    desc: 'Informasi dress code, kehadiran, dan doa',
                  },
                  {
                    key: 'downloadStandalone' as const,
                    title: 'Tombol Unduh Berkas Standalone',
                    desc: 'Tombol download berkas HTML mandiri di footer',
                  },
                ].map((item) => {
                  const isChecked = formData.features[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleFeature(item.key)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#FBF9F5] border-[#3F4E3E]/40 shadow-sm'
                          : 'bg-stone-50 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              isChecked ? 'bg-emerald-500' : 'bg-stone-300'
                            }`}
                          />
                          <h4 className="text-xs font-bold text-[#2D332D]">{item.title}</h4>
                        </div>
                        <p className="text-[11px] text-[#7A8678] leading-tight">{item.desc}</p>
                      </div>

                      <div className="shrink-0 text-xl">
                        {isChecked ? (
                          <ToggleRight className="w-6 h-6 text-[#3F4E3E]" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-stone-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: INFO MEMPELAI & FONT AYAT                               */}
        {/* ============================================================== */}
        {activeTab === 'couple' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Groom Details */}
              <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
                <div className="flex items-center gap-2 text-[#3F4E3E] pb-2 border-b border-stone-200">
                  <Heart className="w-4 h-4 text-[#C8A97E]" />
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">Mempelai Pria</h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={formData.couple.groom.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          groom: { ...formData.couple.groom, name: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    value={formData.couple.groom.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          groom: { ...formData.couple.groom, fullName: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={formData.couple.groom.father}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          groom: { ...formData.couple.groom, father: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={formData.couple.groom.mother}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          groom: { ...formData.couple.groom, mother: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Akun Instagram (tanpa @)</label>
                  <input
                    type="text"
                    value={formData.couple.groom.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          groom: { ...formData.couple.groom, instagram: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <MediaInput
                  label="Foto Profil Pria (Upload Lokal / URL)"
                  value={formData.couple.groom.photoUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      couple: {
                        ...formData.couple,
                        groom: { ...formData.couple.groom, photoUrl: val },
                      },
                    })
                  }
                  helperText="Dapat mengunggah langsung dari berkas foto di komputer atau perangkat Anda."
                />
              </div>

              {/* Bride Details */}
              <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
                <div className="flex items-center gap-2 text-[#3F4E3E] pb-2 border-b border-stone-200">
                  <Heart className="w-4 h-4 text-[#C8A97E]" />
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">Mempelai Wanita</h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={formData.couple.bride.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          bride: { ...formData.couple.bride, name: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    value={formData.couple.bride.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          bride: { ...formData.couple.bride, fullName: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={formData.couple.bride.father}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          bride: { ...formData.couple.bride, father: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={formData.couple.bride.mother}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          bride: { ...formData.couple.bride, mother: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Akun Instagram (tanpa @)</label>
                  <input
                    type="text"
                    value={formData.couple.bride.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        couple: {
                          ...formData.couple,
                          bride: { ...formData.couple.bride, instagram: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <MediaInput
                  label="Foto Profil Wanita (Upload Lokal / URL)"
                  value={formData.couple.bride.photoUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      couple: {
                        ...formData.couple,
                        bride: { ...formData.couple.bride, photoUrl: val },
                      },
                    })
                  }
                  helperText="Dapat mengunggah langsung dari berkas foto di komputer atau perangkat Anda."
                />
              </div>
            </div>

            {/* Holy Verse Quote with Font Selector */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                  Kutipan Ayat Suci / Kata Mutiara
                </h3>
                <span className="text-xs text-[#7A8678]">Dukungan Font Mushaf Al-Quran</span>
              </div>

              {/* FONT SELECTOR: KFGQPC Uthman Taha Naskh Regular & kfgqpc-uthmanic-script-hafs-regular */}
              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1.5">
                  Pilihan Font Kaligrafi Ayat Suci
                </label>
                <select
                  value={formData.couple.quoteFont || 'KFGQPC Uthman Taha Naskh Regular'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      couple: { ...formData.couple, quoteFont: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E] font-medium"
                >
                  <option value="KFGQPC Uthman Taha Naskh Regular">
                    KFGQPC Uthman Taha Naskh Regular (Mushaf Madinah Standar)
                  </option>
                  <option value="kfgqpc-uthmanic-script-hafs-regular">
                    kfgqpc-uthmanic-script-hafs-regular (Uthmanic Script Hafs)
                  </option>
                  <option value="Amiri Quran">Amiri Quran (Klasik Naskh Kairo)</option>
                  <option value="Scheherazade New">Scheherazade New (Arabic Script)</option>
                  <option value="Traditional Arabic">Traditional Arabic</option>
                </select>
                <p className="text-[11px] text-stone-500 mt-1">
                  Font terpilih saat ini: <strong className="text-[#3F4E3E]">{formData.couple.quoteFont || 'KFGQPC Uthman Taha Naskh Regular'}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">
                  Teks Kaligrafi / Arab
                </label>
                <textarea
                  rows={3}
                  value={formData.couple.quoteArabic}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      couple: { ...formData.couple, quoteArabic: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-base rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  style={{
                    direction: 'rtl',
                    fontFamily: `"${formData.couple.quoteFont || 'KFGQPC Uthman Taha Naskh Regular'}", 'Amiri Quran', serif`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">Terjemahan / Makna</label>
                <textarea
                  rows={2}
                  value={formData.couple.quoteTranslation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      couple: { ...formData.couple, quoteTranslation: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">Sumber Ayat (misal: QS. Ar-Rum: 21)</label>
                <input
                  type="text"
                  value={formData.couple.quoteSource}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      couple: { ...formData.couple, quoteSource: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: RANGKAIAN ACARA (DINAMIS) & HERO                       */}
        {/* ============================================================== */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Hero & Audio Player Media Settings */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                Pengaturan Hero, Musik Latar & Countdown
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Target Tanggal ISO (Hitung Mundur)
                  </label>
                  <input
                    type="text"
                    value={formData.event.weddingDateIso}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        event: { ...formData.event, weddingDateIso: e.target.value },
                      })
                    }
                    placeholder="2026-12-12T08:00:00+07:00"
                    className="w-full px-3.5 py-2 text-sm font-mono rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">Format: YYYY-MM-DDTHH:mm:ss+07:00</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Teks Tanggal Utama (Hero)
                  </label>
                  <input
                    type="text"
                    value={formData.event.dateDisplay}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        event: { ...formData.event, dateDisplay: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>
              </div>

              {/* Hero Image Local Upload */}
              <MediaInput
                label="Foto Sampul Hero (Upload File Lokal / URL)"
                value={formData.event.heroPhotoUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    event: { ...formData.event, heroPhotoUrl: val },
                  })
                }
                helperText="Dapat mengunggah langsung dari file foto Anda."
              />

              {/* Background Music Local Upload */}
              <MediaInput
                label="Audio Musik Latar Undangan (Upload MP3 Lokal / URL)"
                type="audio"
                value={formData.audioUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    audioUrl: val,
                  })
                }
                helperText="Unggah file lagu/instrumen MP3 dari perangkat Anda untuk diputar saat undangan dibuka."
              />
            </div>

            {/* DYNAMIC EVENTS LIST (Tambah, Edit, Hapus, Aktif/Nonaktif) */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Rangkaian Acara Pernikahan ({formData.event.eventsList.length})
                  </h3>
                  <p className="text-xs text-[#7A8678]">
                    Kelola, tambah, edit, atau nonaktifkan setiap rangkaian acara (Akad, Resepsi, Siraman, Unduh Mantu, dll).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] text-xs font-semibold shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C8A97E]" />
                  <span>Tambah Acara Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.event.eventsList.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      evt.isActive
                        ? 'bg-[#FBF9F5] border-[#C8A97E]/40'
                        : 'bg-stone-50 border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#3F4E3E] text-white text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={evt.title}
                          onChange={(e) => handleUpdateEvent(evt.id, { title: e.target.value })}
                          className="font-serif font-bold text-base text-[#2D332D] bg-transparent border-b border-stone-300 focus:border-[#C8A97E] outline-none"
                          placeholder="Judul Acara (e.g. Akad Nikah)"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateEvent(evt.id, { isActive: !evt.isActive })}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                            evt.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {evt.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Acara Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                          Label Tag (e.g. Akad / Resepsi / Adat)
                        </label>
                        <input
                          type="text"
                          value={evt.tag}
                          onChange={(e) => handleUpdateEvent(evt.id, { tag: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                          Tanggal Acara
                        </label>
                        <input
                          type="text"
                          value={evt.date}
                          onChange={(e) => handleUpdateEvent(evt.id, { date: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                          Waktu Pelaksanaan
                        </label>
                        <input
                          type="text"
                          value={evt.time}
                          onChange={(e) => handleUpdateEvent(evt.id, { time: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                          Nama Tempat / Venue
                        </label>
                        <input
                          type="text"
                          value={evt.venue}
                          onChange={(e) => handleUpdateEvent(evt.id, { venue: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                          Alamat Lengkap
                        </label>
                        <input
                          type="text"
                          value={evt.address}
                          onChange={(e) => handleUpdateEvent(evt.id, { address: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                          Tautan Google Maps
                        </label>
                        <input
                          type="text"
                          value={evt.mapsUrl}
                          onChange={(e) => handleUpdateEvent(evt.id, { mapsUrl: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: REKENING BANK & KADO (DINAMIS)                           */}
        {/* ============================================================== */}
        {activeTab === 'gifts' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Nomor Rekening Bank & E-Wallet ({formData.gifts.bankAccounts.length})
                  </h3>
                  <p className="text-xs text-[#7A8678]">
                    Dapat mengedit nama bank, menambah rekening/e-wallet baru, atau menghapus rekening yang tidak dipakai.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddBankAccount}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] text-xs font-semibold shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C8A97E]" />
                  <span>Tambah Rekening / E-Wallet</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.gifts.bankAccounts.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      item.isActive
                        ? 'bg-[#FBF9F5] border-[#C8A97E]/40'
                        : 'bg-stone-50 border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-[#7D6B4E]">
                        Akun #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateBankAccount(item.id, { isActive: !item.isActive })
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold cursor-pointer ${
                            item.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {item.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBankAccount(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Rekening Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                        Nama Bank / E-Wallet (Bebas diisi)
                      </label>
                      <input
                        type="text"
                        value={item.bankName}
                        onChange={(e) =>
                          handleUpdateBankAccount(item.id, { bankName: e.target.value })
                        }
                        placeholder="Contoh: Bank BCA / GoPay / Mandiri"
                        className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-stone-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                        Nomor Rekening / No. HP E-Wallet
                      </label>
                      <input
                        type="text"
                        value={item.accountNumber}
                        onChange={(e) =>
                          handleUpdateBankAccount(item.id, { accountNumber: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-stone-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                        Atas Nama (Pemilik Rekening)
                      </label>
                      <input
                        type="text"
                        value={item.accountHolder}
                        onChange={(e) =>
                          handleUpdateBankAccount(item.id, { accountHolder: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDIT QRIS PEMBAYARAN DIGITAL */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#7D6B4E] flex items-center justify-center border border-[#C8A97E]/30">
                    <QrCode className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                      Edit QRIS Pembayaran Digital
                    </h3>
                    <p className="text-xs text-[#7A8678]">
                      Sesuaikan nama merchant, kode NMID, petunjuk, dan unggah barcode/gambar QRIS resmi.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const cur = formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris;
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: {
                            ...cur,
                            isActive: !cur.isActive,
                          },
                        },
                      });
                    }}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-semibold cursor-pointer transition ${
                      (formData.gifts?.qris?.isActive ?? true)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-200 text-stone-600 border border-stone-300'
                    }`}
                  >
                    {(formData.gifts?.qris?.isActive ?? true) ? 'QRIS Aktif' : 'QRIS Dinonaktifkan'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: { ...DEFAULT_WEDDING_CONFIG.gifts.qris },
                        },
                      });
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                    title="Kembalikan QRIS ke Pengaturan Bawaan"
                  >
                    Reset Bawaan
                  </button>
                </div>
              </div>

              {/* QRIS Input Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Judul Fitur QRIS
                  </label>
                  <input
                    type="text"
                    value={formData.gifts?.qris?.title ?? 'QRIS Pembayaran Digital'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: {
                            ...(formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris),
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Contoh: QRIS Pembayaran Digital"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Atas Nama / Nama Merchant
                  </label>
                  <input
                    type="text"
                    value={formData.gifts?.qris?.merchantName ?? 'Arya & Nabila Wedding'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: {
                            ...(formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris),
                            merchantName: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Contoh: Arya & Nabila Wedding"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Kode NMID / Merchant ID
                  </label>
                  <input
                    type="text"
                    value={formData.gifts?.qris?.nmid ?? 'ID1020261212891'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: {
                            ...(formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris),
                            nmid: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Contoh: ID1020261212891"
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Deskripsi / Daftar Aplikasi Didukung
                  </label>
                  <textarea
                    rows={2}
                    value={
                      formData.gifts?.qris?.description ??
                      'Mendukung BCA Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, dan seluruh aplikasi perbankan berbasis QRIS.'
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: {
                            ...(formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris),
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Tuliskan keterangan e-wallet dan perbankan yang didukung"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">
                    Petunjuk Scan QRIS Bagi Tamu
                  </label>
                  <textarea
                    rows={2}
                    value={
                      formData.gifts?.qris?.instruction ??
                      'Buka aplikasi m-Banking atau e-Wallet pilihan Anda, lalu scan kode QRIS di atas.'
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gifts: {
                          ...formData.gifts,
                          qris: {
                            ...(formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris),
                            instruction: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Petunjuk singkat proses transfer"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  />
                </div>
              </div>

              {/* Media Upload for QR Code Image */}
              <MediaInput
                label="Unggah Gambar / Foto Barcode QRIS Resmi (Upload File Lokal / URL)"
                value={formData.gifts?.qris?.qrImageUrl || ''}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    gifts: {
                      ...formData.gifts,
                      qris: {
                        ...(formData.gifts?.qris || DEFAULT_WEDDING_CONFIG.gifts.qris),
                        qrImageUrl: val,
                      },
                    },
                  })
                }
                helperText="Unggah tangkapan layar (screenshot) kode QRIS resmi rekening Anda (BCA, Mandiri, BRI, BSI, GoPay, OVO, Dana, dll). Jika dikosongkan, sistem akan menampilkan QR Code ilustratif."
              />

              {/* QRIS Live Preview Box */}
              <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#C8A97E]/30 flex flex-col sm:flex-row items-center gap-4">
                <div className="shrink-0 p-3 bg-white rounded-xl border border-stone-200 shadow-sm text-center">
                  {formData.gifts?.qris?.qrImageUrl ? (
                    <img
                      src={formData.gifts.qris.qrImageUrl}
                      alt="Preview QRIS"
                      className="w-28 h-28 object-contain rounded-lg mx-auto"
                    />
                  ) : (
                    <div className="w-28 h-28 flex flex-col items-center justify-center bg-stone-100 rounded-lg text-stone-400">
                      <QrCode className="w-12 h-12 text-[#C8A97E] mb-1" />
                      <span className="text-[10px] text-stone-500 font-medium">QRIS Ilustratif</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-xs font-bold text-[#2D332D]">
                      {formData.gifts?.qris?.title || 'QRIS Pembayaran Digital'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EAF0E8] text-[#3F4E3E] font-semibold">
                      NMID: {formData.gifts?.qris?.nmid || 'ID1020261212891'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#7D6B4E]">
                    Atas Nama: {formData.gifts?.qris?.merchantName || 'Arya & Nabila Wedding'}
                  </p>
                  <p className="text-[11px] text-[#667265] line-clamp-2">
                    {formData.gifts?.qris?.description ||
                      'Mendukung BCA Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, dan seluruh aplikasi perbankan berbasis QRIS.'}
                  </p>
                  <p className="text-[10px] text-[#7A8678] italic">
                    Status: {(formData.gifts?.qris?.isActive ?? true) ? '✅ Tampil di Halaman Undangan' : '❌ Disembunyikan'}
                  </p>
                </div>
              </div>
            </div>

            {/* Physical Gift Address */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                Alamat Pengiriman Kado Fisik
              </h3>
              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">
                  Alamat Lengkap Penerima
                </label>
                <textarea
                  rows={2}
                  value={formData.gifts.physicalAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gifts: { ...formData.gifts, physicalAddress: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">
                  Kontak Penerima
                </label>
                <input
                  type="text"
                  value={formData.gifts.receiverContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gifts: { ...formData.gifts, receiverContact: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: GALERI & VIDEO TEASER                                   */}
        {/* ============================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            {/* Cinematic Video Teaser */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#C8A97E]" />
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Cinematic Love Teaser (Video)
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      videoTeaser: {
                        ...formData.videoTeaser,
                        isActive: !formData.videoTeaser.isActive,
                      },
                    })
                  }
                  className={`text-xs px-3 py-1 rounded-full font-semibold cursor-pointer ${
                    formData.videoTeaser.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {formData.videoTeaser.isActive ? 'Video Aktif' : 'Video Dinonaktifkan'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Judul Video</label>
                  <input
                    type="text"
                    value={formData.videoTeaser.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        videoTeaser: { ...formData.videoTeaser, title: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#556054] mb-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={formData.videoTeaser.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        videoTeaser: { ...formData.videoTeaser, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">
                  URL Video (MP4 / WebM / Direct Stream)
                </label>
                <input
                  type="text"
                  value={formData.videoTeaser.videoUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      videoTeaser: { ...formData.videoTeaser, videoUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none"
                />
              </div>

              <MediaInput
                label="Poster / Gambar Thumbnail Video (Upload Lokal / URL)"
                value={formData.videoTeaser.posterUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    videoTeaser: { ...formData.videoTeaser, posterUrl: val },
                  })
                }
                helperText="Gambar yang ditampilkan sebelum video diputar."
              />
            </div>

            {/* DYNAMIC PHOTO GALLERY */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Galeri Foto Memori ({formData.gallery.length})
                  </h3>
                  <p className="text-xs text-[#7A8678]">
                    Tambah foto pre-wedding, edit caption, unggah dari berkas lokal, atau nonaktifkan foto tertentu.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddGalleryPhoto}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] text-xs font-semibold shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C8A97E]" />
                  <span>Tambah Foto Baru</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.gallery.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      photo.isActive
                        ? 'bg-[#FBF9F5] border-[#C8A97E]/40'
                        : 'bg-stone-50 border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-[#7D6B4E]">
                        Foto #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateGalleryPhoto(photo.id, { isActive: !photo.isActive })
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold cursor-pointer ${
                            photo.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {photo.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryPhoto(photo.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <MediaInput
                      label="Berkas Foto (Upload Lokal / URL)"
                      value={photo.url}
                      onChange={(val) => handleUpdateGalleryPhoto(photo.id, { url: val })}
                    />

                    <div>
                      <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                        Keterangan (Caption)
                      </label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) =>
                          handleUpdateGalleryPhoto(photo.id, { caption: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                        Kategori (e.g. Pre-wedding / Lamaran)
                      </label>
                      <input
                        type="text"
                        value={photo.category}
                        onChange={(e) =>
                          handleUpdateGalleryPhoto(photo.id, { category: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: PANDUAN & INFORMASI - ETIKET & CATATAN TAMU             */}
        {/* ============================================================== */}
        {activeTab === 'protocols' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Panduan & Informasi - Etiket & Catatan Tamu ({formData.protocols.length})
                  </h3>
                  <p className="text-xs text-[#7A8678]">
                    Kelola etiket tamu, dress code, imbauan ketepatan waktu, dan catatan penting lainnya.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddProtocol}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] text-xs font-semibold shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#C8A97E]" />
                  <span>Tambah Catatan Panduan</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.protocols.map((proto, idx) => (
                  <div
                    key={proto.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      proto.isActive
                        ? 'bg-[#FBF9F5] border-[#C8A97E]/40'
                        : 'bg-stone-50 border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#3F4E3E] text-white text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={proto.title}
                          onChange={(e) => handleUpdateProtocol(proto.id, { title: e.target.value })}
                          className="font-bold text-sm text-[#2D332D] bg-transparent border-b border-stone-300 focus:border-[#C8A97E] outline-none"
                          placeholder="Judul Panduan (e.g. Busana Tamu)"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateProtocol(proto.id, { isActive: !proto.isActive })
                          }
                          className={`text-[10px] px-2.5 py-1 rounded-full font-semibold cursor-pointer ${
                            proto.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {proto.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProtocol(proto.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Panduan Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#556054] mb-1">
                        Deskripsi / Petunjuk untuk Tamu
                      </label>
                      <textarea
                        rows={2}
                        value={proto.description}
                        onChange={(e) =>
                          handleUpdateProtocol(proto.id, { description: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: KISAH CINTA                                             */}
        {/* ============================================================== */}
        {activeTab === 'story' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30">
              <h3 className="font-serif font-bold text-lg text-[#2D332D] mb-4">
                Milestone Perjalanan Cinta
              </h3>
              <div className="space-y-6">
                {formData.milestones.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F5EE] border border-stone-200 space-y-3">
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#556054] mb-1">Tahun / Periode</label>
                        <input
                          type="text"
                          value={m.year}
                          onChange={(e) => {
                            const newM = [...formData.milestones];
                            newM[idx].year = e.target.value;
                            setFormData({ ...formData, milestones: newM });
                          }}
                          className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#556054] mb-1">Judul Cerita</label>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => {
                            const newM = [...formData.milestones];
                            newM[idx].title = e.target.value;
                            setFormData({ ...formData, milestones: newM });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#556054] mb-1">Uraian Kisah</label>
                      <textarea
                        rows={2}
                        value={m.description}
                        onChange={(e) => {
                          const newM = [...formData.milestones];
                          newM[idx].description = e.target.value;
                          setFormData({ ...formData, milestones: newM });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: RSVP & GENERATOR LINK TAMU                              */}
        {/* ============================================================== */}
        {activeTab === 'guests' && (
          <div className="space-y-6">
            {/* Guest Invitation Link Generator */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex items-center gap-2 text-[#3F4E3E]">
                <LinkIcon className="w-5 h-5 text-[#C8A97E]" />
                <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                  Generator Link Undangan Khusus Tamu
                </h3>
              </div>
              <p className="text-xs text-[#556054]">
                Ketik nama tamu di bawah ini untuk menghasilkan link khusus yang menampilkan nama tamu di cover pembuka secara otomatis:
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={generatorGuestName}
                  onChange={(e) => setGeneratorGuestName(e.target.value)}
                  placeholder="Contoh: dr. Amanda & Rekan"
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                />
                <button
                  onClick={copyInvitationLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] text-xs font-semibold shadow-sm cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#C8A97E]" />}
                  <span>{copiedLink ? 'Tersalin!' : 'Salin Link Undangan'}</span>
                </button>
              </div>

              <div className="p-3 bg-[#F8F5EE] rounded-xl border border-stone-200 text-xs font-mono break-all text-stone-600">
                {generatedInvitationUrl}
              </div>
            </div>

            {/* Live RSVP Feed & Moderation */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                    Daftar Konfirmasi Kehadiran & Ucapan ({wishes.length})
                  </h3>
                  <p className="text-xs text-[#7A8678]">Data tersimpan secara aman di peramban ini</p>
                </div>
              </div>

              {wishes.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-400">
                  Belum ada ucapan yang masuk.
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div
                      key={w.id}
                      className="p-4 rounded-2xl bg-[#FBF9F5] border border-stone-200 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-xs text-[#2D332D]">{w.name}</strong>
                          <span className="text-[10px] text-stone-400">&bull; {w.relationship}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ${
                              w.attendance === 'hadir'
                                ? 'bg-emerald-100 text-emerald-800'
                                : w.attendance === 'tidak_hadir'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {w.attendance}
                          </span>
                        </div>
                        <p className="text-xs text-[#556054] leading-relaxed">{w.message}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteWish(w.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer shrink-0"
                        title="Hapus Ucapan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 9: USERNAME & PASSWORD ADMIN                               */}
        {/* ============================================================== */}
        {activeTab === 'security' && (
          <div className="max-w-xl mx-auto space-y-6">
            <form onSubmit={handleSaveCredentials} className="p-6 rounded-3xl bg-white shadow-md border border-[#C8A97E]/30 space-y-5">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                  Keamanan & Kredensial Admin
                </h3>
                <p className="text-xs text-[#7A8678] mt-1">
                  Ubah username dan password untuk melindungi halaman editor undangan pernikahan ini.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">
                  Username Baru
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#556054] mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E]"
                  required
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
                Kredensial bawaan: Username <code className="font-bold">admin</code>, Password <code className="font-bold">wedding2026</code>.
                Link rahasia untuk membuka halaman edit: <code className="font-bold">salam2408&risa1211</code>.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] text-xs font-semibold shadow-md transition cursor-pointer"
              >
                Perbarui Kredensial Admin
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
