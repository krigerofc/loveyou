'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PALETTE = ['#e8b4a8', '#d99584', '#b56a5b', '#f5d5c8', '#c87f6f'];

/**
 * Pequena explosão de pétalas a partir de um ponto (x, y) — usada pelo
 * easter egg de long-press. Cada pétala vai pra fora num ângulo + cai um
 * pouco. Auto-removida pelo pai quando termina.
 */
export default function PetalBurst({ x, y, count = 9 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
        const dist = 60 + Math.random() * 50;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist + 30,
          size: 10 + Math.random() * 8,
          rotate: (Math.random() - 0.5) * 320,
          duration: 1.3 + Math.random() * 0.8,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        };
      }),
    [count]
  );

  return (
    <div
      className="pointer-events-none absolute z-50"
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: 0,
            rotate: p.rotate,
            scale: 1,
          }}
          transition={{ duration: p.duration, ease: 'easeOut' }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 32 32">
            <path
              d="M16 2 C 7 7, 5 22, 16 30 C 27 22, 25 7, 16 2 Z"
              fill={p.color}
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
