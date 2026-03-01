import { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────
 * useViewportAnimation
 * ─────────────────────────────────────────────────────────
 * Viewport-aware animation gate that pauses infinite / heavy
 * animations while the host element is off-screen.
 *
 * Combines two concerns into a single ergonomic hook:
 *   1. IntersectionObserver  – viewport detection
 *   2. prefers-reduced-motion – accessibility
 *
 * Usage:
 *   const { ref, shouldAnimate } = useViewportAnimation();
 *
 *   <div ref={ref}>
 *     <motion.div
 *       animate={shouldAnimate ? { scale: [1, 1.15] } : undefined}
 *       transition={shouldAnimate ? { duration: 20, repeat: Infinity } : undefined}
 *     />
 *   </div>
 *
 * Returns:
 *   ref                  – attach to the outermost container element
 *   isInView             – true when element intersects the viewport
 *   shouldAnimate        – true when in view AND motion is allowed
 *   prefersReducedMotion – true when the OS / browser requests reduced motion
 * ───────────────────────────────────────────────────────── */

export interface UseViewportAnimationOptions {
  /** Extra margin around the viewport for early activation (default: '100px'). */
  rootMargin?: string;
  /**
   * Visibility ratio required to trigger "in view" (0–1, default: 0).
   * 0 = any pixel visible, 1 = fully visible.
   */
  threshold?: number | number[];
  /** IntersectionObserver root element (default: viewport). */
  root?: Element | null;
}

export interface UseViewportAnimationReturn<T extends HTMLElement> {
  /** Ref to attach to the observed container element. */
  ref: React.RefObject<T | null>;
  /** Whether the element currently intersects the viewport. */
  isInView: boolean;
  /** `true` only when in viewport AND reduced-motion is NOT requested. */
  shouldAnimate: boolean;
  /** `true` when the user's OS / browser prefers reduced motion. */
  prefersReducedMotion: boolean;
}

export function useViewportAnimation<T extends HTMLElement = HTMLDivElement>(
  options?: UseViewportAnimationOptions,
): UseViewportAnimationReturn<T> {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* ── prefers-reduced-motion listener ── */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  /* ── IntersectionObserver for viewport detection ──
   *
   * The observer is created once on mount. `options` is read from a ref
   * so that callers don't need to memoize the options object — the
   * observer configuration is intentionally treated as static because
   * rootMargin / threshold are not expected to change at runtime.
   */
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const opts = optionsRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: opts?.root ?? null,
        rootMargin: opts?.rootMargin ?? '100px',
        threshold: opts?.threshold ?? 0,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- static config via ref

  const shouldAnimate = isInView && !prefersReducedMotion;

  return { ref, isInView, shouldAnimate, prefersReducedMotion };
}
