# Guia de Uso — Diário de Nós 📖

Um guia simples em duas partes: para **quem abre** o diário e para **quem personaliza** e publica.

---

## Parte 1 — Para quem recebe (como navegar)

Ao entrar, você verá a **capa** do diário. É só abrir e ir folheando — como um caderno de verdade.

### Como virar as páginas
| No celular | No computador |
|---|---|
| **Deslize** o dedo para o lado ⬅️➡️ | Use as **setas do teclado** ⬅️ ➡️ |
| Toque nas **setas** `◂ ▸` na base | Clique nas **setas** `◂ ▸` |
| Toque nos **pontinhos** para pular pra uma página | Clique nos **pontinhos** |

### O percurso (5 páginas)
1. **Capa** — toque em **"abrir o diário"** para começar.
2. **O Início** — a primeira lembrança, com uma foto polaroide.
3. **Caminhada Juntos** — a evolução da história.
4. **O Registro** — outra foto pra guardar pra sempre.
5. **Feliz Aniversário** — a mensagem final. No fim, dá pra tocar em **"reler o diário"** e voltar à capa.

> Dica: para a melhor experiência, abra **no celular**. No computador o diário aparece centralizado, como um caderno na mesa.

---

## Parte 2 — Para quem personaliza

Tudo que você normalmente vai querer mudar está em **dois lugares**: os textos (`data/diary.json`)
e as fotos (`public/images/`). Não precisa mexer em código.

### Rodar o site no seu computador
Pré-requisito: ter o **Node.js 18.18+** instalado.

```bash
npm install      # só na primeira vez
npm run dev
```
Depois abra **http://localhost:3000** no navegador.

### Trocar os textos
Abra `data/diary.json`. Cada página é um item da lista `pages`. Edite os campos de texto:

- `title` → título da página
- `body` → o texto (use **uma linha em branco** entre parágrafos)
- `caption` → a legenda manuscrita embaixo da foto
- `subtitle` / `signature` / `signName` → frases da capa e da despedida

> Mantenha as **aspas** e as **vírgulas** do JSON. Se quebrar, o site não carrega — basta desfazer.

### Trocar as fotos
1. Coloque suas imagens na pasta `public/images/` (ex.: `foto-1.jpg` e `foto-2.jpg`).
2. Em `data/diary.json`, ajuste o campo `photo.src`:
   - de `"/images/foto-1.svg"` para `"/images/foto-1.jpg"`
3. As fotos aparecem na **Página 1** e na **Página 3**. Imagens **quadradas** ficam melhores.

Enquanto não houver foto, aparece um placeholder bonito escrito "sua foto aqui".

### Ajustes rápidos de visual (opcional)
- **Cores e fontes:** `tailwind.config.js`
- **Texturas, pauta, fita washi:** `app/globals.css`

### Publicar (gerar um link para enviar)
A forma mais simples é a **Vercel** (gratuita):
1. Suba o projeto para o GitHub.
2. Em vercel.com, importe o repositório → **Deploy**.
3. Você recebe um link (ex.: `seu-diario.vercel.app`) para mandar no WhatsApp.

> Como é um diário íntimo, considere deixá-lo **fora dos buscadores** (item previsto no PRD).

---

Dúvidas de conteúdo e o que ainda falta? Veja o **`docs/PRD.md`**.
