'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';

const seasons = [
  {
    name: '春',
    months: '4-5月',
    temp: '20-25°C',
    tempValue: 25,
    description: '花が咲き乱れ、観光に最適。',
    barColor: 'from-green-400 to-emerald-500',
    level: 50,
  },
  {
    name: '夏',
    months: '6-9月',
    temp: '30-35°C',
    tempValue: 35,
    description: 'ビーチシーズン。海水浴やダイビングに最適。',
    barColor: 'from-orange-400 to-red-500',
    level: 85,
  },
  {
    name: '秋',
    months: '10-11月',
    temp: '20-28°C',
    tempValue: 28,
    description: '穏やかな気候でゆっくり観光。',
    barColor: 'from-amber-400 to-orange-500',
    level: 55,
  },
  {
    name: '冬',
    months: '12-3月',
    temp: '10-15°C',
    tempValue: 15,
    description: 'オフシーズンで混雑なし。',
    barColor: 'from-blue-400 to-cyan-500',
    level: 25,
  },
];

const accessInfo = [
  {
    label: '飛行機',
    detail: 'アンタルヤ空港（AYT）',
    sub: 'イスタンブールから約1時間',
  },
  {
    label: '日本から',
    detail: '成田/羽田 → イスタンブール → アンタルヤ',
    sub: '約15-17時間',
  },
  {
    label: '市内交通',
    detail: 'トラム、バス、タクシーが充実',
    sub: '観光にも便利な公共交通',
  },
];

const basicInfo = [
  { label: '通貨', value: 'トルコリラ (TRY)' },
  { label: '言語', value: 'トルコ語（観光地では英語OK）' },
  { label: '時差', value: '日本より -6時間' },
  { label: 'ビザ', value: '90日以内の観光はビザ不要' },
];

const columnVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  }),
};

const barVariants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
      delay: 0.3,
    },
  }),
};

const cardAccents: Record<number, string> = {
  0: 'from-sunset-400 to-amber-400',
  1: 'from-ocean-400 to-cyan-400',
  2: 'from-ocean-500 to-ocean-600',
};

/* Animated temperature counter */
function AnimatedTemp({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * end);
      setDisplay(start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [value, inView]);

  return <>{display}</>;
}

/* SVG icon components */
function SunIcon() {
  return (
    <svg className="w-8 h-8 text-sunset-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg className="w-8 h-8 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-8 h-8 text-ocean-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

/* Shimmer bar overlay */
function ShimmerOverlay() {
  return (
    <div
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </div>
  );
}

export default function TravelInfo() {
  const shouldReduceMotion = useReducedMotion();
  const [seasonInView, setSeasonInView] = useState(false);
  const seasonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!seasonRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeasonInView(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(seasonRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="travel-info" className="py-24 bg-amber-50/60 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 right-0 w-80 h-80 bg-sunset-200/35 rounded-full blur-[100px]"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-0 w-72 h-72 bg-ocean-200/25 rounded-full blur-[100px]"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={shouldReduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeader
            subtitle="Plan Your Journey"
            title="旅の準備"
          />
        </motion.div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Column 1: Best Season */}
          <motion.div
            custom={0}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-500 relative overflow-hidden"
          >
            {/* Top accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardAccents[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sunset-100 to-amber-100">
                <SunIcon />
              </div>
              <div>
                <h3 className="font-display text-xl text-gray-900">ベストシーズン</h3>
                <p className="text-gray-500 text-xs tracking-wider">Best Season</p>
              </div>
            </div>

            <div ref={seasonRef} className="space-y-5">
              {seasons.map((season) => (
                <motion.div
                  key={season.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-1.5"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-base text-gray-900">{season.name}</span>
                      <span className="text-gray-400 text-xs">{season.months}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 tabular-nums">
                      <AnimatedTemp value={season.tempValue} inView={seasonInView} />
                      °C
                    </span>
                  </div>

                  {/* Temperature bar with shimmer */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                    <motion.div
                      custom={season.level}
                      variants={barVariants}
                      className={`h-full bg-gradient-to-r ${season.barColor} rounded-full relative`}
                    >
                      <ShimmerOverlay />
                    </motion.div>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed">{season.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Access */}
          <motion.div
            custom={1}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-500 relative overflow-hidden"
          >
            {/* Top accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardAccents[1]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-100 to-cyan-100">
                <PlaneIcon />
              </div>
              <div>
                <h3 className="font-display text-xl text-gray-900">アクセス</h3>
                <p className="text-gray-500 text-xs tracking-wider">Access</p>
              </div>
            </div>

            <div className="space-y-5">
              {accessInfo.map((item, i) => (
                <div key={item.label} className="relative pl-5">
                  {/* Timeline dot and line */}
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600" />
                  {i < accessInfo.length - 1 && (
                    <div className="absolute left-[4.5px] top-4 w-px h-[calc(100%+8px)] bg-ocean-200" />
                  )}

                  <div>
                    <span className="inline-block text-xs font-medium text-ocean-600 bg-ocean-50 px-2 py-0.5 rounded-full mb-1.5">
                      {item.label}
                    </span>
                    <p className="text-gray-900 text-sm font-medium">{item.detail}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Map Pin */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-xs">
                  Antalya, Turkiye &mdash; 36.8969°N, 30.7133°E
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Basic Info */}
          <motion.div
            custom={2}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-500 relative overflow-hidden"
          >
            {/* Top accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardAccents[2]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-100 to-ocean-200">
                <InfoIcon />
              </div>
              <div>
                <h3 className="font-display text-xl text-gray-900">基本情報</h3>
                <p className="text-gray-500 text-xs tracking-wider">Basic Info</p>
              </div>
            </div>

            <div className="space-y-4">
              {basicInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider w-12 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Tip card with left color bar */}
            <div className="mt-6 p-4 bg-gradient-to-br from-ocean-50 to-cyan-50 rounded-xl border border-ocean-100/50 border-l-4 border-l-ocean-400">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-ocean-500 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
                <div>
                  <p className="text-ocean-800 text-sm font-medium mb-1">Travel Tip</p>
                  <p className="text-ocean-700/80 text-sm leading-relaxed">
                    春と秋は気候が穏やかで観光に最適。夏はビーチ目的なら最高のシーズンです。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
