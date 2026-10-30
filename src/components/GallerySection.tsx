import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Film } from 'lucide-react';

interface GalleryItem {
  id: number;
  url: string;
  caption: string;
  category: string;
}

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: 'The Promise of Forever — Momen pembuka cerita cinta kami',
      category: 'Pre-wedding',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      caption: 'Two Hearts, One Journey — Lambang komitmen suci',
      category: 'Details',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      caption: 'Walking in Autumn Sunset — Di bawah langit senja',
      category: 'Moments',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      caption: 'Delicate Blooms of Joy — Bunga ketulusan',
      category: 'Aesthetic',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      caption: 'Hand in Hand — Bersama melangkah ke masa depan',
      category: 'Portrait',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sacred Harmony — Ruang penuh rasa syukur',
      category: 'Venue',
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev === 0 ? galleryItems.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev === galleryItems.length - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#F8F5EE] relative" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7D6B4E] font-semibold mb-2">
            Galeri Memori
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D332D]">
            Momen Bahagia Kami
          </h2>
          <p className="text-xs sm:text-sm text-[#667265] max-w-md mx-auto mt-3">
            Setiap detik yang kami lalui adalah untaian rasa syukur menuju lembaran baru dalam ikatan pernikahan.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-md border border-[#C8A97E]/30 bg-white aspect-[4/5] transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#C8A97E] font-semibold">
                  {item.category}
                </span>
                <p className="text-xs sm:text-sm font-medium line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#EAF0E8]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Klik untuk perbesar</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Teaser Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-card bg-white/80 border border-[#C8A97E]/30 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#3F4E3E] text-[#FBF9F5] flex items-center justify-center mx-auto mb-4 shadow-md">
            <Film className="w-5 h-5 text-[#C8A97E]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D332D] mb-2">
            Cinematic Love Teaser
          </h3>
          <p className="text-xs sm:text-sm text-[#556054] mb-6">
            Sebuah cuplikan perjalanan kisah dua insan mengarungi rasa cinta hingga melabuhkan janji suci.
          </p>
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-900 border border-[#C8A97E]/40 flex items-center justify-center group shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Video thumbnail"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
              <div className="w-16 h-16 rounded-full bg-[#C8A97E]/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1" />
              </div>
              <span className="text-xs tracking-wider uppercase font-semibold mt-3 text-[#F5ECE0]">
                Play Trailer
              </span>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {activePhotoIndex !== null && (
          <div
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300"
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Tutup Galeri"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Foto Selanjutnya"
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[activePhotoIndex].url}
                alt={galleryItems[activePhotoIndex].caption}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <div className="text-center mt-4 text-white">
                <p className="text-sm sm:text-base font-serif font-medium">
                  {galleryItems[activePhotoIndex].caption}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {activePhotoIndex + 1} dari {galleryItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
