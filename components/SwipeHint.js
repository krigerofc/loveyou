'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'diario-hint-seen';

/**
 * Dica de navegação que aparece uma vez (localStorage) sobre a capa.
 * Some ao primeiro toque, clique ou após 4s.
 */
export default function SwipeHint({ text }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage bloqueado (modo privado restrito) — não mostra
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
  }

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(dismiss, 4000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Entendido, fechar dica de navegação"
          onClick={dismiss}
          onTouchStart={dismiss}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-20 inset-x-0 z-40 mx-auto flex w-fit flex-col items-center gap-2 focus:outline-none"
        >
          {/* mão deslizando */}
          <motion.span
            aria-hidden="true"
            className="text-3xl"
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            👆
          </motion.span>

          <span className="rounded-full bg-black/30 px-4 py-1.5 font-hand text-lg text-paper/90 backdrop-blur-sm">
            {text}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
