'use client';

/**
 * Barra de navegação do diário: seta anterior, indicadores de página
 * (pontos) e seta seguinte. Fonte limpa (Inter) para contrastar com a
 * serifada do conteúdo.
 */
export default function Navigation({ index, total, onPrev, onNext, onGoto }) {
  const isLast = index === total - 1;

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between bg-gradient-to-t from-paper via-paper/80 to-transparent px-5 pb-5 pt-8">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Página anterior"
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-sepia transition-colors hover:bg-sepia/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60"
      >
        ◂
      </button>

      <div className="flex items-center gap-2" role="tablist" aria-label="Páginas">
        {Array.from({ length: total }, (_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Ir para a página ${i + 1}`}
              onClick={() => onGoto(i)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 ${
                active ? 'w-5 bg-rose' : 'w-2 bg-sepia/35 hover:bg-sepia/60'
              }`}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Próxima página"
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-sepia transition-colors hover:bg-sepia/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 disabled:cursor-default disabled:opacity-25"
      >
        ▸
      </button>
    </nav>
  );
}
