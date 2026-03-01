'use client';

import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import SectionHeader from './SectionHeader';
import suluadaHeroImg from '../../public/images/suluada-hero.jpg';
import suluadaTurquoise from '../../public/images/suluada-turquoise.jpg';
import suluadaTropical from '../../public/images/suluada-tropical.jpg';
import suluadaAerialBeach from '../../public/images/suluada-aerial-beach.jpg';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const features = [
  {
    title: '驚異の透明度',
    subtitle: 'Crystal Clear Water',
    description:
      '海底が見える驚異の透明度。シュノーケリングなしでも魚が見えるほど澄み切った海。',
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: '手つかずの自然',
    subtitle: 'Pristine Nature',
    description:
      '手つかずの自然が残る無人島。松の木と白砂のコントラストが生む、原始的な美しさ。',
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67"
        />
      </svg>
    ),
  },
  {
    title: '忘れられない体験',
    subtitle: 'Unforgettable Experience',
    description:
      'ボートツアーで訪問可能。透き通る海で泳いだり、白砂で日光浴を楽しめる。',
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
];

const galleryImages = [
  {
    src: suluadaTurquoise,
    alt: 'スルアダ島の透明な海のクローズアップ',
    caption: 'ターコイズの海',
  },
  {
    src: suluadaTropical,
    alt: 'スルアダ島の熱帯の海とビーチ',
    caption: 'クリスタルクリア',
  },
  {
    src: suluadaAerialBeach,
    alt: 'スルアダ島の白砂と透き通る海の空撮',
    caption: '白砂のビーチ',
  },
];

