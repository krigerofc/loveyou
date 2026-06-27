# PRD — Diário de Nós

> Documento de requisitos do protótipo. Define **o que já existe**, **o que falta**,
> a **padronização** do projeto e o **guia de uso**. Linguagem objetiva, escopo de protótipo.
>
> **Status:** protótipo navegável rodando (`npm run dev`). Conteúdo e fotos são placeholders.

---

## 1. Objetivo

Entregar um **diário de relacionamento** digital — pequeno, mobile-first e visualmente
encantador — que a pessoa (Tay) abre e folheia como um caderno antigo, lendo 5 páginas
com fotos polaroide e uma mensagem final de aniversário.

**Beneficiário:** quem recebe o diário (presente). **Sucesso:** a pessoa entende como
navegar em < 5s e percorre as 5 páginas sem fricção, achando o resultado bonito.

---

## 2. Estado Atual (o que já existe)

| Área | Situação |
|---|---|
| Stack | Next.js 14 (App Router) + Tailwind + Framer Motion — deps instaladas |
| Páginas | 5 (capa + 4), guiadas por `data/diary.json` |
| Estética | Papel envelhecido, pauta, linha de margem, capa de couro + moldura dourada |
| Componentes | `Diary`, `DiaryCover`, `DiaryPage`, `Polaroid`, `Navigation`, `FloatingHearts`, `InkHeart` |
| Navegação | Setas na tela · swipe (toque) · teclado (← →) · pontinhos indicadores |
| Animação | Virada de página (slide + leve rotateY) · coração de tinta que se desenha · corações ambientes |
| Acessibilidade | `prefers-reduced-motion` respeitado · `aria-label` na navegação · `focus-visible` |
| Fotos | 2 placeholders SVG em `public/images/` com fallback elegante |

---

## 3. O que falta / precisa (Gaps)

### 3.1 Conteúdo (bloqueante para a versão final)
- [ ] **Textos definitivos** das 5 páginas (hoje são placeholders em `data/diary.json`).
- [ ] **2 fotos reais** (Página 1 e Página 3) em `public/images/`.
- [ ] Nome/assinatura reais na capa e contracapa.

### 3.2 Funcionalidade
- [ ] **Guia de uso na entrada** (onboarding) — dica de "deslize/use as setas". → ver seção 4.
- [ ] **Metadados de compartilhamento** (OpenGraph/título/favicon) para quando o link for enviado no WhatsApp.
- [ ] (Opcional) **Música de fundo** com botão ligar/desligar (mudo por padrão — autoplay com som é bloqueado pelos navegadores).
- [ ] (Opcional) Virada de página em **3D real** (page-curl) em vez de slide — polimento.

### 3.3 Qualidade
- [ ] **Acessibilidade:** `aria-live` anunciando a troca de página; foco movido ao topo da nova página; conferir contraste do dourado sobre couro.
- [ ] **Responsividade:** validar em iOS Safari antigo (fallback de `svh`/`dvh`) e telas pequenas (≤ 360px).
- [ ] **Performance:** avaliar trocar `<img>` por `next/image`; conferir peso das fontes.
- [ ] **QA visual** em 3 aparelhos reais (1 iPhone, 1 Android, 1 desktop).

### 3.4 Publicação
- [ ] **Deploy** (recomendado Vercel) gerando um link compartilhável.
- [ ] Decidir **privacidade**: `noindex` para não aparecer em buscas (diário é íntimo).

---

## 4. Guia de Uso na Entrada (onboarding)

**Problema:** ao abrir, a pessoa pode não saber que dá pra virar a página.

**Solução proposta (a implementar):** uma **dica sutil** sobreposta na capa, sumindo sozinha
ou ao primeiro toque. Texto vindo do JSON (`meta.hint`) para fácil edição.

**Regras:**
- Aparece **uma vez** por dispositivo (guardar flag em `localStorage`); reaparece se limpar dados.
- Animação suave (fade) e respeita `prefers-reduced-motion`.
- Não bloqueia a interação — é apenas uma seta/legenda discreta perto do botão "abrir o diário".

**Copy sugerida:** _"deslize ou toque nas setas para virar as páginas →"_

> A versão para **leitor** e para **quem personaliza** está detalhada em `docs/GUIA-DE-USO.md`.

---

## 5. Padronização

### 5.1 Estrutura de pastas
```
app/         → layout, page, globals.css (rotas e fontes)
components/  → 1 componente por arquivo, PascalCase, 'use client' só quando há estado/motion
data/        → conteúdo (JSON) — nada de texto fixo dentro de componentes
public/images/ → assets (fotos)
docs/        → PRD, guia de uso, planos
```

### 5.2 Tokens de design (regra: **nada de hex solto** em componentes)
- **Cores** só via Tailwind: `paper`, `paper-light`, `ink`, `sepia`, `rose`, `leather`, `leather-dark`, `gold`. Definidas em `tailwind.config.js`.
- **Exceção única:** texturas/gradientes/pauta vivem em `app/globals.css` (centralizadas e comentadas).
- **Tipografia (4 papéis):** `font-display` (títulos) · `font-body` (corpo) · `font-hand` (legendas/assinaturas) · `font-ui` (navegação/labels).
- **Sombras:** `shadow-polaroid`, `shadow-sheet`.
- **Mobile-first:** base = celular; expandir só com `sm:`/`lg:`. Largura do "caderno": `max-w-[440px]`.

