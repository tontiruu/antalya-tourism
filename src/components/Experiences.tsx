"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { m, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { luxuryEase } from "@/lib/animations";
import expDivingHq from "../../public/images/exp-diving-hq.jpg";
import expDiving from "../../public/images/exp-diving.jpg";
import expCruiseHq from "../../public/images/exp-cruise-hq.jpg";
import expGuletCruise from "../../public/images/exp-gulet-cruise.jpg";
import expParaglidingHq from "../../public/images/exp-paragliding-hq.jpg";
import expParagliding from "../../public/images/exp-paragliding.jpg";
import expFoodHq from "../../public/images/exp-food-hq.jpg";
import expTurkishFood from "../../public/images/exp-turkish-food.jpg";

const experiences = [
  {
    number: "01",
    title: "ダイビング & シュノーケリング",
    subtitle: "Diving & Snorkeling",
    description:
      "透明度抜群の地中海で、色とりどりの海洋生物と古代の沈没船を探検。",
    detail: "水温: 夏季25-28°C",
    gradientBg: "from-ocean-500 via-ocean-400 to-cyan-300",
    image: expDivingHq,
    fallbackImage: expDiving,
  },
  {
    number: "02",
    title: "グレットツアー（遊覧船）",
    subtitle: "Gulet Cruise Tour",
    description:
      "伝統的なトルコの木造船で、隠れたビーチや洞窟を巡る一日クルーズ。",
    detail: "所要時間: 約6時間",
    gradientBg: "from-sunset-400 via-sunset-300 to-sand-300",
    image: expCruiseHq,
    fallbackImage: expGuletCruise,
  },
  {
    number: "03",
    title: "パラグライダー",
    subtitle: "Paragliding",
    description:
      "オリンポス山から飛び立ち、地中海の絶景を空から一望。一生忘れられない体験。",
    detail: "高度: 約1,900m",
    gradientBg: "from-cyan-400 via-ocean-300 to-sky-200",
    image: expParaglidingHq,
    fallbackImage: expParagliding,
  },
  {
    number: "04",
    title: "トルコ料理体験",
    subtitle: "Turkish Cooking Class",
    description:
      "地元シェフと一緒にケバブやバクラヴァを作る。五感で楽しむトルコの食文化。",
    detail: "所要時間: 約3時間",
    gradientBg: "from-sand-400 via-sunset-300 to-orange-200",
    image: expFoodHq,
    fallbackImage: expTurkishFood,
  },
];

