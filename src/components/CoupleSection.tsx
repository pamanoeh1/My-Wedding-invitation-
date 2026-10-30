import React from 'react';
import { Instagram, Heart, Quote } from 'lucide-react';

export const CoupleSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F8F5EE] relative overflow-hidden" id="couple">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A97E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3F4E3E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Ayat Suci QS Ar-Rum 21 */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card bg-white/85 shadow-xl border border-[#C8A97E]/30 text-center mb-20 relative">
          <div className="w-12 h-12 rounded-full bg-[#F4ECE1] text-[#9A7B4F] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Quote className="w-5 h-5 text-[#C8A97E]" />
          </div>

          <p className="font-serif text-xl sm:text-2xl text-[#2D332D] leading-loose mb-6 font-medium" style={{ direction: 'rtl' }}>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>

          <p className="text-xs sm:text-sm text-[#556054] italic leading-relaxed max-w-2xl mx-auto mb-4">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.&rdquo;
          </p>
          <p className="text-xs uppercase tracking-widest text-[#7D6B4E] font-bold">
            (QS. Ar-Rum: 21)
          </p>
        </div>

        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Kedua Mempelai
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D332D]">
            Mempelai yang Berbahagia
          </h2>
          <p className="text-xs sm:text-sm text-[#667265] max-w-md mx-auto mt-3">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud melangsungkan akad pernikahan kami:
          </p>
        </div>

        {/* Groom & Bride Grid */}
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-center">
          {/* Mempelai Pria */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl glass-card bg-white/85 shadow-lg border border-[#C8A97E]/30 relative group transition-transform duration-300 hover:-translate-y-1">
            <div className="relative mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1.5 border-2 border-[#C8A97E] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  alt="Raden Arya Wijaya"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-[#3F4E3E] text-white shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#7D6B4E] font-semibold mb-1">
              Mempelai Pria
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D332D] mb-2">
              Raden Arya Wijaya, S.T.
            </h3>
            <p className="text-xs sm:text-sm text-[#556054] leading-relaxed mb-6">
              Putra pertama dari pasangan: <br />
              <strong className="text-[#3F4E3E]">Bpk. Ir. H. Bambang Wijaya</strong> <br />
              & <strong className="text-[#3F4E3E]">Ibu Hj. Siti Rahmawati</strong>
            </p>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all duration-300 text-xs font-semibold shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@aryawijaya</span>
            </a>
          </div>

          {/* Mempelai Wanita */}
          <div className="flex flex-col items-center text-center p-8 rounded-3xl glass-card bg-white/85 shadow-lg border border-[#C8A97E]/30 relative group transition-transform duration-300 hover:-translate-y-1">
            <div className="relative mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1.5 border-2 border-[#C8A97E] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="dr. Nabila Putri Larasati"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-[#C8A97E] text-white shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#7D6B4E] font-semibold mb-1">
              Mempelai Wanita
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D332D] mb-2">
              dr. Nabila Putri Larasati
            </h3>
            <p className="text-xs sm:text-sm text-[#556054] leading-relaxed mb-6">
              Putri kedua dari pasangan: <br />
              <strong className="text-[#3F4E3E]">Bpk. Prof. Dr. Hendra Gunawan</strong> <br />
              & <strong className="text-[#3F4E3E]">Ibu Drg. Ratna Sari</strong>
            </p>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all duration-300 text-xs font-semibold shadow-sm"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@nabilalarasati</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
