'use client';

import { animate, createScope, stagger } from 'animejs';
import { useEffect } from 'react';

export function LandingMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.landing-page');
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scope: ReturnType<typeof createScope> | undefined;
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      scope?.revert();
      if (preference.matches) return;
      scope = createScope({ root }).add(() => {
        // Sequence the proposition and CTA; keep text visible before JS loads.
        animate('[data-hero]', {
          y: [18, 0],
          opacity: [0.3, 1],
          delay: stagger(85),
          duration: 700,
          ease: 'out(3)',
        });
        animate('[data-hero-visual]', {
          y: [26, 0],
          scale: [0.98, 1],
          opacity: [0.4, 1],
          duration: 950,
          ease: 'out(3)',
        });
      });
      // Content is never hidden while awaiting a scroll trigger.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            scope?.add(() => {
              animate(entry.target, {
                y: [22, 0],
                opacity: [0.5, 1],
                duration: 650,
                ease: 'out(3)',
              });
            });
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.08 },
      );
      root
        .querySelectorAll('[data-reveal]')
        .forEach((element) => observer?.observe(element));
    };
    setup();
    preference.addEventListener('change', setup);
    return () => {
      preference.removeEventListener('change', setup);
      observer?.disconnect();
      scope?.revert();
    };
  }, []);
  return null;
}
