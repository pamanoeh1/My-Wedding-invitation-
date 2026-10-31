import React, { useRef } from 'react';
import { Upload, X, Music, Image as ImageIcon, Check } from 'lucide-react';

interface MediaInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: 'image' | 'audio';
  helperText?: string;
  placeholder?: string;
}

export const MediaInput: React.FC<MediaInputProps> = ({
  label,
  value,
  onChange,
  type = 'image',
  helperText,
  placeholder = 'https://...',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to Base64 data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
    // reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  const isDataUrl = value && value.startsWith('data:');

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#556054]">
          {label}
        </label>
        {isDataUrl && (
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
            File lokal terunggah
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-[#FBF9F5] outline-none focus:border-[#C8A97E] pr-8"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-rose-500 cursor-pointer p-1"
              title="Hapus / Kosongkan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Local File Upload Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept={type === 'audio' ? 'audio/*' : 'image/*'}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition text-xs font-semibold shrink-0 cursor-pointer border border-[#C8A97E]/30"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Lokal</span>
        </button>
      </div>

      {helperText && (
        <p className="text-[11px] text-stone-500">{helperText}</p>
      )}

      {/* Preview */}
      {value && type === 'image' && (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] text-stone-500 truncate max-w-xs">
            {isDataUrl ? 'Pratinjau gambar lokal siap digunakan' : value}
          </span>
        </div>
      )}

      {value && type === 'audio' && (
        <div className="mt-2 p-2 rounded-xl bg-white border border-stone-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#EAF0E8] text-[#3F4E3E] flex items-center justify-center shrink-0">
            <Music className="w-4 h-4" />
          </div>
          <audio controls src={value} className="h-8 flex-1" />
        </div>
      )}
    </div>
  );
};
