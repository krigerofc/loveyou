'use client';

import { motion } from 'framer-motion';

/**
 * Selo de cera com iniciais douradas. Ao tocar, as duas metades
 * "rachadas" se separam (rotateZ + translateX) e somem, abrindo o diário.
 * Vermelho profundo com gradiente radial para parecer cera derretida.
 */
export default function WaxSeal({ initials = '', cracked = false, onCrack, label = 'Abrir o diário' }) {
  return (
    <motion.button
      type="button"
      onClick={onCrack}
      aria-label={label}
      whileHover={cracked ? undefined : { scale: 1.04 }}
      whileTap={cracked ? undefined : { scale: 0.97 }}
      className="relative h-[120px] w-[120px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 rounded-full"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="wax-grad" cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#d33446" />
            <stop offset="55%" stopColor="#8e1a26" />
            <stop offset="100%" stopColor="#4d0a11" />
          </radialGradient>
          <radialGradient id="wax-shine" cx="35%" cy="30%" r="35%">
            <stop offset="0%" stopColor="rgba(255,210,210,0.55)" />
            <stop offset="100%" stopColor="rgba(255,210,210,0)" />
          </radialGradient>
        </defs>

        {/* metade esquerda — borda irregular pra parecer cera */}
        <motion.g
          style={{ transformOrigin: '50% 50%' }}
          initial={false}
          animate={
            cracked
              ? { x: -34, rotate: -18, opacity: 0 }
              : { x: 0, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M 50 4
               A 46 46 0 0 0 50 96
               L 47 88 L 52 70 L 46 55 L 53 38 L 47 22 Z"
            fill="url(#wax-grad)"
            stroke="rgba(40,4,8,0.45)"
            strokeWidth="0.6"
          />
          <path
            d="M 50 4
               A 46 46 0 0 0 50 96
               L 47 88 L 52 70 L 46 55 L 53 38 L 47 22 Z"
            fill="url(#wax-shine)"
          />
        </motion.g>

        {/* metade direita */}
        <motion.g
          style={{ transformOrigin: '50% 50%' }}
          initial={false}
          animate={
            cracked
              ? { x: 34, rotate: 18, opacity: 0 }
              : { x: 0, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M 50 4
               A 46 46 0 0 1 50 96
               L 53 88 L 48 70 L 54 55 L 47 38 L 53 22 Z"
            fill="url(#wax-grad)"
            stroke="rgba(40,4,8,0.45)"
            strokeWidth="0.6"
          />
        </motion.g>

        {/* iniciais douradas — somem junto com a quebra */}
        <motion.text
          x="50"
          y="60"
          textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="30"
          fontWeight="600"
          fill="#d8b56b"
          style={{
            textShadow: '0 1px 0 rgba(0,0,0,0.45)',
            letterSpacing: '-0.02em',
          }}
          initial={false}
          animate={cracked ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {initials}
        </motion.text>
      </svg>
    </motion.button>
  );
}
