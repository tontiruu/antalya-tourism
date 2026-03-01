"use client";

import { useRef } from "react";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import Image from "next/image";
import {
  luxuryEase,
  trackingExpandVariants,
  charStaggerContainerVariants,
  charStaggerItemVariants,
} from "@/lib/animations";
import highlightKaleici from "../../public/images/highlight-kaleici.jpg";
import galleryDudenFalls from "../../public/images/gallery-duden-falls.jpg";
import highlightKonyaalti from "../../public/images/highlight-konyaalti.jpg";
import galleryAspendos from "../../public/images/gallery-aspendos.jpg";
import highlightMuseum from "../../public/images/highlight-museum.jpg";
import highlightHadrian from "../../public/images/highlight-hadrian.jpg";
import suluadaHeroImg from "../../public/images/suluada-hero.jpg";

const highlights = [
  {
    number: "01",
    title: "カレイチ旧市街",
    subtitle: "Kaleiçi Old Town",
    description:
      "オスマン帝国時代の美しい街並みが残る歴史地区。石畳の路地を歩けば、タイムスリップしたような感覚に。",
    image: highlightKaleici,
  },
  {
    number: "02",
    title: "デュデンの滝",
    subtitle: "Düden Waterfalls",
    description:
      "地中海に直接流れ落ちる壮大な滝。海から眺めるボートツアーは圧巻の一言。",
    image: galleryDudenFalls,
  },
  {
    number: "03",
    title: "コンヤアルトゥビーチ",
    subtitle: "Konyaaltı Beach",
    description:
      "山と海が出会う全長7kmの美しいビーチ。透き通る地中海の青が広がります。",
    image: highlightKonyaalti,
  },
  {
    number: "04",
    title: "アスペンドス劇場",
    subtitle: "Aspendos Theatre",
    description:
      "2000年以上前に建てられた世界最高保存状態のローマ劇場。今もコンサートに使われています。",
    image: galleryAspendos,
  },
  {
    number: "05",
    title: "アンタルヤ博物館",
    subtitle: "Antalya Museum",
    description:
      "地中海地域最大級の考古学博物館。古代ギリシャ・ローマの至宝が眠る。",
    image: highlightMuseum,
  },
  {
    number: "06",
    title: "ハドリアヌスの門",
    subtitle: "Hadrian's Gate",
    description:
      "西暦130年に建てられた壮麗な凱旋門。旧市街への歴史的な入り口。",
    image: highlightHadrian,
  },
  {
    number: "07",
    title: "スルアダ島",
    subtitle: "Suluada Island",
    description:
      "トルコのモルディブと呼ばれる秘境の島。信じられないほど透き通った海が広がり、海底まで見渡せる。",
    image: suluadaHeroImg,
  },
];

/* ═══════════════════════════════════════════════════
   HighlightItem — individual photo + text block
   ═══════════════════════════════════════════════════ */
