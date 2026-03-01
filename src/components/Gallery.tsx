'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import galleryAzureSea from '../../public/images/gallery-azure-sea.jpg';
import galleryKaleici from '../../public/images/gallery-kaleici.jpg';
import gallerySuluadaClear from '../../public/images/gallery-suluada-clear.jpg';
import galleryDudenFalls from '../../public/images/gallery-duden-falls.jpg';
import gallerySunsetBeach from '../../public/images/gallery-sunset-beach.jpg';
import galleryAspendos from '../../public/images/gallery-aspendos.jpg';
import galleryCruise from '../../public/images/gallery-cruise.jpg';
import gallerySuluadaBeach from '../../public/images/gallery-suluada-beach.jpg';
import galleryTurkishFood from '../../public/images/gallery-turkish-food.jpg';
import galleryParagliding from '../../public/images/gallery-paragliding.jpg';

const galleryItems = [
  {
    id: 1,
    title: '紺碧の海',
    subtitle: 'Azure Mediterranean',
    gradient: 'from-cyan-500 to-blue-600',
    size: 'col-span-1 md:col-span-2 md:row-span-2',
    image: galleryAzureSea,
  },
  {
    id: 2,
    title: 'カレイチの路地',
    subtitle: 'Kaleiçi Alleyways',
    gradient: 'from-amber-700 to-orange-800',
    size: 'col-span-1 row-span-1',
    image: galleryKaleici,
  },
  {
    id: 9,
    title: 'スルアダの透明な海',
    subtitle: 'Crystal Clear Suluada',
    gradient: 'from-cyan-300 to-teal-500',
    size: 'col-span-1 md:col-span-2',
    image: gallerySuluadaClear,
  },
  {
    id: 3,
    title: 'デュデンの滝',
    subtitle: 'Düden Waterfalls',
    gradient: 'from-cyan-600 to-teal-700',
    size: 'col-span-1 md:row-span-2',
    image: galleryDudenFalls,
  },
  {
    id: 4,
    title: '夕焼けのビーチ',
    subtitle: 'Sunset Beach',
    gradient: 'from-orange-400 to-pink-500',
    size: 'col-span-1 row-span-1',
    image: gallerySunsetBeach,
  },
  {
    id: 5,
    title: 'アスペンドス劇場',
    subtitle: 'Aspendos Theatre',
    gradient: 'from-stone-500 to-amber-700',
    size: 'col-span-1 row-span-1',
    image: galleryAspendos,
  },
  {
    id: 6,
    title: '地中海クルーズ',
    subtitle: 'Mediterranean Cruise',
    gradient: 'from-blue-500 to-cyan-600',
    size: 'col-span-1 md:col-span-2',
    image: galleryCruise,
  },
  {
    id: 10,
    title: 'スルアダのビーチ',
    subtitle: 'Suluada Beach',
    gradient: 'from-emerald-400 to-cyan-500',
    size: 'col-span-1 row-span-1',
    image: gallerySuluadaBeach,
  },
  {
    id: 7,
    title: 'トルコ料理',
    subtitle: 'Turkish Cuisine',
    gradient: 'from-red-500 to-amber-600',
    size: 'col-span-1 row-span-1',
    image: galleryTurkishFood,
  },
  {
    id: 8,
    title: 'パラグライダー',
    subtitle: 'Paragliding',
    gradient: 'from-sky-400 to-cyan-500',
    size: 'col-span-1 row-span-1',
    image: galleryParagliding,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[number] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  /* Navigate to next / previous image inside modal */
  const goNext = useCallback(() => {
    setSelectedItem((prev) => {
      if (!prev) return prev;
      const idx = galleryItems.findIndex((i) => i.id === prev.id);
      return galleryItems[(idx + 1) % galleryItems.length];
    });
  }, []);

  const goPrev = useCallback(() => {
    setSelectedItem((prev) => {
      if (!prev) return prev;
      const idx = galleryItems.findIndex((i) => i.id === prev.id);
      return galleryItems[(idx - 1 + galleryItems.length) % galleryItems.length];
    });
  }, []);

  /* Keyboard handling: Escape, ArrowLeft, ArrowRight, Tab-trap */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        goNext();
        return;
      }
      if (e.key === 'ArrowLeft') {
        goPrev();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [handleClose, goNext, goPrev]
  );

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      });
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem, handleKeyDown]);

  return (
    <section id="gallery" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* ── Enhanced ambient glows ── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ocean-600/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ocean-400/10 rounded-full blur-[80px]" />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-[70px]" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/6 rounded-full blur-[70px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeader
            subtitle="Moments of Antalya"
            title="ギャラリー"
            titleClassName="text-white"
            subtitleClassName="text-ocean-400"
          />
        </m.div>

        {/* Masonry Grid */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4"
        >
          {galleryItems.map((item) => (
            <m.div
              key={item.id}
              variants={itemVariants}
              className={`${item.size} relative rounded-2xl overflow-hidden cursor-pointer group`}
              onClick={() => setSelectedItem(item)}
            >
              {/* Background Image + brightness boost on hover */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                placeholder="blur"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Always visible subtle bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Title overlay – enhanced */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/80 text-xs tracking-wider uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.subtitle}
                  </p>
                  <h3 className="text-white font-display text-lg md:text-xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                    {item.title}
                  </h3>
                  {/* Thin underline that expands on hover */}
                  <div className="h-px bg-white/50 mt-2 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>

              {/* ── Four corner accents ── */}
              <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-white/0 group-hover:border-white/70 transition-all duration-700 rounded-tl-sm" />
              <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-white/0 group-hover:border-white/70 transition-all duration-700 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-white/0 group-hover:border-white/70 transition-all duration-700 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-white/0 group-hover:border-white/70 transition-all duration-700 rounded-br-sm" />
            </m.div>
          ))}
        </m.div>
      </div>

      {/* ── Modal with navigation ── */}
      <AnimatePresence>
        {selectedItem && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title + ' - ギャラリー詳細'}
            ref={modalRef}
          >
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
              aria-label="前の画像"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
              aria-label="次の画像"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Image card */}
            <AnimatePresence mode="wait">
              <m.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-4xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Large image */}
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                  placeholder="blur"
                />

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <p className="text-white/70 text-sm tracking-[0.15em] uppercase mb-2">
                    {selectedItem.subtitle}
                  </p>
                  <h3 className="text-white font-display text-3xl md:text-4xl" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
                    {selectedItem.title}
                  </h3>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all duration-300"
                  aria-label="ギャラリーを閉じる"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </m.div>
            </AnimatePresence>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
