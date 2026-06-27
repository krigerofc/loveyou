'use client';

import { useState } from 'react';

/**
 * Foto no estilo Polaroid: borda branca grossa, sombra, leve rotação
 * e legenda manuscrita. Tem fita washi no topo e um fallback elegante
 * caso a imagem ainda não exista.
 */
export default function Polaroid({
  src,
  alt = '',
  caption,
  rotate = '-rotate-2',
  small = false,
}) {
  const [failed, setFailed] = useState(false);

  const outer = small
    ? `relative bg-paper-light p-2 pb-3 shadow-polaroid ${rotate} transition-transform duration-300 ease-out hover:rotate-0`
    : `relative mx-auto w-[78%] max-w-[260px] bg-paper-light p-3 pb-4 shadow-polaroid ${rotate} transition-transform duration-300 ease-out hover:rotate-0`;

  const captionSize = small ? 'text-sm' : 'text-xl';
  const fallbackIcon = small ? 'text-xl' : 'text-2xl';
  const fallbackText = small ? 'text-sm' : 'text-lg';

  return (
    <figure className={outer}>
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
    </figure>
  );
}
