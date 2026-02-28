"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─── stat data ─── */
interface Stat {
  value: number;
  suffix: string;
  labelEn: string;
  labelJa: string;
}

const stats: Stat[] = [
  { value: 300, suffix: "+", labelEn: "Days of Sunshine", labelJa: "年間晴天日数" },
  { value: 600, suffix: "km", labelEn: "Of Coastline", labelJa: "海岸線" },
  { value: 2000, suffix: "+", labelEn: "Years of History", labelJa: "歴史" },
  { value: 15, suffix: "M+", labelEn: "Annual Visitors", labelJa: "年間観光客数" },
];

/* ─── counter hook ─── */
function useCountUp(target: number, start: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration]);

  return count;
}

/* ─── individual stat display ─── */
function StatItem({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const count = useCountUp(stat.value, inView, shouldReduceMotion ? 0 : 1500);

  return (
    <motion.div
      className="flex flex-col items-center gap-2 px-6 md:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
    >
      <span className="text-5xl md:text-6xl font-display font-bold text-ocean-800 tabular-nums tracking-tight">
        {count.toLocaleString()}
        <span className="text-ocean-500">{stat.suffix}</span>
      </span>
      <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium">
        {stat.labelEn}
      </span>
      <span className="text-sm text-gray-500 font-light">
        {stat.labelJa}
      </span>
    </motion.div>
  );
}

/* ─── main component ─── */
export default function AnimatedCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-white via-ocean-50/40 to-white overflow-hidden"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-ocean-100/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-50/40 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              <StatItem stat={stat} index={i} inView={inView} />
              {/* Vertical divider (not after last item) */}
              {i < stats.length - 1 && (
                <motion.div
                  className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent ml-6 md:ml-10"
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                />
              )}
              {/* Horizontal divider on mobile */}
              {i < stats.length - 1 && (
                <motion.div
                  className="md:hidden w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent absolute"
                  style={{ display: "none" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
