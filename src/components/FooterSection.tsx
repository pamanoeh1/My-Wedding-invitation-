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
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [showHostingGuide, setShowHostingGuide] = useState(false);

  const handleDownloadZip = () => {
    setDownloadingZip(true);
    const link = document.createElement('a');
    link.href = '/undangan-pernikahan-hosting.zip';
    link.download = 'undangan-pernikahan-hosting.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Paket Hosting (.ZIP) berhasil diunduh! Siap upload ke public_html.');
    setTimeout(() => setDownloadingZip(false), 1500);
  };

  const handleDownloadStandalone = () => {
    setDownloadingHtml(true);
    const link = document.createElement('a');
    link.href = '/wedding-invitation-standalone.html';
    link.download = 'undangan-pernikahan-digital.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Berkas Standalone HTML berhasil diunduh!');
    setTimeout(() => setDownloadingHtml(false), 1500);
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

        {/* Action Buttons: Unduh Paket Hosting & Panduan (Controllable via Features) */}
        {showDownload && (
          <div className="pt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleDownloadZip}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C8A97E] hover:bg-[#b09167] text-[#2D332D] font-bold text-xs transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
              >
                {downloadingZip ? (
                  <>
                    <Check className="w-4 h-4 text-[#2D332D]" />
                    <span>Mengunduh ZIP...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#2D332D]" />
                    <span>Unduh Paket Hosting Siap Upload (.ZIP)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadStandalone}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#EAF0E8] border border-[#C8A97E]/40 transition-all duration-300 cursor-pointer"
              >
                {downloadingHtml ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Mengunduh HTML...</span>
                  </>
                ) : (
                  <>
                    <FileCode className="w-4 h-4 text-[#C8A97E]" />
                    <span>Unduh Standalone HTML</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowHostingGuide(true)}
                className="text-[11px] text-[#C8A97E] hover:text-white underline underline-offset-4 transition cursor-pointer"
              >
                📖 Cara Upload ke cPanel / Hostinger / Netlify
              </button>
            </div>
          </div>
        )}

        {/* Hosting Guide Modal */}
        {showHostingGuide && (
          <div
            onClick={() => setShowHostingGuide(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-[#2D332D] rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#C8A97E]/40 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EAF0E8] text-[#3F4E3E] flex items-center justify-center font-bold">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#2D332D]">
                      Panduan Upload ke Hosting
                    </h3>
                    <p className="text-[11px] text-[#7A8678]">
                      Langkah cepat pasang undangan di domain Anda sendiri
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHostingGuide(false)}
                  className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-[#556054] leading-relaxed">
                <div className="p-3.5 rounded-2xl bg-[#F8F5EE] border border-[#C8A97E]/30 space-y-1.5">
                  <p className="font-bold text-[#2D332D] text-sm">
                    1. Upload ke cPanel / Niagahoster / Hostinger (Paling Umum)
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Klik tombol <strong>"Unduh Paket Hosting Siap Upload (.ZIP)"</strong> di atas.</li>
                    <li>Buka <strong>cPanel</strong> &gt; menu <strong>File Manager</strong>.</li>
                    <li>Masuk ke folder <strong>public_html</strong>.</li>
                    <li>Klik <strong>Upload</strong> &gt; pilih file <code className="bg-stone-200 px-1 rounded">undangan-pernikahan-hosting.zip</code>.</li>
                    <li>Setelah selesai, klik kanan file zip &gt; pilih <strong>Extract</strong>.</li>
                    <li>Selesai! Buka domain Anda di browser: <code>https://domainanda.com</code>.</li>
                  </ol>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F5EE] border border-[#C8A97E]/30 space-y-1.5">
                  <p className="font-bold text-[#2D332D] text-sm">
                    2. Upload Gratis ke Netlify (5 Detik Online)
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Ekstrak file <code className="bg-stone-200 px-1 rounded">undangan-pernikahan-hosting.zip</code> di komputer Anda.</li>
                    <li>Buka situs gratis <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-[#7D6B4E] underline font-bold">app.netlify.com/drop</a>.</li>
                    <li>Tarik (drag &amp; drop) folder hasil ekstrak ke layar browser.</li>
                    <li>Website langsung online dengan URL HTTPS gratis dan bisa dipasangi domain sendiri!</li>
                  </ol>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EAF0E8] border border-[#3F4E3E]/20 space-y-1">
                  <p className="font-bold text-[#3F4E3E]">
                    💡 Format Link Tamu &amp; Akses Admin:
                  </p>
                  <p>
                    • <strong>Kirim ke Tamu:</strong> <code>https://domainanda.com/?to=Nama+Tamu</code>
                  </p>
                  <p>
                    • <strong>Buka Panel Edit:</strong> <code>https://domainanda.com/?salam2408&amp;risa1211</code>
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Akun default admin: username <code>admin</code>, password <code>wedding2026</code>.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  className="flex-1 py-2.5 rounded-full bg-[#3F4E3E] text-white text-xs font-semibold hover:bg-[#2D332D] transition cursor-pointer text-center"
                >
                  Unduh Berkas ZIP Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => setShowHostingGuide(false)}
                  className="px-4 py-2.5 rounded-full border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
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
