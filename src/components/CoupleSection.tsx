import React from 'react';
import { Instagram, Heart, Quote } from 'lucide-react';
import { WeddingConfig } from '../utils/wedding';

interface CoupleSectionProps {
  couple?: WeddingConfig['couple'];
  showQuote?: boolean;
  showCouple?: boolean;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  couple,
  showQuote = true,
  showCouple = true,
}) => {
  if (!showQuote && !showCouple) return null;

  const groom = couple?.groom || {
    name: 'Arya',
    fullName: 'Raden Arya Wijaya, S.T.',
    father: 'Bpk. Ir. H. Bambang Wijaya',
    mother: 'Ibu Hj. Siti Rahmawati',
    instagram: 'aryawijaya',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  };

  const bride = couple?.bride || {
    name: 'Nabila',
    fullName: 'dr. Nabila Putri Larasati',
    father: 'Bpk. Prof. Dr. Hendra Gunawan',
    mother: 'Ibu Drg. Ratna Sari',
    instagram: 'nabilalarasati',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  };

  const quoteArabic = couple?.quoteArabic || 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ';
  const quoteTranslation = couple?.quoteTranslation || 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.';
  const quoteSource = couple?.quoteSource || 'QS. Ar-Rum: 21';
  const quoteFont = couple?.quoteFont || 'KFGQPC Uthman Taha Naskh Regular';

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F8F5EE] relative overflow-hidden" id="couple">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A97E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3F4E3E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Ayat Suci QS Ar-Rum 21 (Optional feature toggle) */}
        {showQuote && (
          <div className="p-8 sm:p-10 rounded-3xl glass-card bg-white/85 shadow-xl border border-[#C8A97E]/30 text-center mb-16 relative">
            <div className="w-12 h-12 rounded-full bg-[#F4ECE1] text-[#9A7B4F] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Quote className="w-5 h-5 text-[#C8A97E]" />
            </div>

            <p
              className="text-2xl sm:text-3xl text-[#2D332D] leading-[2.2] sm:leading-[2.4] mb-6 font-normal"
              style={{
                fontFamily: `"${quoteFont}", 'KFGQPC Uthman Taha Naskh Regular', 'kfgqpc-uthmanic-script-hafs-regular', 'Amiri', 'Traditional Arabic', serif`,
                direction: 'rtl',
              }}
            >
              {quoteArabic}
            </p>

            <p className="text-xs sm:text-sm text-[#556054] italic leading-relaxed max-w-2xl mx-auto mb-4">
              &ldquo;{quoteTranslation}&rdquo;
            </p>
            <p className="text-xs uppercase tracking-widest text-[#7D6B4E] font-bold">
              ({quoteSource})
            </p>
          </div>
        )}

        {/* Couple Profiles (Optional feature toggle) */}
        {showCouple && (
          <>
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

            <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-center">
              {/* Mempelai Pria */}
              <div className="flex flex-col items-center text-center p-8 rounded-3xl glass-card bg-white/85 shadow-lg border border-[#C8A97E]/30 relative group transition-transform duration-300 hover:-translate-y-1">
                <div className="relative mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1.5 border-2 border-[#C8A97E] shadow-xl">
                    <img
                      src={groom.photoUrl}
                      alt={groom.fullName}
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
                  {groom.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#556054] leading-relaxed mb-6">
                  Putra pertama dari pasangan: <br />
                  <strong className="text-[#3F4E3E]">{groom.father}</strong> <br />
                  & <strong className="text-[#3F4E3E]">{groom.mother}</strong>
                </p>

                <a
                  href={`https://instagram.com/${groom.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all duration-300 text-xs font-semibold shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{groom.instagram}</span>
                </a>
              </div>

              {/* Mempelai Wanita */}
              <div className="flex flex-col items-center text-center p-8 rounded-3xl glass-card bg-white/85 shadow-lg border border-[#C8A97E]/30 relative group transition-transform duration-300 hover:-translate-y-1">
                <div className="relative mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden p-1.5 border-2 border-[#C8A97E] shadow-xl">
                    <img
                      src={bride.photoUrl}
                      alt={bride.fullName}
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
                  {bride.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#556054] leading-relaxed mb-6">
                  Putri kedua dari pasangan: <br />
                  <strong className="text-[#3F4E3E]">{bride.father}</strong> <br />
                  & <strong className="text-[#3F4E3E]">{bride.mother}</strong>
                </p>

                <a
                  href={`https://instagram.com/${bride.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5ECE0] text-[#7D6B4E] hover:bg-[#C8A97E] hover:text-white transition-all duration-300 text-xs font-semibold shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{bride.instagram}</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
