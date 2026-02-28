'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const footerLinks = {
  spots: {
    title: '観光スポット',
    items: [
      'カレイチ旧市街',
      'デュデンの滝',
      'アスペンドス劇場',
      'コンヤアルトゥビーチ',
      'ハドリアヌスの門',
      'スルアダ島',
    ],
  },
  activities: {
    title: 'アクティビティ',
    items: ['ダイビング', 'ボートツアー', 'パラグライダー', '料理体験', '歴史探訪', 'スルアダツアー'],
  },
  info: {
    title: '旅行情報',
    items: ['アクセス方法', 'ベストシーズン', '通貨・言語', 'ビザ情報', '安全情報'],
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/* Social icons - minimal SVG */
function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Link component with underline hover animation */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative text-white/50 hover:text-amber-400 text-sm transition-colors duration-300 inline-block group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [backToTopHover, setBackToTopHover] = useState(false);

  return (
    <footer id="footer" className="bg-cyan-950 text-white/80 relative overflow-hidden">
      {/* Top gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-900/50 to-transparent pointer-events-none" />

      {/* Subtle aurora glow */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-400/3 blur-[120px] pointer-events-none"
        animate={shouldReduceMotion ? undefined : { opacity: [0.03, 0.06, 0.03], scale: [1, 1.1, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-amber-400/3 blur-[120px] pointer-events-none"
        animate={shouldReduceMotion ? undefined : { opacity: [0.03, 0.05, 0.03], scale: [1, 1.15, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Main footer content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="lg:pr-8">
            <h3 className="font-display text-2xl text-white tracking-widest mb-4">
              ANTALYA
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              トルコ南部の地中海に面した美しいリゾート都市。古代の歴史と現代の楽しみが融合する楽園。
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <TwitterIcon />, label: 'X (Twitter)' },
                { icon: <YouTubeIcon />, label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-white/30 hover:text-amber-400 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Spots */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-5">
              {footerLinks.spots.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.spots.items.map((item) => (
                <li key={item}>
                  <FooterLink href={item === 'スルアダ島' ? '#suluada' : '#highlights'}>
                    {item}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Activities */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-5">
              {footerLinks.activities.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.activities.items.map((item) => (
                <li key={item}>
                  <FooterLink href={item === 'スルアダツアー' ? '#suluada' : '#experiences'}>
                    {item}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Travel Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-5">
              {footerLinks.info.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.info.items.map((item) => (
                <li key={item}>
                  <FooterLink href="#travel-info">
                    {item}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2026 Discover Antalya. All rights reserved.
          </p>

          <p className="text-white/40 text-sm">
            Made with{' '}
            <span className="text-red-400">&hearts;</span> for travelers
          </p>

          {/* Back to top button with bounce animation and tooltip */}
          <div className="relative">
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setBackToTopHover(true)}
              onMouseLeave={() => setBackToTopHover(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              aria-label="Back to top"
            >
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60 group-hover:text-white transition-colors duration-300"
                animate={
                  backToTopHover && !shouldReduceMotion
                    ? { y: [0, -3, 0] }
                    : { y: 0 }
                }
                transition={
                  backToTopHover
                    ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.2 }
                }
              >
                <polyline points="18 15 12 9 6 15" />
              </motion.svg>
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {backToTopHover && (
                <motion.span
                  className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap pointer-events-none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Back to top
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
