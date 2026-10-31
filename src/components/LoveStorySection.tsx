import React from 'react';
import { Heart, Compass, Sparkles, Award } from 'lucide-react';

interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

import { WeddingConfig } from '../utils/wedding';

interface LoveStorySectionProps {
  milestones?: WeddingConfig['milestones'];
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ milestones: customMilestones }) => {
  const defaultMilestones: StoryMilestone[] = [
    {
      year: '2021',
      title: 'Pertemuan Pertama di Kampus',
      description:
        'Takdir mempertemukan kami di sebuah simposium riset universitas. Sebuah percakapan sederhana tentang buku dan impian masa depan menjadi benih awal tumbuhnya rasa saling memahami.',
      icon: <Compass className="w-5 h-5 text-[#C8A97E]" />,
    },
    {
      year: '2023',
      title: 'Menautkan Komitmen & Doa',
      description:
        'Setelah melewati berbagai fase suka dan duka bersama, kami menyadari bahwa cinta ini bukan sekadar tentang rasa nyaman, namun komitmen untuk saling mendukung dan bertumbuh dalam kebaikan.',
      icon: <Heart className="w-5 h-5 text-[#C8A97E] fill-[#C8A97E]/30" />,
    },
    {
      year: 'Maret 2026',
      title: 'Momen Sakral Pertunangan',
      description:
        'Di hadapan keluarga besar kedua belah pihak, Arya mengutarakan niat tulus untuk meminang Nabila. Dengan izin Allah dan restu kedua orang tua, janji pertunangan resmi terikat.',
      icon: <Sparkles className="w-5 h-5 text-[#C8A97E]" />,
    },
    {
      year: 'Desember 2026',
      title: 'Menuju Gerbang Pernikahan',
      description:
        'Kini, dengan hati penuh syukur, kami siap melangkah bersama mengarungi mahligai rumah tangga yang sakinah, mawaddah, warahmah selamanya.',
      icon: <Award className="w-5 h-5 text-[#C8A97E]" />,
    },
  ];

  const icons = [
    <Compass className="w-5 h-5 text-[#C8A97E]" />,
    <Heart className="w-5 h-5 text-[#C8A97E] fill-[#C8A97E]/30" />,
    <Sparkles className="w-5 h-5 text-[#C8A97E]" />,
    <Award className="w-5 h-5 text-[#C8A97E]" />,
  ];

  const milestones: StoryMilestone[] = customMilestones
    ? customMilestones.map((m, idx) => ({
        ...m,
        icon: icons[idx % icons.length],
      }))
    : defaultMilestones;

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FBF9F5] relative overflow-hidden" id="story">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Kisah Kami
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D332D]">
            Perjalanan Cinta (Our Love Story)
          </h2>
          <p className="text-xs sm:text-sm text-[#667265] max-w-md mx-auto mt-3">
            Rangkaian tapak waktu berharga yang menuntun kami menuju satu ikatan suci pernikahan.
          </p>
        </div>

        {/* Timeline structure */}
        <div className="relative border-l-2 border-[#C8A97E]/40 ml-4 sm:ml-32 md:ml-40 space-y-12">
          {milestones.map((item, index) => (
            <div
              key={index}
              className="relative pl-8 sm:pl-10"
            >
              {/* Node indicator */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#FBF9F5] border-2 border-[#C8A97E] flex items-center justify-center shadow-md">
                {item.icon}
              </div>

              {/* Year badge (Desktop floating left, Mobile inline) */}
              <div className="sm:absolute sm:-left-36 md:-left-44 top-1.5 mb-2 sm:mb-0 sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-[#3F4E3E] text-white text-xs font-semibold tracking-wider shadow-sm">
                  {item.year}
                </span>
              </div>

              {/* Story card */}
              <div className="p-6 rounded-2xl glass-card bg-white/85 shadow-md border border-[#C8A97E]/30 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D332D] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#556054] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