### 5.3 Schema do conteúdo (`data/diary.json`)
Cada item de `pages[]` tem um `type`:

| type | Campos | Uso |
|---|---|---|
| `cover` | `eyebrow, title, subtitle, footnote, cta` | Capa |
| `text` | `kicker, title, body, aside?` | Página só de texto |
| `photo` | `kicker, title, body, photo{src, alt, caption, rotate}` | Texto + polaroide |
| `finale` | `kicker, title, body, signature, signName, restart` | Contracapa |

Regras: `body` usa `\n\n` para separar parágrafos · `rotate` aceita `rotate-1`/`-rotate-2` etc · `id` em kebab-case.

### 5.4 Convenções de código
- Componentes em **PascalCase**, props em **camelCase**, `id`/slug em **kebab-case**.
- `'use client'` **apenas** em componentes com estado, efeitos ou Framer Motion.
- Sem lógica de conteúdo dentro do componente — sempre via props vindas do JSON.
- Comentários curtos em PT explicando o "porquê", não o "o quê".

### 5.5 Animação & acessibilidade (baseline obrigatório)
- Easing padrão: `[0.22, 1, 0.36, 1]`; duração de transição de página ~0.55s.
- Todo conteúdo respeita `prefers-reduced-motion`.
- Todo botão/foto: `aria-label`/`alt` obrigatórios e anel de foco visível (`focus-visible:ring`).

### 5.6 Commits
Conventional Commits em PT: `feat:`, `fix:`, `style:`, `docs:`, `chore:`.
Ex.: `feat: adiciona dica de navegação na capa`.

---

## 6. Stack / Libs

| Escolha | Razão (custo, lock-in, manutenção, comunidade) |
|---|---|
| Next.js 14 (App Router) | Pedido do brief; comunidade enorme; baixo lock-in (React puro) |
| Tailwind CSS | Pedido do brief; tokens centralizados; zero CSS órfão |
| Framer Motion | Animação declarativa e confiável; alternativa a libs de partículas pesadas |
| Corações próprios (sem tsparticles) | Menos peso/atrito de install; visual controlado; trocável depois se quiser densidade |
| `next/font/google` | Fontes auto-hospedadas, sem requisição externa em runtime, sem layout shift |

**Sem SQL / sem backend / sem auth** — conteúdo é estático em JSON (conforme brief).

---

## 7. Edge Cases

- Foto ausente/erro de carregamento → mostra placeholder "sua foto aqui" (já tratado em `Polaroid`).
- Texto muito longo numa página → área rola (`overflow-y-auto`) sem quebrar o layout.
- `prefers-reduced-motion` ativo → animações praticamente desligadas.
- Teclado em desktop → setas ← → navegam; foco visível em todos os controles.
- Última página → seta "próxima" desabilitada; botão "reler o diário" volta à capa.

---

## 8. Estimativa (para fechar a versão final)

**Tamanho:** S–M · **Estimativa:** 6–10h
**Riscos:** qualidade/recorte das fotos reais; ajuste fino de contraste; testes em iOS antigo.

---

## 9. Tasks (orchestrator-ready)

```yaml
tasks:
  - id: t1
    title: "Inserir textos e fotos reais (diary.json + public/images)"
    deps: []
    priority: high
    executor: direct
    acceptance: "5 páginas com conteúdo final e 2 fotos reais renderizando"

  - id: t2
    title: "Implementar dica de navegação na entrada (onboarding)"
    deps: []
    priority: high
    executor: skill:design
    acceptance: "Dica aparece 1x (localStorage), some ao tocar, respeita reduced-motion, texto via meta.hint"

  - id: t3
    title: "Metadados de compartilhamento + favicon + noindex"
    deps: []
    priority: medium
    executor: direct
    acceptance: "Link no WhatsApp mostra título/descrição; página não indexável"

  - id: t4
    title: "Pass de acessibilidade (aria-live na troca de página, foco, contraste)"
    deps: [t2]
    priority: medium
    executor: skill:design
    acceptance: "Troca de página anunciada; foco move ao topo; contraste AA no texto principal"

  - id: t5
    title: "QA responsivo (iPhone, Android, desktop) + fallback svh/dvh"
    deps: [t1, t2]
    priority: medium
    executor: skill:verify
    acceptance: "Sem corte/scroll horizontal em ≤360px e iOS Safari; caderno centralizado no desktop"

  - id: t6
    title: "(Opcional) Música de fundo com toggle mudo-por-padrão"
    deps: []
    priority: low
    executor: skill:dev
    acceptance: "Botão liga/desliga; sem autoplay com som; estado persistido"

  - id: t7
    title: "Deploy na Vercel e gerar link"
    deps: [t1, t2, t3, t5]
    priority: high
    executor: direct
    acceptance: "URL pública acessível no celular abrindo na capa"
```
