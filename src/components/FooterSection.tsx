import React, { useState } from 'react';
import { Heart, FileCode, Download, Check, Sparkles } from 'lucide-react';

interface FooterSectionProps {
  onShowToast: (msg: string) => void;
  showDownload?: boolean;
  onOpenSecretAdmin?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onShowToast,
  showDownload = true,
  onOpenSecretAdmin,
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadStandalone = () => {
    setDownloading(true);
    // Fetch or trigger download of wedding-invitation-standalone.html
    const link = document.createElement('a');
    link.href = '/wedding-invitation-standalone.html';
    link.download = 'undangan-pernikahan-digital.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Berkas Standalone HTML berhasil diunduh!');
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <footer className="py-20 px-4 sm:px-6 bg-[#2D332D] text-[#FBF9F5] text-center relative overflow-hidden">
      {/* Subtle decorative gold line */}
      <div className="w-24 h-[1px] bg-[#C8A97E] mx-auto mb-10" />

      <div className="max-w-2xl mx-auto space-y-6">
        <p className="font-script text-4xl sm:text-5xl text-[#C8A97E]">
          Terima Kasih
        </p>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi lembaran baru kehidupan kami.
        </p>

        <div className="py-4">
          <p className="text-xs uppercase tracking-widest text-[#C8A97E] font-medium mb-1">
            Kami yang berbahagia,
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Arya & Nabila
          </h2>
          <p className="text-xs text-stone-400 mt-2">
            Beserta segenap Keluarga Besar Wijaya & Gunawan
          </p>
        </div>

        {/* Action Button: Unduh Standalone Single-file HTML (Controllable via Features) */}
        {showDownload && (
          <div className="pt-4">
            <button
              onClick={handleDownloadStandalone}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#C8A97E] hover:text-[#2D332D] text-xs font-semibold text-[#EAF0E8] border border-[#C8A97E]/40 transition-all duration-300 cursor-pointer shadow-lg"
            >
              {downloading ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Mengunduh Berkas...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#C8A97E]" />
                  <span>Unduh Berkas Standalone HTML (Single-File)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Branding, Watermark & Secret Admin Link */}
        <div className="pt-10 border-t border-white/10 text-[11px] text-stone-400 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Digital Wedding Invitation &bull; Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#C8A97E] fill-[#C8A97E] inline" />
          <span>&bull; Arya & Nabila Wedding</span>
        </div>
      </div>
    </footer>
  );
};
