# Design: Pinguim Editor

## Conceito
A página é uma timeline de edição. A navegação no topo é uma trilha com quatro clipes (Início, Bio, Edições, Contato), com largura proporcional ao tamanho de cada seção. Um playhead laranja e um timecode acompanham a rolagem. Cada seção é um "clipe" com mundo visual próprio.

## Cor (OKLCH, tirada do mascote)
| Token | Papel |
|---|---|
| `--bg` | gelo levemente lavanda, fundo geral |
| `--hood` | ardósia do capuz, seção Edições (drench) |
| `--periwinkle` | olhos do capuz, clipe Início |
| `--beak` | laranja do bico, CTA principal e seção Contato (drench) |
| `--outline` / `--shadow` | traço do desenho, usado em bordas e sombras duras |

Estratégia: **Committed**. Ardósia e laranja carregam seções inteiras. Tema escuro troca o gelo por azul-noite e a sombra dura vira lavanda.

## Tipografia
Uma família só, escolhida de propósito: **Bricolage Grotesque** (variável: peso, largura, tamanho ótico). Títulos em 800 condensado (`font-stretch: 75%`), corpo no tamanho ótico pequeno. Escala fluida em `css/tokens.css` (`--step--1` a `--step-hero`).

## Componentes
- **Sticker**: borda de 3px na cor do traço + sombra dura deslocada (`--lift`). Usado em botões, mascote e vídeos. Ecoa o contorno do desenho.
- **Timeline**: `nav.timeline` com clipes coloridos e `.playhead`.
- **Vídeo**: capa do YouTube como link; com JS, o clique troca pelo player `youtube-nocookie` no lugar.
- **Specs**: lista de definição tipo "propriedades do clipe" na Bio.

## Movimento
Entrada do hero escalonada, mascote balançando devagar, reveals ao rolar. Easing quint/expo. Tudo desligado com `prefers-reduced-motion`.

## Arquivos
```
index.html          estrutura e conteúdo
css/tokens.css      cores, tipo, espaço, easing (claro e escuro)
css/base.css        reset, tipografia base, foco, skip link
css/layout.css      container e layout de cada seção
css/components.css  topbar, timeline, botões, mascote, specs, vídeo, contato
css/motion.css      animações (só com movimento permitido)
js/theme.js         tema claro/escuro (roda no <head>, sem piscar)
js/timeline.js      playhead, timecode, seção ativa
js/video.js         player do YouTube sob demanda
js/contact.js       botão "Copiar e-mail"
js/reveal.js        reveals ao rolar
assets/pinguim.png  mascote (antes era base64 dentro do HTML)
```

## Adicionar uma edição
Copie um bloco `<figure class="video">` em `index.html` e troque o ID do vídeo (`data-yt`, `href`, URL da capa `i.ytimg.com/vi/ID/maxresdefault.jpg`) e o título.
