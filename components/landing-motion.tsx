'use client';

import { animate, createScope, stagger } from 'animejs';
import { useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
import { setMotionEnabled, useMotionEnabled } from '@/lib/motion-preference';

export function LandingMotion() {
  const enabled = useMotionEnabled();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.landing-page');
    if (!root) return;
    root.dataset.motion = enabled ? 'on' : 'off';
    if (!enabled) return;

    let revealObserver: IntersectionObserver;
    let heroObserver: IntersectionObserver;
    const scope = createScope({ root }).add(() => {
      // A more legible entrance, followed by motion on the product preview.
      animate('[data-hero]', {
        y: [44, 0],
        opacity: [0, 1],
        delay: stagger(140, { start: 120 }),
        duration: 1050,
        ease: 'out(3)',
      });
      animate('[data-hero-visual]', {
        y: [50, 0],
        rotate: [3, 0],
        scale: [0.92, 1],
        opacity: [0, 1],
        delay: 250,
        duration: 1200,
        ease: 'out(3)',
      });

      const preview = animate('.hero-screen', {
        y: [0, -10],
        duration: 2400,
        alternate: true,
        loop: true,
        ease: 'inOut(2)',
        autoplay: false,
      });
      heroObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) preview.resume();
        else preview.pause();
      });
      const hero = root.querySelector('[data-hero-visual]');
      if (hero) heroObserver.observe(hero);

      // Set up only after hydration; without JS or with motion off, everything stays visible.
      const reveals = new Map<Element, ReturnType<typeof animate>>();
      root.querySelectorAll('[data-reveal]').forEach((element) => {
        reveals.set(
          element,
          animate(element, {
            y: [48, 0],
            opacity: [0, 1],
            duration: 950,
            ease: 'out(3)',
            autoplay: false,
          }),
        );
      });
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveals.get(entry.target)?.play();
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
      );
      reveals.forEach((_animation, element) => revealObserver.observe(element));
    });
    return () => {
      revealObserver?.disconnect();
      heroObserver?.disconnect();
      scope.revert();
      delete root.dataset.motion;
    };
  }, [enabled]);
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={enabled}
      onClick={() => setMotionEnabled(!enabled)}
      title="Controle de movimento desta página. A preferência do sistema é respeitada até você escolher."
    >
      {enabled ? (
        <Pause size={15} aria-hidden="true" />
      ) : (
        <Play size={15} aria-hidden="true" />
      )}
      {enabled ? 'Pausar animações' : 'Ativar animações'}
    </button>
  );
}
