import React, { useState } from 'react';
import { Copy, QrCode, Home, CreditCard, Check, X, Download } from 'lucide-react';
import { WeddingConfig } from '../utils/wedding';

interface DigitalGiftSectionProps {
  onShowToast: (msg: string) => void;
  gifts?: WeddingConfig['gifts'];
  showDigitalGift?: boolean;
  showPhysicalGift?: boolean;
}

export const DigitalGiftSection: React.FC<DigitalGiftSectionProps> = ({
  onShowToast,
  gifts,
  showDigitalGift = true,
  showPhysicalGift = true,
}) => {
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const qris = gifts?.qris || {
    isActive: true,
    title: 'QRIS Pembayaran Digital',
    merchantName: 'Arya & Nabila Wedding',
    nmid: 'ID1020261212891',
    description: 'Mendukung BCA Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, dan seluruh aplikasi perbankan berbasis QRIS.',
    instruction: 'Buka aplikasi m-Banking atau e-Wallet pilihan Anda, lalu scan kode QRIS di atas.',
    qrImageUrl: '',
  };

  const isQrisActive = showDigitalGift && qris.isActive !== false;
  const bankAccounts = gifts?.bankAccounts?.filter((b) => b.isActive) || [];

  if (!showDigitalGift && !showPhysicalGift) return null;
  if (!isQrisActive && !showPhysicalGift && bankAccounts.length === 0) return null;

  const physicalAddress = gifts?.physicalAddress || 'Jl. Dharmawangsa X No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160';
  const receiverContact = gifts?.receiverContact || 'Penerima: dr. Nabila / Arya Wijaya (0812-3456-7890)';
  const fullPhysicalAddress = `${physicalAddress} (${receiverContact})`;

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onShowToast(`${label} berhasil disalin ke clipboard!`);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F8F5EE] relative" id="gift">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Tanda Kasih
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D332D]">
            Amplop Digital & Kado Pernikahan
          </h2>
          <p className="text-xs sm:text-sm text-[#667265] max-w-lg mx-auto mt-3">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital maupun fisik, kami menyediakan sarana di bawah ini:
          </p>
        </div>

        {/* Bank Cards Grid (if showDigitalGift is true) */}
        {showDigitalGift && bankAccounts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="p-6 rounded-3xl bg-white/90 glass-card shadow-lg border border-[#C8A97E]/30 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#3F4E3E] uppercase tracking-wider">
                      Transfer Bank / E-Wallet
                    </span>
                    <CreditCard className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#2D332D] mb-4">
                    {account.bankName}
                  </h3>
                  <div className="p-3 bg-[#F8F5EE] rounded-2xl mb-4 border border-[#C8A97E]/20">
                    <p className="text-[11px] text-[#7A8678] uppercase tracking-wider mb-1">
                      Nomor Rekening:
                    </p>
                    <p className="text-lg font-mono font-bold text-[#2D332D] tracking-wider break-all">
                      {account.accountNumber}
                    </p>
                    <p className="text-xs text-[#556054] mt-1">
                      a.n {account.accountHolder}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(account.accountNumber, account.id, `Nomor rekening ${account.bankName}`)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] transition-all text-xs font-semibold shadow-sm cursor-pointer"
                >
                  {copiedKey === account.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C8A97E]" />
                      <span>Salin No. Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* QRIS & Physical Gift Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* QRIS / E-Wallet Box */}
          {isQrisActive && (
            <div className={`p-6 rounded-3xl glass-card bg-white/80 border border-[#C8A97E]/30 flex flex-col items-center text-center justify-between ${!showPhysicalGift ? 'col-span-2 max-w-lg mx-auto w-full' : ''}`}>
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F5ECE0] text-[#7D6B4E] flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#C8A97E]/30">
                  <QrCode className="w-6 h-6 text-[#C8A97E]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2D332D] mb-1">
                  {qris.title || 'QRIS Pembayaran Digital'}
                </h3>
                {qris.merchantName && (
                  <p className="text-xs font-semibold text-[#7D6B4E] uppercase tracking-wider mb-2">
                    a.n {qris.merchantName}
                  </p>
                )}
                <p className="text-xs text-[#667265] mb-4">
                  {qris.description || 'Mendukung BCA Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, dan seluruh aplikasi perbankan berbasis QRIS.'}
                </p>

                {/* If custom QR image exists, show an attractive preview thumbnail */}
                {qris.qrImageUrl && (
                  <div
                    onClick={() => setShowQrisModal(true)}
                    className="mb-4 inline-block p-1.5 bg-white rounded-xl border border-[#C8A97E]/40 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    title="Klik untuk memperbesar QRIS"
                  >
                    <img src={qris.qrImageUrl} alt="QRIS Code Preview" className="w-24 h-24 object-contain rounded-lg" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowQrisModal(true)}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-[#C8A97E] text-white hover:bg-[#9A7B4F] transition-all text-xs font-semibold shadow-sm cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Lihat Kode QRIS</span>
              </button>
            </div>
          )}

          {/* Physical Gift Box */}
          {showPhysicalGift && (
            <div className={`p-6 rounded-3xl glass-card bg-white/80 border border-[#C8A97E]/30 flex flex-col justify-between ${!isQrisActive ? 'col-span-2 max-w-lg mx-auto w-full' : ''}`}>
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#3F4E3E]">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAF0E8] flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5 text-[#3F4E3E]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#2D332D]">
                      Kirim Kado Fisik
                    </h3>
                    <p className="text-xs text-[#7A8678]">Alamat Kediaman Mempelai</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F5EE] border border-stone-200 text-xs text-[#556054] leading-relaxed mb-4">
                  <p className="font-medium text-[#2D332D] mb-1">{physicalAddress}</p>
                  <p className="text-stone-500">{receiverContact}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(fullPhysicalAddress, 'address', 'Alamat pengiriman')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#3F4E3E] text-white hover:bg-[#344033] transition-all text-xs font-semibold shadow-sm cursor-pointer"
              >
                {copiedKey === 'address' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C8A97E]" />
                    <span>Salin Alamat Kirim</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* QRIS Modal Pop-up */}
        {showQrisModal && isQrisActive && (
          <div
            onClick={() => setShowQrisModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-[#C8A97E]/40"
            >
              <button
                onClick={() => setShowQrisModal(false)}
                aria-label="Tutup QRIS Modal"
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif font-bold text-[#2D332D] mb-1">
                {qris.title || 'QRIS Pembayaran Digital'}
              </h3>
              <p className="text-xs text-[#7A8678] mb-4">
                {qris.merchantName ? `${qris.merchantName} • ` : ''}NMID: {qris.nmid || 'ID1020261212891'}
              </p>

              {qris.qrImageUrl ? (
                <div className="p-4 bg-white border-2 border-[#C8A97E]/30 rounded-2xl shadow-inner inline-block mx-auto mb-3 max-w-[260px]">
                  <img
                    src={qris.qrImageUrl}
                    alt={qris.title || 'QRIS Pembayaran'}
                    className="w-56 h-56 object-contain mx-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="p-4 bg-white border-2 border-stone-200 rounded-2xl shadow-inner inline-block mx-auto mb-4">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-48 h-48 mx-auto"
                    fill="#2D332D"
                  >
                    <rect width="200" height="200" fill="white" />
                    <rect x="15" y="15" width="50" height="50" fill="#2D332D" />
                    <rect x="25" y="25" width="30" height="30" fill="white" />
                    <rect x="33" y="33" width="14" height="14" fill="#2D332D" />

                    <rect x="135" y="15" width="50" height="50" fill="#2D332D" />
                    <rect x="145" y="25" width="30" height="30" fill="white" />
                    <rect x="153" y="33" width="14" height="14" fill="#2D332D" />

                    <rect x="15" y="135" width="50" height="50" fill="#2D332D" />
                    <rect x="25" y="145" width="30" height="30" fill="white" />
                    <rect x="33" y="153" width="14" height="14" fill="#2D332D" />

                    <rect x="75" y="20" width="10" height="10" fill="#2D332D" />
                    <rect x="95" y="20" width="10" height="10" fill="#2D332D" />
                    <rect x="115" y="20" width="10" height="10" fill="#2D332D" />
                    <rect x="75" y="40" width="20" height="10" fill="#2D332D" />
                    <rect x="105" y="40" width="10" height="20" fill="#2D332D" />
                    
                    <rect x="20" y="75" width="10" height="10" fill="#2D332D" />
                    <rect x="40" y="75" width="10" height="20" fill="#2D332D" />
                    <rect x="60" y="85" width="20" height="10" fill="#2D332D" />
                    <rect x="90" y="75" width="20" height="20" fill="#C8A97E" />
                    <rect x="120" y="75" width="10" height="20" fill="#2D332D" />
                    <rect x="140" y="85" width="20" height="10" fill="#2D332D" />
                    <rect x="170" y="75" width="10" height="10" fill="#2D332D" />

                    <rect x="75" y="115" width="20" height="10" fill="#2D332D" />
                    <rect x="105" y="115" width="10" height="30" fill="#2D332D" />
                    <rect x="125" y="125" width="20" height="10" fill="#2D332D" />
                    <rect x="155" y="115" width="20" height="20" fill="#2D332D" />

                    <rect x="75" y="155" width="30" height="10" fill="#2D332D" />
                    <rect x="115" y="165" width="20" height="15" fill="#2D332D" />
                    <rect x="145" y="155" width="15" height="25" fill="#2D332D" />
                    <rect x="170" y="145" width="15" height="15" fill="#2D332D" />
                  </svg>
                </div>
              )}

              {/* Download QRIS button if image URL or data URL exists */}
              {qris.qrImageUrl && (
                <div className="mb-3">
                  <a
                    href={qris.qrImageUrl}
                    download="qris-pernikahan.png"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#7D6B4E] hover:text-[#3F4E3E] font-medium py-1.5 px-3.5 rounded-full bg-[#F5ECE0] hover:bg-[#ebdcc9] transition shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C8A97E]" />
                    <span>Unduh Gambar QRIS</span>
                  </a>
                </div>
              )}

              <p className="text-xs text-[#556054] mb-4">
                {qris.instruction || 'Buka aplikasi m-Banking atau e-Wallet pilihan Anda, lalu scan kode QRIS di atas.'}
              </p>

              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="w-full py-2.5 rounded-full bg-[#3F4E3E] text-white text-xs font-semibold cursor-pointer hover:bg-[#344033] transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
