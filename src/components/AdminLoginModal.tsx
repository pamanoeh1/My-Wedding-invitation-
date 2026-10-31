import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, X, Sparkles } from 'lucide-react';
import { validateAdminLogin } from '../utils/wedding';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  savedUsername?: string;
  savedPassword?: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  savedUsername = 'admin',
  savedPassword = 'wedding2026',
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('wedding2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = validateAdminLogin(username, password, savedUsername, savedPassword);
    if (isValid) {
      onLoginSuccess();
    } else {
      setError('Username atau password salah. Silakan coba kembali.');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C8A97E]/40 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Login Modal"
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Heading */}
        <div className="w-14 h-14 rounded-full bg-[#EAF0E8] text-[#3F4E3E] flex items-center justify-center mx-auto mb-4 shadow-inner border border-[#C8A97E]/30">
          <ShieldCheck className="w-7 h-7 text-[#3F4E3E]" />
        </div>

        <h3 className="text-2xl font-serif font-bold text-[#2D332D]">
          Masuk Halaman Edit
        </h3>
        <p className="text-xs text-[#667265] mt-1 mb-6">
          Kelola data mempelai, jadwal acara, rekening hadiah, dan daftar tamu undangan.
        </p>

        {/* Credentials Reminder Box */}
        <div className="p-3 mb-6 rounded-2xl bg-[#F8F5EE] border border-[#C8A97E]/30 text-left text-xs text-[#556054]">
          <div className="flex items-center gap-1.5 font-semibold text-[#7D6B4E] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Akun Default Admin:</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between font-mono text-[11px] bg-white p-2 rounded-xl border border-stone-200 mt-1">
            <span>Username: <strong className="text-[#2D332D]">admin</strong></span>
            <span>Password: <strong className="text-[#2D332D]">wedding2026</strong></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#556054] mb-1 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#FBF9F5] border border-stone-300 focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#556054] mb-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-[#FBF9F5] border border-stone-300 focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 mt-2 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] font-semibold text-sm shadow-md transition-all border border-[#C8A97E]/40 cursor-pointer"
          >
            Masuk ke Panel Edit
          </button>
        </form>
      </div>
    </div>
  );
};
