/**
 * Flags de "já viu" das dicas de descoberta, persistidas em localStorage.
 * Centraliza o try/catch — não trava em modos privados restritos.
 */
export const HINTS = {
  swipe: 'diario-hint-seen',
  polaroid: 'polaroid-flip-seen',
  eggs: 'easter-eggs-hint-seen',
};

export function hintSeen(key) {
  try {
    return !!localStorage.getItem(HINTS[key]);
  } catch {
    return false;
  }
}

export function markHintSeen(key) {
  try {
    localStorage.setItem(HINTS[key], '1');
  } catch {}
}
