'use client';

import { useSyncExternalStore } from 'react';

const preferenceKey = 'saberio-motion';
let override: boolean | null | undefined;

function getSnapshot() {
  if (override === undefined) {
    try {
      const saved = sessionStorage.getItem(preferenceKey);
      override = saved === 'on' ? true : saved === 'off' ? false : null;
    } catch {
      override = null;
    }
  }
  return (
    override ?? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  window.addEventListener(preferenceKey, callback);
  return () => {
    media.removeEventListener('change', callback);
    window.removeEventListener(preferenceKey, callback);
  };
}

export function setMotionEnabled(enabled: boolean) {
  override = enabled;
  try {
    sessionStorage.setItem(preferenceKey, enabled ? 'on' : 'off');
  } catch {
    /* The control also works when storage is unavailable. */
  }
  window.dispatchEvent(new Event(preferenceKey));
}

export function useMotionEnabled() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
