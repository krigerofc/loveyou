# Diário de Nós 📖

Protótipo de um **diário de relacionamento** — site pequeno (5 páginas), mobile-first,
com estética de diário antigo: papel envelhecido, pauta, fotos em estilo polaroide com
fita washi, corações flutuantes e virada de página animada.

Feito com **Next.js (App Router) + Tailwind CSS + Framer Motion**.

## Como rodar

Pré-requisito: **Node.js 18.18+** instalado.

```bash
npm install
npm run dev
```

Abra **http://localhost:3000**. Para a sensação real, use as ferramentas de
desenvolvedor do navegador no modo dispositivo móvel (ex.: iPhone) — o layout é
mobile-first e fica centralizado como um "caderno" no desktop.

## Onde mexer

| O que | Arquivo |
| --- | --- |
| **Textos** de todas as páginas | `data/diary.json` |
| **Fotos** (2 polaroides) | `public/images/` |
| **Cores / fontes** | `tailwind.config.js` |
| **Texturas / pauta / fita washi** | `app/globals.css` |

### Trocar as fotos

Coloque suas imagens em `public/images/` e ajuste o caminho em `data/diary.json`
(campos `photo.src`). Ex.: salve `foto-1.jpg` e troque `"/images/foto-1.svg"`
por `"/images/foto-1.jpg"`. As fotos aparecem nas **Página 1** e **Página 3**.
Enquanto não houver foto, um placeholder elegante é exibido.

## Estrutura

```
app/
  layout.js        # fontes (next/font) + html base
  page.js          # carrega o JSON e monta o diário
  globals.css      # texturas, pauta, fita washi, drop-cap, acessibilidade
components/
  Diary.js         # orquestrador: estado, virada de página, teclado, swipe
  DiaryCover.js    # capa (couro + dourado + coração de tinta)
  DiaryPage.js     # uma folha: texto / texto+foto / contracapa
  Polaroid.js      # foto polaroide com fita washi e fallback
  Navigation.js    # setas + indicadores de página
  FloatingHearts.js# corações ambientes subindo
  InkHeart.js      # coração de tinta que se desenha (assinatura visual)
data/
  diary.json       # TODO o conteúdo de texto
public/images/     # as fotos (placeholders inclusos)
```

## Páginas do diário

1. **Capa** — identidade vintage, abrir o diário
2. **Página 1 · O Início** — texto + 1ª polaroide
3. **Página 2 · Caminhada Juntos** — texto + citação manuscrita
4. **Página 3 · O Registro** — texto + 2ª polaroide
5. **Contracapa · Feliz Aniversário** — mensagem final + assinatura

## Navegação

Setas na tela · **swipe** no celular · **setas ← →** no teclado · pontinhos indicadores.

> Protótipo focado em fidelidade visual. Ajustes de conteúdo e tom vêm depois.
