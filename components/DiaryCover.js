'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import InkHeart from './InkHeart';
import WaxSeal from './WaxSeal';

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

/**
 * Capa do diário: couro escuro, moldura dourada dupla, título serifado,
 * coração de tinta no topo e selo de cera com as iniciais como CTA.
 * Tocar no selo "racha" a cera e abre o diário.
 */
export default function DiaryCover({ page, onOpen }) {
  const [cracked, setCracked] = useState(false);

  function crack() {
    if (cracked) return;
    setCracked(true);
    // espera a animação de quebra terminar antes de virar a página
    setTimeout(() => onOpen?.(), 580);
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="leather-bg grain absolute inset-0" />

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

        <motion.div variants={item} className="my-4 text-gold">
          <InkHeart size={40} draw delay={0.5} />
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
          className="my-5 block h-px w-20 bg-gold/40"
        />

        <motion.p
          variants={item}
          className="font-ui text-[10px] uppercase tracking-[0.3em] text-paper/55"
        >
          {page.footnote}
        </motion.p>

        <motion.div variants={item} className="mt-6">
          <WaxSeal
            initials={page.initials ?? 'V&T'}
            cracked={cracked}
            onCrack={crack}
            label={page.cta || 'Abrir o diário'}
          />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-3 font-hand text-base text-paper/70"
        >
          toque no selo
        </motion.p>
      </motion.div>
    </div>
  );
}
