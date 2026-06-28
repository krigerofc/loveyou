'use client';

import { motion } from 'framer-motion';
import InkHeart from './InkHeart';
import SwipeHint from './SwipeHint';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DiaryCover({ page, onOpen, hint }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="leather-bg grain absolute inset-0" />

      {hint && <SwipeHint text={hint} />}

      {/* moldura dourada dupla */}
      <div className="pointer-events-none absolute inset-4 rounded-[10px] border border-gold/40" />
      <div className="pointer-events-none absolute inset-[22px] rounded-[7px] border border-gold/20" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-10 text-center"
      >
        <motion.p
          variants={item}
          className="font-ui text-[10px] uppercase tracking-[0.4em] text-gold/80"
        >
          {page.eyebrow}
        </motion.p>

        <motion.div variants={item} className="my-5 text-gold">
          <InkHeart size={46} draw delay={0.5} />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-tight text-gold drop-shadow-[0_1px_0_rgba(0,0,0,0.3)]"
        >
          {page.title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-3 font-hand text-2xl text-paper/85"
        >
          {page.subtitle}
        </motion.p>

        <motion.span
          variants={item}
          className="my-6 block h-px w-20 bg-gold/40"
        />

        <motion.p
          variants={item}
          className="font-ui text-[10px] uppercase tracking-[0.3em] text-paper/55"
        >
          {page.footnote}
        </motion.p>

        <motion.button
          variants={item}
          type="button"
          onClick={onOpen}
          className="mt-10 rounded-full border border-gold/60 px-7 py-2.5 font-ui text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        >
          {page.cta} →
        </motion.button>
      </motion.div>
    </div>
  );
}
