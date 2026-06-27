'use client';

import { motion } from 'framer-motion';

/**
 * Coração de tinta que se desenha sozinho (stroke animado).
 * É o motivo-assinatura do diário — usado na capa e na contracapa.
 */
export default function InkHeart({
  size = 56,
  color = 'currentColor',
  strokeWidth = 2,
  draw = true,
  delay = 0.4,
  className = '',
}) {
  const path =
    'M32 18 C 29 9, 17 6, 11 14 C 5 22, 9 35, 32 53 C 55 35, 59 22, 53 14 C 47 6, 35 9, 32 18 Z';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay }}
      />
    </svg>
  );
}
