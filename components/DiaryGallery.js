'use client';

import { motion } from 'framer-motion';
import Polaroid from './Polaroid';

const reveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Página galeria: 3 entradas em layout alternado (foto-esquerda/msg-direita
 * e msg-esquerda/foto-direita). Mobile-first, polaroides pequenos.
 */
export default function DiaryGallery({ page }) {
  const entries = page.entries ?? [];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="paper-bg grain absolute inset-0" />
      <div className="diary-lines pointer-events-none absolute inset-0 opacity-70" />

      <motion.div
        variants={reveal}
        initial="hidden"
        animate="show"
        className="fancy-scroll relative z-10 flex h-full flex-col overflow-y-auto px-5 pb-28 pt-10"
      >
        <motion.p
          variants={child}
          className="flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.34em] text-sepia/80"
        >
          <span className="text-rose/70">❦</span>
          {page.kicker}
        </motion.p>

        <motion.h2
          variants={child}
          className="mt-2 font-display text-4xl font-semibold text-ink"
        >
          {page.title}
        </motion.h2>

        <motion.span
          variants={child}
          className="mt-3 block h-px w-16 bg-sepia/40"
        />

        <div className="mt-6 flex flex-col gap-8">
          {entries.map((entry, i) => {
            const photoLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                variants={child}
                className={`flex items-center gap-3 ${photoLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* polaroide pequeno, largura fixa */}
                <div className="w-[148px] shrink-0">
                  <Polaroid
                    src={entry.photo.src}
                    alt={entry.photo.alt}
                    caption={entry.photo.caption}
                    rotate={entry.photo.rotate}
                    small
                  />
                </div>

                {/* mensagem manuscrita */}
                <div className={`flex-1 ${photoLeft ? 'text-left' : 'text-right'}`}>
                  <p className="font-hand text-[1.2rem] leading-snug text-ink/85">
                    {entry.message}
                  </p>
                  {entry.date ? (
                    <span className="mt-1 block font-hand text-sm text-sepia/70">
                      {entry.date}
                    </span>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
