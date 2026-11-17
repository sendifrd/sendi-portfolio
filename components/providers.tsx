"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Client-side providers.
 * - LazyMotion + domAnimation loads only the animation features we use
 *   (smaller JS bundle than the full `motion` component).
 * - reducedMotion="user" honours the OS "reduce motion" setting.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