function HighlightItem({
  item,
  index,
}: {
  item: (typeof highlights)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isPhotoInView = useInView(photoRef, { once: true, margin: "0px" });
  const isTextInView = useInView(textRef, { once: true, margin: "-50px" });

  /* Parallax — disabled when reduced motion is preferred */
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-10%", "10%"],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["5%", "-5%"],
  );

  // Layout direction
  const isReversed = index % 2 === 1;
  const bgClass = isReversed ? "bg-ocean-50/30" : "bg-white";

  /* Reduced-motion helper: skip to "visible" state immediately */
  const motionInit = shouldReduceMotion ? "visible" : "hidden";
  const instantTransition = { duration: 0 };

  return (
    <div ref={ref} className={`${bgClass} transition-colors duration-700`}>
      <div
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center`}
      >
        {/* ── Photo Area — 55% with clipPath reveal ── */}
        <m.div
          ref={photoRef}
          initial={
            shouldReduceMotion
              ? { clipPath: "inset(0% 0% 0% 0%)" }
              : {
                  clipPath: isReversed
                    ? "inset(0% 100% 0% 0%)"
                    : "inset(0% 0% 0% 100%)",
                }
          }
          animate={
            shouldReduceMotion || isPhotoInView
              ? { clipPath: "inset(0% 0% 0% 0%)" }
              : {
                  clipPath: isReversed
                    ? "inset(0% 100% 0% 0%)"
                    : "inset(0% 0% 0% 100%)",
                }
          }
          transition={{ duration: 1.2, ease: luxuryEase }}
          className="w-full lg:w-[55%] relative overflow-hidden min-h-[400px] lg:min-h-[70vh] group"
        >
          {/* Parallax photo layer */}
          <m.div
            style={{ y: photoY }}
            className="absolute -top-[15%] left-0 w-full h-[130%]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
              placeholder="blur"
            />
          </m.div>

          {/* Gradient overlay — deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent group-hover:from-black/30 transition-all duration-700 pointer-events-none" />

          {/* Large number — delayed fade-up after photo reveals */}
          <m.span
            initial={
              shouldReduceMotion
                ? { opacity: 0.1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            animate={
              shouldReduceMotion || isPhotoInView
                ? { opacity: 0.1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="absolute bottom-4 right-6 text-[150px] font-display font-bold text-white select-none leading-none pointer-events-none"
          >
            {item.number}
          </m.span>
        </m.div>

        {/* ── Text Area — 45% with counter-parallax ── */}
        <m.div
          ref={textRef}
          style={{ y: textY }}
          className="w-full lg:w-[45%] px-8 py-12 lg:px-16 lg:py-16"
        >
          {/* English subtitle — tracking expansion + slide */}
          <m.span
            variants={trackingExpandVariants}
            initial={motionInit}
            animate={shouldReduceMotion || isTextInView ? "visible" : "hidden"}
            className="text-sm text-ocean-500 uppercase block"
          >
            {item.subtitle}
          </m.span>

          {/* Japanese title — clipPath reveal from bottom */}
          <m.h3
            initial={
              shouldReduceMotion
                ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
            }
            animate={
              shouldReduceMotion || isTextInView
                ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
            }
            transition={
              shouldReduceMotion
                ? instantTransition
                : { duration: 0.8, ease: luxuryEase, delay: 0.15 }
            }
            className="font-display text-3xl md:text-4xl text-gray-900 mt-2 mb-4"
          >
            {item.title}
          </m.h3>

          {/* Accent divider — scale-in + shimmer sweep */}
          <div className="relative w-12 h-0.5 mb-6 overflow-hidden">
            {/* Divider bar */}
            <m.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={
                shouldReduceMotion || isTextInView
                  ? { scaleX: 1 }
                  : { scaleX: 0 }
              }
              transition={
                shouldReduceMotion
                  ? instantTransition
                  : { duration: 0.6, ease: luxuryEase, delay: 0.25 }
              }
              className="absolute inset-0 bg-gradient-to-r from-ocean-400 to-cyan-300 origin-left"
            />
            {/* Shimmer light — only rendered when motion is enabled */}
            {!shouldReduceMotion && (
              <m.div
                initial={{ x: "-100%" }}
                animate={isTextInView ? { x: "300%" } : { x: "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.9 }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
            )}
          </div>

          {/* Description — blur dissolve fade-in */}
          <m.p
            initial={
              shouldReduceMotion
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            animate={
              shouldReduceMotion || isTextInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={
              shouldReduceMotion
                ? instantTransition
                : { duration: 0.8, ease: "easeOut", delay: 0.4 }
            }
            style={
              shouldReduceMotion ? undefined : { willChange: "filter, opacity" }
            }
            className="text-gray-600 text-base leading-relaxed font-body"
          >
            {item.description}
          </m.p>
        </m.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Highlights Section
   ═══════════════════════════════════════════════════ */
export default function Highlights() {
  const shouldReduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  /* Reduced-motion helper */
  const motionInit = shouldReduceMotion ? "visible" : "hidden";
  const instantTransition = { duration: 0 };

  return (
    <section id="highlights">
      {/* ── Section Header ── */}
      <div ref={headerRef} className="text-center py-20 bg-white">
        {/* English subtitle — tracking expansion */}
        <m.p
          initial={
            shouldReduceMotion
              ? { opacity: 1, letterSpacing: "0.3em" }
              : { opacity: 0, letterSpacing: "0.1em" }
          }
          animate={
            shouldReduceMotion || isHeaderInView
              ? { opacity: 1, letterSpacing: "0.3em" }
              : { opacity: 0, letterSpacing: "0.1em" }
          }
          transition={
            shouldReduceMotion
              ? instantTransition
              : { duration: 0.8, ease: luxuryEase }
          }
          className="text-sm text-ocean-500 uppercase mb-4"
        >
          Discover the Wonders
        </m.p>

        {/* Japanese title — character-by-character stagger reveal */}
        <m.h2
          variants={charStaggerContainerVariants}
          initial={motionInit}
          animate={
            shouldReduceMotion || isHeaderInView ? "visible" : "hidden"
          }
          className="font-display text-4xl md:text-5xl text-gray-900 font-bold"
        >
          {"アンタルヤの見どころ".split("").map((char, i) => (
            <m.span
              key={i}
              variants={charStaggerItemVariants}
              className="inline-block"
            >
              {char}
            </m.span>
          ))}
        </m.h2>
      </div>

      {/* ── Full-bleed photo showcase ── */}
      {highlights.map((item, index) => (
        <HighlightItem key={item.number} item={item} index={index} />
      ))}
    </section>
  );
}