export default function Suluada() {
  const shouldReduceMotion = useReducedMotion();

  const infiniteTransition = (duration: number, delay = 0) =>
    shouldReduceMotion
      ? undefined
      : {
          duration,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          ...(delay ? { delay } : {}),
        };

  return (
    <section id="suluada" className="relative overflow-hidden">
      {/* ============================================= */}
      {/* 1. FULLSCREEN HERO IMAGE                      */}
      {/* ============================================= */}
      <div className="relative h-[80vh] min-h-[600px]">
        {/* Background Image */}
        <Image
          src={suluadaHeroImg}
          alt="上空から見たスルアダ島のエメラルドグリーンの海と白い砂浜"
          fill
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
        />

        {/* Gradient overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/40 via-transparent to-ocean-950/40" />

        {/* Aurora-style animated ambient glow */}
        <m.div
          className="absolute bottom-0 left-1/4 w-3/4 h-1/2 rounded-full bg-cyan-400/8 blur-3xl"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 50, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={infiniteTransition(14)}
        />
        <m.div
          className="absolute bottom-0 right-1/4 w-1/2 h-1/3 rounded-full bg-amber-400/5 blur-3xl"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -40, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }
          }
          transition={infiniteTransition(18)}
        />

        {/* Floating decorative particles */}
        <m.div
          className="absolute top-1/4 right-[15%] w-1.5 h-1.5 rounded-full bg-amber-300/40"
          animate={shouldReduceMotion ? undefined : { y: [0, -18, 0] }}
          transition={infiniteTransition(6)}
        />
        <m.div
          className="absolute top-1/3 left-[12%] w-1 h-1 rounded-full bg-cyan-200/30"
          animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={infiniteTransition(5, 1)}
        />
        <m.div
          className="absolute bottom-1/3 right-[25%] w-2 h-2 rounded-full bg-white/15"
          animate={shouldReduceMotion ? undefined : { y: [0, -22, 0] }}
          transition={infiniteTransition(7, 2)}
        />
        <m.div
          className="absolute top-[45%] left-[30%] w-1 h-1 rounded-full bg-amber-200/25"
          animate={shouldReduceMotion ? undefined : { y: [0, -16, 0] }}
          transition={infiniteTransition(8, 0.5)}
        />

        {/* Hero text content — anchored to bottom */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <m.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* English label */}
              <m.p
                variants={itemVariants}
                className="text-sm tracking-[0.3em] text-amber-300 uppercase font-medium mb-4"
              >
                THE TURKISH MALDIVES
              </m.p>

              {/* Main title */}
              <m.h2
                variants={itemVariants}
                className="font-display text-5xl md:text-7xl text-white font-bold leading-tight mb-3"
              >
                スルアダ島
              </m.h2>

              {/* Subtitle */}
              <m.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/90 font-light mb-4"
              >
                Suluada — 透明な海の楽園
              </m.p>

              {/* Decorative line */}
              <m.div
                variants={itemVariants}
                className="w-16 h-px bg-gradient-to-r from-amber-300/60 to-transparent mb-6"
              />

              {/* Description */}
              <m.p
                variants={itemVariants}
                className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed"
              >
                アンタルヤから船で約1時間。
                <br className="hidden sm:block" />
                信じられないほど透き通った海が広がる、
                <br className="hidden sm:block" />
                手つかずの自然が残る秘境の島。
              </m.p>
            </m.div>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* 2. FEATURE CARDS SECTION                      */}
      {/* ============================================= */}
      <div className="relative bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-950 py-24 md:py-32">
        {/* Aurora ambient overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-0 -left-1/4 w-3/4 h-3/4 rounded-full bg-cyan-400/6 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, 60, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.15, 1],
                  }
            }
            transition={infiniteTransition(16)}
          />
          <m.div
            className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 rounded-full bg-teal-300/5 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, -40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                  }
            }
            transition={infiniteTransition(20)}
          />
          <m.div
            className="absolute top-1/2 left-1/3 w-1/2 h-1/2 rounded-full bg-amber-400/4 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, -30, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.1, 1],
                  }
            }
            transition={infiniteTransition(22)}
          />
        </div>

        {/* Floating particles */}
        <m.div
          className="absolute top-20 right-[18%] w-1.5 h-1.5 rounded-full bg-cyan-200/25"
          animate={shouldReduceMotion ? undefined : { y: [0, -16, 0] }}
          transition={infiniteTransition(6)}
        />
        <m.div
          className="absolute bottom-32 left-[10%] w-1 h-1 rounded-full bg-amber-300/20"
          animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={infiniteTransition(7, 1.5)}
        />
        <m.div
          className="absolute top-1/2 right-[8%] w-1 h-1 rounded-full bg-white/10"
          animate={shouldReduceMotion ? undefined : { y: [0, -20, 0] }}
          transition={infiniteTransition(8, 0.5)}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionHeader
              subtitle="Why Suluada?"
              title="スルアダの魅力"
              titleClassName="text-white"
              subtitleClassName="text-ocean-400"
              gradientClass="from-ocean-400 to-cyan-400"
            />
          </m.div>

          {/* Feature Cards Grid */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature) => (
              <m.div
                key={feature.title}
                variants={cardVariants}
                className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-400 to-cyan-500 shadow-md shadow-cyan-500/20 mb-5 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow duration-500">
                  {feature.icon}
                </div>

                {/* Title */}
                <h4 className="font-display text-xl text-white mb-1">
                  {feature.title}
                </h4>
                <p className="text-ocean-300 text-xs tracking-wider uppercase mb-4">
                  {feature.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/60 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle corner accent on hover */}
                <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-tr-sm" />
              </m.div>
            ))}
          </m.div>
        </div>
      </div>

      {/* ============================================= */}
      {/* 3. GALLERY IMAGE GRID                         */}
      {/* ============================================= */}
      <div className="relative bg-ocean-950 py-24 md:py-32">
        {/* Subtle ambient glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-ocean-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionHeader
              subtitle="Scenes of Paradise"
              title="楽園の風景"
              titleClassName="text-white"
              subtitleClassName="text-ocean-400"
              gradientClass="from-cyan-400 to-ocean-400"
            />
          </m.div>

          {/* 3-Column Image Grid */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {galleryImages.map((image) => (
              <m.div
                key={image.caption}
                variants={imageVariants}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                />

                {/* Always-visible bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Caption */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/70 text-xs tracking-wider uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Suluada Island
                    </p>
                    <h4 className="text-white font-display text-lg drop-shadow-lg">
                      {image.caption}
                    </h4>
                  </div>
                </div>

                {/* Corner accents on hover */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/0 group-hover:border-white/50 transition-all duration-500 rounded-tl-sm" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/0 group-hover:border-white/50 transition-all duration-500 rounded-br-sm" />
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
