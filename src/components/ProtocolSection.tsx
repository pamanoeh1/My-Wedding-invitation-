import React from 'react';
import { Shirt, ShieldCheck, Heart, Smile } from 'lucide-react';

export const ProtocolSection: React.FC = () => {
  const protocols = [
    {
      icon: <Shirt className="w-5 h-5 text-[#C8A97E]" />,
      title: 'Dress Code Tamu',
      description: 'Disarankan mengenakan busana bernuansa Earth Tone, Sage Green, Champagne, atau Batik Formal.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C8A97E]" />,
      title: 'Kesehatan & Kebersihan',
      description: 'Mohon berkenan menggunakan masker dan menjaga kesehatan bila sedang kurang enak badan.',
    },
    {
      icon: <Smile className="w-5 h-5 text-[#C8A97E]" />,
      title: 'Ketepatan Waktu',
      description: 'Hadir sesuai jadwal sesi demi kelancaran prosesi akad dan kenyamanan jamuan resepsi.',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C8A97E]" />,
      title: 'Doa & Restu Tulus',
      description: 'Senyuman hangat serta doa tulus Anda adalah hadiah paling berharga bagi awal bahtera hidup kami.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#FBF9F5] relative border-t border-stone-200/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Panduan & Informasi
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D332D]">
            Etiket & Catatan Tamu
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {protocols.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl glass-card bg-white/80 border border-[#C8A97E]/30 text-center flex flex-col items-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5ECE0] flex items-center justify-center mb-4 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-sm font-serif font-bold text-[#2D332D] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#556054] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
