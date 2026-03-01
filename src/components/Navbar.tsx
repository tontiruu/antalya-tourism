'use client';

import { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'ホーム', href: '#hero', section: 'hero' },
  { label: '見どころ', href: '#highlights', section: 'highlights' },
  { label: '体験', href: '#experiences', section: 'experiences' },
  { label: 'スルアダ', href: '#suluada', section: 'suluada' },
  { label: 'ギャラリー', href: '#gallery', section: 'gallery' },
  { label: '旅行情報', href: '#travel-info', section: 'travel-info' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll progress for blur intensity
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
        // Smooth blur transition: 0 at top, 1 at 150px
        setScrollProgress(Math.min(y / 150, 1));
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'highlights', 'experiences', 'suluada', 'gallery', 'travel-info', 'cta', 'footer'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Dynamic blur based on scroll
  const blurValue = Math.round(scrollProgress * 16); // max 16px
  const bgOpacity = scrollProgress * 0.85; // max 85%

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-shadow duration-300"
      style={{
        backgroundColor: scrolled ? `rgba(255, 255, 255, ${bgOpacity})` : 'transparent',
        backdropFilter: scrolled ? `blur(${blurValue}px)` : 'none',
        WebkitBackdropFilter: scrolled ? `blur(${blurValue}px)` : 'none',
        boxShadow: scrolled ? '0 1px 3px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <m.a
            href="#hero"
            className={`font-display text-xl md:text-2xl tracking-widest font-bold transition-colors duration-400 ${
              scrolled ? 'text-ocean-800' : 'text-white'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            ANTALYA
          </m.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.section;
              return (
                <m.a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 py-1 ${
                    scrolled
                      ? isActive
                        ? 'text-ocean-600'
                        : 'text-gray-600 hover:text-ocean-600'
                      : isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  {link.label}
                  {/* Active/hover underline */}
                  <m.span
                    className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full ${
                      scrolled ? 'bg-ocean-500' : 'bg-white'
                    }`}
                    initial={false}
                    animate={{
                      width: isActive ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ display: 'block' }}
                  />
                  {/* Hover underline (only when not active) */}
                  {!isActive && (
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full group-hover:w-full transition-all duration-300 ${
                        scrolled ? 'bg-ocean-500' : 'bg-white'
                      }`}
                    />
                  )}
                </m.a>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-label="メニューを開く"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <m.span
              className={`block w-6 h-0.5 rounded transition-colors duration-300 ${
                scrolled ? 'bg-gray-800' : 'bg-white'
              }`}
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <m.span
              className={`block w-6 h-0.5 rounded transition-colors duration-300 ${
                scrolled ? 'bg-gray-800' : 'bg-white'
              }`}
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className={`block w-6 h-0.5 rounded transition-colors duration-300 ${
                scrolled ? 'bg-gray-800' : 'bg-white'
              }`}
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.section;
                return (
                  <m.a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block py-3 px-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-ocean-600 bg-ocean-50'
                        : 'text-gray-700 hover:text-ocean-600 hover:bg-ocean-50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-ocean-500" />
                      )}
                      {link.label}
                    </span>
                  </m.a>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
