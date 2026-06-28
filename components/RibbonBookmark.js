'use client';

import { motion } from 'framer-motion';

/**
 * Fitinha de cetim que sai do topo do diário e desce pela lateral direita,
 * marcando a página atual. Não aparece na capa (index 0).
 * O comprimento é proporcional ao progresso (index/total).
 */
export default function RibbonBookmark({ index, total }) {
  if (index <= 0) return null;

  const progress = total > 1 ? index / (total - 1) : 0;
  // comprimento entre 22% e 78% da altura — nunca toca o fundo da nav
  const length = 22 + progress * 56;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-7 top-0 z-30"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative w-[14px]"
        style={{
          background:
            'linear-gradient(to right, #6e1422 0%, #a8253a 35%, #c83a52 55%, #8b1a2a 80%, #5c1019 100%)',
          boxShadow:
            'inset 0 0 0 1px rgba(0,0,0,0.25), 0 6px 10px -4px rgba(0,0,0,0.5)',
        }}
        initial={false}
        animate={{ height: `${length}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* recorte em "V" na ponta inferior, como fita real */}
        <div
          className="absolute -bottom-3 left-0 right-0"
          style={{
            height: '14px',
            background:
              'linear-gradient(to right, #6e1422 0%, #a8253a 35%, #c83a52 55%, #8b1a2a 80%, #5c1019 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 30%, 0 100%)',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.35))',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
