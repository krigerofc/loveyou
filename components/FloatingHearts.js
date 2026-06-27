'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Camada ambiente de corações subindo lentamente.
 * Os valores aleatórios são gerados só no cliente (em useEffect),
 * evitando divergência de hidratação com o servidor.
 */
export default function FloatingHearts({ count = 9 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 9 + Math.random() * 14,
      delay: Math.random() * 9,
      duration: 11 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 48,
      opacity: 0.1 + Math.random() * 0.16,
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute -bottom-6"
          style={{ left: `${h.left}%`, opacity: h.opacity }}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{ y: '-118vh', x: h.drift, rotate: h.drift }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 32 32"
            fill="#b56a5b"
          >
            <path d="M16 9 C 14.5 4.5, 8 3, 5 7 C 2 11, 4.5 17, 16 26 C 27.5 17, 30 11, 27 7 C 24 3, 17.5 4.5, 16 9 Z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
