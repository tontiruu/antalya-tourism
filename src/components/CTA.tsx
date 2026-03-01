'use client';

import { m, useReducedMotion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import Image from 'next/image';
import ctaBgImage from '../../public/images/cta-bg.jpg';

const particles = [
  { top: '10%', right: '15%', size: 'w-1.5 h-1.5', opacity: 'bg-amber-300/30', duration: 6, delay: 0 },
  { top: '25%', left: '8%', size: 'w-1 h-1', opacity: 'bg-cyan-200/25', duration: 7, delay: 1 },
  { top: '50%', left: '6%', size: 'w-2 h-2', opacity: 'bg-white/15', duration: 8, delay: 2 },
  { bottom: '20%', right: '10%', size: 'w-1 h-1', opacity: 'bg-amber-200/20', duration: 9, delay: 0.5 },
  { top: '35%', right: '25%', size: 'w-1.5 h-1.5', opacity: 'bg-white/10', duration: 7.5, delay: 1.5 },
  { bottom: '35%', left: '18%', size: 'w-1 h-1', opacity: 'bg-cyan-300/20', duration: 6.5, delay: 3 },
  { top: '15%', left: '30%', size: 'w-0.5 h-0.5', opacity: 'bg-amber-300/25', duration: 8.5, delay: 2.5 },
  { bottom: '15%', right: '30%', size: 'w-1.5 h-1.5', opacity: 'bg-white/12', duration: 10, delay: 1.8 },
];

export default function CTA() {
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
    <section id="cta" className="relative overflow-hidden">
      {/* Fullscreen photo background with Ken Burns effect */}
      <div className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center">
        {/* Background image with Ken Burns zoom */}
        <m.div
          className="absolute inset-0"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.1, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <Image
            src={ctaBgImage}
            alt="Antalya sunset view"
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
            placeholder="blur"
          />
        </m.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Additional cinematic overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Aurora-style animated overlays (subtle, on top of the image) */}
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-0 -left-1/4 w-3/4 h-3/4 rounded-full bg-cyan-400/8 blur-[70px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, 60, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.15, 1],
                  }
            }
            transition={infiniteTransition(14)}
          />
          <m.div
            className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 rounded-full bg-amber-400/6 blur-[70px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, -50, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                  }
            }
            transition={infiniteTransition(16)}
          />
          <m.div
            className="absolute top-1/2 left-1/3 w-1/2 h-1/2 rounded-full bg-teal-300/5 blur-[70px]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                  }
            }
            transition={infiniteTransition(18)}
          />
        </div>

        {/* Content */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 py-20"
        >
          {/* Small label */}
          <m.span
            variants={itemVariants}
            className="inline-block text-sm tracking-[0.3em] text-amber-300/90 uppercase font-medium mb-8"
          >
            YOUR JOURNEY AWAITS
          </m.span>

          {/* Main heading with text shadow */}
          <m.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display text-white font-bold leading-tight mb-6"
            style={{
              textShadow: '0 2px 30px rgba(0,0,0,0.5), 0 4px 60px rgba(0,0,0,0.3)',
            }}
          >
            アンタルヤが
            <br />
            あなたを待っています
          </m.h2>

          {/* Decorative line */}
          <m.div
            variants={itemVariants}
            className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent mx-auto mb-10"
          />

          {/* Sub message */}
          <m.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-14"
            style={{
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
            }}
          >
            地中海の宝石で、一生の思い出を作りましょう。
            <br className="hidden sm:block" />
            今すぐ旅の計画を始めませんか?
          </m.p>

          {/* Buttons */}
          <m.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary CTA button with glow */}
            <m.a
              href="#hero"
              className="relative inline-flex items-center px-12 py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-xl shadow-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulse ring */}
              <m.span
                className="absolute inset-0 rounded-full border-2 border-amber-400/40"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1],
                        opacity: [0.6, 0, 0.6],
                      }
                }
                transition={infiniteTransition(2.5)}
              />
              {/* Outer glow ring */}
              <m.span
                className="absolute -inset-1 rounded-full border border-amber-300/20"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.12, 1],
                        opacity: [0.3, 0, 0.3],
                      }
                }
                transition={infiniteTransition(3, 0.5)}
              />
              旅を計画する
            </m.a>

            {/* Secondary button - glassmorphism */}
            <m.a
              href="#footer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium text-base transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              お問い合わせ
            </m.a>
          </m.div>
        </m.div>

        {/* Floating decorative particles */}
        {particles.map((p, i) => (
          <m.div
            key={i}
            className={`absolute rounded-full ${p.size} ${p.opacity}`}
            style={{
              top: p.top,
              bottom: p.bottom,
              left: p.left,
              right: p.right,
            }}
            animate={shouldReduceMotion ? undefined : { y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={infiniteTransition(p.duration, p.delay)}
          />
        ))}
      </div>
    </section>
  );
}
