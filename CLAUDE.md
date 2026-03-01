# ARTICOCLIMA — Contexto do Projeto

## Stack
Site estático: HTML + CSS + JS puro. Sem framework, sem npm.

## Servidor de desenvolvimento
Ficheiro: `.claude/launch.json` → servidor já configurado.
Para iniciar: usar `preview_start` com o nome **"ARTICOCLIMA static"**
- Executa: `C:/PROGRA~1/nodejs/node.exe server.js`
- Porta: **8080**
- O `server.js` suporta HTTP range requests (necessário para vídeo).

## O que foi feito nesta sessão

### 1. Vídeo de fundo no Hero
- Vídeo copiado de `Desktop/OneDrive/Artico Climatização/1.Logo/Publicidade/Animated Logo Mockup_1080p.mp4`
- Guardado em: `assets/bg-hero.mp4`
- Aplicado como background da secção `.hero` (sem áudio, autoplay, loop)
- Overlay escuro `rgba(28,28,30,.62)` para manter legibilidade do texto
- Classes adicionadas ao HTML: `.hero__video` e `.hero__overlay`
- CSS em `css/style.css` (secção "Video background")

### 2. Logo na Nav e Footer
- Logo original: `assets/logo.png` (1536×672 px, preto sobre branco)
- Copiado de: `Desktop/OneDrive/Artico Climatização/1.Logo/LOGO.png`
- Técnica usada: SVG inline com `feColorMatrix` filter
  - Fundo branco → transparente
  - Tudo preto → laranja `#F97316`
- Aplicado em duas zonas:
  - **Nav** (`.nav__logo`): height="44"
  - **Footer** (`.nav__logo.footer__logo`): height="38"
- IDs dos filtros SVG: `logo-nav` e `logo-footer`

## Ficheiros modificados
- `index.html` — nav logo, footer logo, hero video markup
- `css/style.css` — estilos video background
- `server.js` — servidor HTTP com suporte a range requests
- `assets/bg-hero.mp4` — vídeo de fundo
- `assets/logo.png` — logo original PNG
- `.claude/launch.json` — configuração do servidor

## A fazer / pendente
- Nada pendente desta sessão. Trabalho guardado.
