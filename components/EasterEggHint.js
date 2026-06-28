'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { hintSeen, markHintSeen } from '@/lib/hints';

/**
 * Sussurro discreto na contracapa, depois da chuva de pétalas:
 * sugere que existem segredos guardados nas páginas (long-press).
 * Aparece uma vez por dispositivo; some sozinho ou ao toque.
 */
export default function EasterEggHint({
  text = 'psiu… segure o dedo numa página pra ver algo bonito',
  delay = 2.4,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hintSeen('eggs')) return;
    const t = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  function dismiss() {
    setVisible(false);
    markHintSeen('eggs');
  }

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(dismiss, 6000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Entendido, fechar dica"
          onClick={dismiss}
          onTouchStart={dismiss}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-x-6 bottom-24 z-40 flex items-center justify-center focus:outline-none"
        >
          <span className="rounded-full bg-paper-light/85 px-4 py-1.5 font-hand text-base text-sepia shadow-[0_4px_14px_-6px_rgba(58,48,38,0.4)] backdrop-blur-sm">
            🌸 {text}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
