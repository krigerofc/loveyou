'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PALETTE = ['#e8b4a8', '#d99584', '#b56a5b', '#f5d5c8', '#c87f6f'];

/**
 * Chuva de pétalas que cai do topo do "caderno".
 * Usada na contracapa — gera N pétalas com velocidades, atrasos e
 * deriva aleatória. Pequena rotação durante a queda dá vida.
 */
export default function PetalRain({ count = 22 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 12,
      delay: Math.random() * 1.6,
      duration: 5.5 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 60,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 180,
      opacity: 0.6 + Math.random() * 0.35,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute -top-6"
          style={{ left: `${p.left}%`, opacity: p.opacity }}
          initial={{ y: 0, x: 0, rotate: p.rotateStart }}
          animate={{ y: '120vh', x: p.drift, rotate: p.rotateEnd }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
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
