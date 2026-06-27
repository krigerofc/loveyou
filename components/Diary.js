'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DiaryCover from './DiaryCover';
import DiaryPage from './DiaryPage';
import Navigation from './Navigation';
import FloatingHearts from './FloatingHearts';

const variants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? 70 : -70,
    rotateY: dir >= 0 ? 16 : -16,
  }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? -70 : 70,
    rotateY: dir >= 0 ? -16 : 16,
  }),
};

export default function Diary({ data }) {
  const pages = data?.pages ?? [];
  const total = pages.length;
  const hint = data?.meta?.hint ?? '';

  // [índice atual, direção do movimento] — a direção orienta a animação.
  const [[index, dir], setState] = useState([0, 0]);
  const touchStartX = useRef(null);

  const next = useCallback(() => {
    setState(([cur]) => [Math.min(total - 1, cur + 1), 1]);
  }, [total]);

  const prev = useCallback(() => {
    setState(([cur]) => [Math.max(0, cur - 1), -1]);
  }, []);

  const goTo = useCallback((target) => {
    setState(([cur]) => [
      Math.max(0, Math.min(total - 1, target)),
      target >= cur ? 1 : -1,
    ]);
  }, [total]);

  // Navegação por teclado (setas esquerda/direita).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Swipe no celular.
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    touchStartX.current = null;
  };

  const page = pages[index];
  if (!page) return null;

  const pageLabel = page.kicker ?? page.title ?? `Página ${index + 1}`;

  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center sm:p-6">
      {/* região lida por leitores de tela ao trocar de página */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {pageLabel}
      </div>

      <div
        className="diary-book relative h-[100svh] w-full max-w-[440px] overflow-hidden bg-paper shadow-sheet sm:h-[88svh] sm:rounded-2xl"
        style={{ perspective: '1400px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <FloatingHearts count={9} />

        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {page.type === 'cover' ? (
              <DiaryCover page={page} onOpen={next} hint={hint} />
            ) : (
              <DiaryPage page={page} onRestart={() => goTo(0)} />
            )}
          </motion.div>
        </AnimatePresence>

        {index > 0 ? (
          <Navigation
            index={index}
            total={total}
            onPrev={prev}
            onNext={next}
            onGoto={goTo}
          />
        ) : null}
      </div>
    </main>
  );
}
