'use client';

import { motion } from 'framer-motion';
import Polaroid from './Polaroid';
import InkHeart from './InkHeart';

const reveal = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const child = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Paragraphs({ text }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}

/**
 * Uma folha do diário. Trata os tipos "text", "photo" e "finale".
 * O fundo de papel e a pauta ficam numa camada fixa; o conteúdo rola
 * por cima caso passe da altura da tela.
 */
export default function DiaryPage({ page, onRestart }) {
  const isFinale = page.type === 'finale';

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="paper-bg grain absolute inset-0" />
      <div className="diary-lines pointer-events-none absolute inset-0 opacity-70" />

      <motion.div
        variants={reveal}
        initial="hidden"
        animate="show"
        className={`fancy-scroll relative z-10 flex h-full flex-col overflow-y-auto px-8 pb-28 pt-12 ${
          isFinale ? 'items-center text-center' : ''
        }`}
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
          className={`mt-2 font-display font-semibold text-ink ${
            isFinale ? 'text-[2.75rem] leading-[1.05]' : 'text-4xl'
          }`}
        >
          {page.title}
        </motion.h2>

        <motion.span
          variants={child}
          className={`mt-3 block h-px bg-sepia/40 ${isFinale ? 'w-24' : 'w-16'}`}
        />

        <motion.div
          variants={child}
          className={`mt-6 space-y-4 font-body text-[1.075rem] leading-[1.85] text-ink/90 ${
            isFinale ? 'max-w-[34ch]' : 'drop-cap'
          }`}
        >
          <Paragraphs text={page.body} />
        </motion.div>

        {page.aside ? (
          <motion.p
            variants={child}
            className="mt-7 border-l-2 border-rose/40 pl-4 font-hand text-2xl leading-snug text-sepia"
          >
            {page.aside}
          </motion.p>
        ) : null}

        {page.photo ? (
          <motion.div variants={child} className="mt-9">
            <Polaroid
              src={page.photo.src}
              alt={page.photo.alt}
              caption={page.photo.caption}
              rotate={page.photo.rotate}
            />
          </motion.div>
        ) : null}

        {isFinale ? (
          <motion.div
            variants={child}
            className="mt-9 flex flex-col items-center"
          >
            <p className="font-hand text-2xl text-ink/85">{page.signature}</p>
            <p className="font-hand text-3xl text-rose">{page.signName}</p>
            <div className="mt-5 text-rose">
              <InkHeart size={44} draw delay={0.9} />
            </div>

            {page.restart && onRestart ? (
              <button
                type="button"
                onClick={onRestart}
                className="mt-8 rounded-full border border-sepia/40 px-6 py-2 font-ui text-xs uppercase tracking-[0.22em] text-sepia transition-colors hover:bg-sepia/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60"
              >
                ↺ {page.restart}
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}