/* ── Per-experience item with parallax + reveal animations ── */
function ExperienceItem({
  item,
  index,
}: {
  item: (typeof experiences)[number];
  index: number;
}) {
  const isEven = index % 2 === 1;
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<StaticImageData>(item.image);
  const shouldReduceMotion = useReducedMotion();
  const isImageInView = useInView(imageRef, { once: true, margin: "0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Parallax transforms – zero when reduced motion */
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-8%", "8%"]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["5%", "-5%"]
  );
  const numberY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["12%", "-12%"]
  );
  const connectorScaleY = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.15, 1, 1, 0.15]
  );

  /* clipPath reveal – instant when reduced motion */
  const clipFrom = shouldReduceMotion
    ? "inset(0% 0% 0% 0%)"
    : isEven
      ? "inset(0% 0% 0% 100%)"
      : "inset(0% 100% 0% 0%)";
  const clipTo = "inset(0% 0% 0% 0%)";

  /* Transition helper – duration: 0 when reduced motion */
  const dur = (d: number, delay = 0) =>
    shouldReduceMotion
      ? { duration: 0, delay: 0 }
      : { duration: d, ease: luxuryEase, delay };

  return (
    <div ref={ref} className="relative">
      {/* Vertical connector line – scroll-driven scaleY growth */}
      {index < experiences.length - 1 && (
        <m.div
          className="hidden lg:block absolute left-1/2 -translate-x-px bottom-0 translate-y-full h-40 w-px bg-gradient-to-b from-ocean-200/60 to-transparent origin-top"
          style={{ scaleY: connectorScaleY }}
        />
      )}

      <m.div
        className={`flex flex-col ${
          isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-12 lg:gap-20`}
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.4, ease: luxuryEase }}
      >
        {/* ── Visual Area (60%) ── */}
        <div className="w-full lg:w-[60%]">
          <div className="relative group">
            {/* Image reveal container – clipPath animation */}
            <m.div
              ref={imageRef}
              className="relative aspect-[3/2] rounded-2xl overflow-hidden"
              initial={
                shouldReduceMotion
                  ? { clipPath: "inset(0% 0% 0% 0%)" }
                  : { clipPath: clipFrom }
              }
              animate={
                shouldReduceMotion || isImageInView
                  ? { clipPath: clipTo }
                  : { clipPath: clipFrom }
              }
              transition={dur(1.0)}
            >
              {/* Main image with parallax */}
              <m.div
                className="absolute inset-0"
                style={{ y: imageY }}
              >
                <div className="absolute inset-[-16%] w-[132%] h-[132%]">
                  <Image
                    src={imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    placeholder="blur"
                    onError={() => {
                      if (imageSrc !== item.fallbackImage) {
                        setImageSrc(item.fallbackImage);
                      }
                    }}
                  />
                </div>
              </m.div>

              {/* Subtle bottom gradient – readability only */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent z-10" />

              {/* Large Decorative Number with parallax */}
              <m.div
                className={`absolute ${
                  isEven ? "left-6" : "right-6"
                } bottom-4 z-10`}
                style={{ y: numberY }}
              >
                <span className="text-[100px] font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/25 to-transparent select-none leading-none">
                  {item.number}
                </span>
              </m.div>
            </m.div>

            {/* Shadow accent – stronger glow on hover */}
            <div
              className={`absolute -z-10 inset-4 rounded-2xl bg-gradient-to-br ${item.gradientBg} opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500`}
            />
          </div>
        </div>

        {/* ── Content Area (40%) – opposite parallax ── */}
        <m.div
          className="w-full lg:w-[40%]"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className={`${isEven ? "lg:pr-4" : "lg:pl-4"}`}>
            {/* Number – slide in from left */}
            <m.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={dur(0.8)}
              className="text-[100px] font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-ocean-200 to-transparent leading-none block mb-2"
            >
              {item.number}
              <span className="inline-block w-2 h-2 rounded-full bg-ocean-400 ml-1 align-top mt-6" />
            </m.span>

            {/* Subtitle – slide in from left + fade */}
            <m.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={dur(0.6, 0.1)}
              className="text-ocean-600 font-body text-xs tracking-[0.15em] uppercase mb-2"
            >
              {item.subtitle}
            </m.p>

            {/* Title – fade up */}
            <m.h3
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={dur(0.6, 0.15)}
              className="font-display text-2xl md:text-3xl text-gray-900 mb-4"
            >
              {item.title}
            </m.h3>

            {/* Description – fade + blur reveal (GPU optimised) */}
            <m.p
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={dur(0.7, 0.2)}
              className="text-gray-600 font-body text-base leading-relaxed mb-6"
              style={{ willChange: "filter, opacity" }}
            >
              {item.description}
            </m.p>

            {/* Detail Badge – scale in */}
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={dur(0.5, 0.3)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-50 border border-ocean-100"
            >
              <svg
                className="w-4 h-4 text-ocean-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <span className="text-ocean-700 font-body text-sm font-medium">
                {item.detail}
              </span>
            </m.div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

/* ── Main Section ── */
export default function Experiences() {
  return (
    <section id="experiences" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeader
            subtitle="Unforgettable Experiences"
            title="忘れられない体験"
            gradientClass="from-sunset-400 to-ocean-500"
            className="mb-24"
          />
        </m.div>

        {/* Experiences List */}
        <div className="space-y-40">
          {experiences.map((item, index) => (
            <ExperienceItem key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
