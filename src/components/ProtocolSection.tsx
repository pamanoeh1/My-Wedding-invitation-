import React from 'react';
import { Shirt, ShieldCheck, Heart, Smile } from 'lucide-react';
import { ProtocolItem } from '../utils/wedding';

interface ProtocolSectionProps {
  protocols?: ProtocolItem[];
}

export const ProtocolSection: React.FC<ProtocolSectionProps> = ({ protocols = [] }) => {
  const activeProtocols = protocols.filter((p) => p.isActive);
  if (activeProtocols.length === 0) return null;

  const defaultIcons = [
    <Shirt className="w-5 h-5 text-[#C8A97E]" />,
    <ShieldCheck className="w-5 h-5 text-[#C8A97E]" />,
    <Smile className="w-5 h-5 text-[#C8A97E]" />,
    <Heart className="w-5 h-5 text-[#C8A97E]" />,
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

        <div className={`grid gap-4 sm:gap-6 ${activeProtocols.length <= 2 ? 'sm:grid-cols-2 max-w-2xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
          {activeProtocols.map((item, index) => (
            <div
              key={item.id || index}
              className="p-6 rounded-2xl glass-card bg-white/80 border border-[#C8A97E]/30 text-center flex flex-col items-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5ECE0] flex items-center justify-center mb-4 shadow-inner">
                {defaultIcons[index % defaultIcons.length]}
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
