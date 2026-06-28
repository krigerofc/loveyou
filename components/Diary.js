'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DiaryCover from './DiaryCover';
import DiaryPage from './DiaryPage';
import DiaryGallery from './DiaryGallery';
import Navigation from './Navigation';
import FloatingHearts from './FloatingHearts';
import RibbonBookmark from './RibbonBookmark';
import PetalBurst from './PetalBurst';

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
  const touchStartY = useRef(null);

  // bursts de pétalas (easter egg do long-press)
  const [bursts, setBursts] = useState([]);
  const burstId = useRef(0);
  const pressTimer = useRef(null);
  const pressOrigin = useRef(null);
  const bookRef = useRef(null);

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

  function spawnBurst(clientX, clientY) {
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const id = ++burstId.current;
    setBursts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 2400);
  }

  function clearPress() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    pressOrigin.current = null;
  }

  // Swipe + long-press para easter egg de pétalas.
  function onTouchStart(e) {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    // só dispara easter egg fora da capa
    if (index > 0) {
      pressOrigin.current = { x: t.clientX, y: t.clientY };
      pressTimer.current = setTimeout(() => {
        spawnBurst(pressOrigin.current.x, pressOrigin.current.y);
        pressTimer.current = null;
      }, 520);
    }
  }

  function onTouchMove(e) {
    if (!pressOrigin.current) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - pressOrigin.current.x);
    const dy = Math.abs(t.clientY - pressOrigin.current.y);
    if (dx > 8 || dy > 8) clearPress();
  }

  function onTouchEnd(e) {
    clearPress();
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    touchStartX.current = null;
    touchStartY.current = null;
  }

  // Long-press com mouse também (desktop).
  function onMouseDown(e) {
    if (index <= 0) return;
    pressOrigin.current = { x: e.clientX, y: e.clientY };
    pressTimer.current = setTimeout(() => {
      spawnBurst(pressOrigin.current.x, pressOrigin.current.y);
      pressTimer.current = null;
    }, 520);
  }

  function onMouseMove(e) {
    if (!pressOrigin.current) return;
    const dx = Math.abs(e.clientX - pressOrigin.current.x);
    const dy = Math.abs(e.clientY - pressOrigin.current.y);
    if (dx > 8 || dy > 8) clearPress();
  }

  const page = pages[index];
  if (!page) return null;

  const pageLabel = page.kicker ?? page.title ?? `Página ${index + 1}`;
  const isFinale = page.type === 'finale';

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
        ref={bookRef}
        className="diary-book relative h-[100svh] w-full max-w-[440px] overflow-hidden bg-paper shadow-sheet sm:h-[88svh] sm:rounded-2xl"
        style={{ perspective: '1400px' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={clearPress}
        onMouseLeave={clearPress}
      >
        <FloatingHearts count={9} />
        <RibbonBookmark index={index} total={total} />

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
              <DiaryCover page={page} onOpen={next} />
            ) : page.type === 'gallery' ? (
              <DiaryGallery page={page} />
            ) : (
              <DiaryPage
                page={page}
                onRestart={() => goTo(0)}
                isFirstContentPage={index === 1}
                swipeHint={index === 1 ? hint : ''}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* pétalas dos easter eggs (long-press) */}
        {bursts.map((b) => (
          <PetalBurst key={b.id} x={b.x} y={b.y} />
        ))}

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
