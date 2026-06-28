'use client';

import { motion } from 'framer-motion';

/**
 * Dica posicionada ao lado da primeira polaroide visível: dedo
 * pulsando + texto manuscrito "toque na foto". Some ao primeiro flip.
 */
export default function PolaroidHint({ text = 'toque na foto' }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-2 right-2 z-30 flex items-center gap-1"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.4 }}
    >
      <motion.span
        className="text-2xl"
        animate={{ rotate: [0, -8, 0, -8, 0], y: [0, -3, 0, -3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        👆
      </motion.span>
      <span className="font-hand text-lg text-sepia/80 whitespace-nowrap">
        {text}
      </span>
    </motion.div>
  );
}
