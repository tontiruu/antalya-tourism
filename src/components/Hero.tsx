"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* ─── floating particle data ─── */
const particles = [
  { top: "8%", left: "12%", size: "w-2 h-2", color: "bg-amber-300/40", dur: 6, delay: 0 },
  { top: "15%", right: "18%", size: "w-1.5 h-1.5", color: "bg-white/30", dur: 5, delay: 1 },
  { top: "25%", left: "5%", size: "w-1 h-1", color: "bg-cyan-200/40", dur: 7, delay: 2 },
  { top: "35%", right: "8%", size: "w-2.5 h-2.5", color: "bg-amber-200/25", dur: 8, delay: 0.5 },
  { top: "55%", left: "22%", size: "w-1.5 h-1.5", color: "bg-teal-300/30", dur: 9, delay: 1.5 },
  { top: "45%", right: "30%", size: "w-1 h-1", color: "bg-white/20", dur: 6.5, delay: 3 },
  { top: "70%", left: "35%", size: "w-2 h-2", color: "bg-cyan-300/25", dur: 7.5, delay: 0.8 },
  { top: "20%", right: "40%", size: "w-1 h-1", color: "bg-amber-100/30", dur: 5.5, delay: 2.5 },
  { top: "80%", left: "8%", size: "w-1.5 h-1.5", color: "bg-teal-200/25", dur: 10, delay: 1.2 },
  { top: "60%", right: "12%", size: "w-1 h-1", color: "bg-white/25", dur: 8.5, delay: 3.5 },
];

/* ─── title characters (split-text animation) ─── */
const titleChars = "アンタルヤ".split("");

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const inf = (duration: number, delay = 0) =>
    shouldReduceMotion
      ? undefined
      : {
          duration,
          repeat: Infinity,
          ease: "easeInOut" as const,
          ...(delay ? { delay } : {}),
        };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* ──────── Background image + Ken Burns ──────── */}
      <motion.div
        className="absolute inset-0"
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.15] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }
        }
      >
        <Image
          src="/images/antalya-hero.jpg"
          alt="Cinematic coastline of Antalya"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* ──────── Gradient overlays (3-band) ──────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-transparent to-amber-900/20" />

      {/* ──────── Aurora glow overlays ──────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyan top-left */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full bg-cyan-400/8 blur-[120px]"
          animate={shouldReduceMotion ? undefined : { x: [0, 100, 0], y: [0, 60, 0], scale: [1, 1.25, 1] }}
          transition={inf(14)}
        />
        {/* Teal center */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[60%] h-[60%] rounded-full bg-teal-300/6 blur-[100px]"
          animate={shouldReduceMotion ? undefined : { x: [0, -50, 0], y: [0, 70, 0], scale: [1, 1.15, 1] }}
          transition={inf(18, 2)}
        />
        {/* Amber bottom-right */}
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[75%] h-[75%] rounded-full bg-amber-400/6 blur-[120px]"
          animate={shouldReduceMotion ? undefined : { x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={inf(16, 1)}
        />
        {/* Subtle cyan accent */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-[40%] h-[40%] rounded-full bg-cyan-200/5 blur-[80px]"
          animate={shouldReduceMotion ? undefined : { x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
          transition={inf(20, 3)}
        />
      </div>

      {/* ──────── Floating particles ──────── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color}`}
          style={{ top: p.top, left: p.left, right: p.right }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -(12 + i * 3), 0],
                  opacity: [0.4, 1, 0.4],
                }
          }
          transition={inf(p.dur, p.delay)}
        />
      ))}

      {/* ──────── Main content ──────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center">
        <div className="flex flex-col items-center">
          {/* Label: TURKISH RIVIERA - letter-spacing reveal */}
          <motion.span
            className="text-sm tracking-[0.3em] text-amber-300 uppercase font-medium mb-6 inline-block"
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            TURKISH RIVIERA
          </motion.span>

          {/* Main title: split-text character reveal */}
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display text-white font-bold leading-tight mb-4 text-shadow-lg overflow-hidden">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.6 + i * 0.08,
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          >
            地中海に輝くトルコの宝石
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-20 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.4 }}
          />

          {/* Description */}
          <motion.p
            className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
          >
            紺碧の海、古代遺跡、美しいビーチが広がるトルコ南部の楽園。
            <br className="hidden sm:block" />
            アンタルヤで忘れられない旅を。
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
          >
            {/* Primary: gradient + glow + pulsating ring */}
            <a
              href="#highlights"
              className="group relative inline-flex items-center justify-center"
            >
              {/* Pulsating outer ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500" />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={inf(2.5)}
              />
              <span className="relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95">
                冒険を始める
              </span>
            </a>

            {/* Secondary: glassmorphism */}
            <a
              href="#experiences"
              className="backdrop-blur-md bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 active:scale-95"
            >
              詳しく見る
            </a>
          </motion.div>
        </div>

        {/* ──────── Scroll indicator (mouse shape + bounce) ──────── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-light">
            Scroll to explore
          </span>
          {/* Mouse shape */}
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={inf(2)}
          >
            <motion.div
              className="w-1 h-2.5 rounded-full bg-white/60"
              animate={shouldReduceMotion ? undefined : { y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={inf(2)}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ──────── Bottom wave divider ──────── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-[60px] md:h-[80px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,70 L1440,120 L0,120 Z"
            fill="white"
          />
          <path
            d="M0,90 C320,110 640,50 960,90 C1120,105 1320,70 1440,80 L1440,120 L0,120 Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
