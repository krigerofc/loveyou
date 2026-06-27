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
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`relative mx-auto w-[78%] max-w-[260px] bg-paper-light p-3 pb-4 shadow-polaroid ${rotate} transition-transform duration-300 ease-out hover:rotate-0`}
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
            <span className="text-2xl">📷</span>
            <span className="font-hand text-lg leading-none">
              sua foto aqui
            </span>
          </div>
        )}
      </div>

      {caption ? (
        <figcaption className="mt-2 text-center font-hand text-xl leading-tight text-ink/80">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
