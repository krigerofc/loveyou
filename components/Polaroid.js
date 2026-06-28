'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PolaroidHint from './PolaroidHint';
import { hintSeen, markHintSeen } from '@/lib/hints';

/**
 * Foto no estilo Polaroid: borda branca grossa, sombra, leve rotação
 * e legenda manuscrita. Tem fita washi no topo e um fallback elegante
 * caso a imagem ainda não exista.
 *
 * Se `back` for fornecido, a polaroide vira ao toque revelando uma
 * mensagem manuscrita no verso. Se `firstHint` for true (e a dica não
 * foi vista ainda), mostra um "👆 toque na foto" + um wiggle inicial.
 */
export default function Polaroid({
  src,
  alt = '',
  caption,
  rotate = '-rotate-2',
  small = false,
  back,
  firstHint = false,
}) {
  const [failed, setFailed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  const hasBack = !!back;

  useEffect(() => {
    if (!firstHint || !hasBack) return;
    if (hintSeen('polaroid')) return;
    setShowHint(true);
    // wiggle convidativo um pouco depois do reveal
    const t = setTimeout(() => setWiggle(true), 1200);
    return () => clearTimeout(t);
  }, [firstHint, hasBack]);

  function onClick() {
    if (!hasBack) return;
    setFlipped((f) => !f);
    if (!hintSeen('polaroid')) {
      markHintSeen('polaroid');
      setShowHint(false);
      setWiggle(false);
    }
  }

  const sizing = small
    ? 'p-2 pb-3'
    : 'mx-auto w-[78%] max-w-[260px] p-3 pb-4';
  const captionSize = small ? 'text-sm' : 'text-xl';
  const fallbackIcon = small ? 'text-xl' : 'text-2xl';
  const fallbackText = small ? 'text-sm' : 'text-lg';

  const Wrapper = hasBack ? motion.button : motion.figure;
  const wrapperProps = hasBack
    ? {
        type: 'button',
        onClick,
        'aria-label': flipped ? 'Voltar a foto' : 'Virar a foto',
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <div className={`relative ${rotate}`}>
      <div
        className="relative"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={
            wiggle && !flipped
              ? { rotate: [0, -2, 2, -1.5, 0], rotateY: 0 }
              : { rotateY: flipped ? 180 : 0 }
          }
          transition={
            wiggle && !flipped
              ? { duration: 1.1, ease: 'easeInOut' }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
          onAnimationComplete={() => {
            if (wiggle && !flipped) setWiggle(false);
          }}
        >
          {/* frente */}
          <Wrapper
            className={`relative block w-full bg-paper-light shadow-polaroid transition-transform duration-300 ease-out ${sizing} ${
              hasBack
                ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60'
                : ''
            }`}
            style={{ backfaceVisibility: 'hidden' }}
            {...wrapperProps}
          >
            <span className="washi-tape" aria-hidden="true" />

            <div className="aspect-square w-full overflow-hidden bg-[#e7d8b8]">
              {!failed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={alt}
                  onError={() => setFailed(true)}
                  className="vintage-photo h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#ecdcbb] to-[#d8c39a] text-sepia">
                  <span className={fallbackIcon}>📷</span>
                  <span className={`font-hand leading-none ${fallbackText}`}>
                    sua foto aqui
                  </span>
                </div>
              )}
            </div>

            {caption ? (
              <figcaption className={`mt-1 text-center font-hand leading-tight text-ink/80 ${captionSize}`}>
                {caption}
              </figcaption>
            ) : null}
          </Wrapper>

          {/* verso — mensagem manuscrita */}
          {hasBack ? (
            <button
              type="button"
              onClick={onClick}
              aria-label="Voltar a foto"
              className={`absolute inset-0 flex flex-col items-center justify-center bg-paper-light text-ink/85 shadow-polaroid focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 ${sizing}`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <span className="washi-tape" aria-hidden="true" />
              <div className="paper-bg flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
                <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-sepia/70">
                  no verso
                </span>
                <p className={`font-hand leading-snug ${small ? 'text-base' : 'text-xl'}`}>
                  {back}
                </p>
              </div>
            </button>
          ) : null}
        </motion.div>
      </div>

      <AnimatePresence>
        {showHint && !flipped ? <PolaroidHint /> : null}
      </AnimatePresence>
    </div>
  );
}
