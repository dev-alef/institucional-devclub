# Diário de decisões — página institucional DevClub

Registro do porquê de cada escolha técnica. Uma linha por decisão.
(Este arquivo é meu material de estudo para a entrevista.)

## Stack
- **Vite + React**: página estática sem necessidade de SSR; Vite dá dev server instantâneo e build otimizado. Trade-off aceito: SEO mais fraco que Next.js — irrelevante num concurso avaliado por link direto.
- **GSAP**: controle de timeline (sequenciar, sobrepor, dar scrub no scroll) que CSS puro não oferece; padrão da indústria em sites premiados.
- **CSS puro com variáveis** (por enquanto): menos abstração para eu dominar cada linha; tokens em `:root` centralizam a identidade visual.

## Conceito
- **"A página que se compila"**: a intro simula a jornada do aluno — terminal (zero) que compila e vira a página final (contratado). A página não descreve o DevClub; ela encena a transformação que ele promete.
- **Âmbar de fósforo**: remete aos monitores de terminal antigos ("onde todo dev começou") e foge do roxo/azul genérico de tech.
- **"contratado." em âmbar**: o destino da jornada herda a cor do terminal onde ela começou.

## Animação
- **Intro pulável por qualquer interação** (`progress(1)`): intro é cortesia, não pedágio. Aprendido analisando um portfólio com intro de 15s sem skip.
- **Só transform + opacity nas animações contínuas**: rodam na GPU (composite) sem recalcular layout. Exceção pontual: `backgroundColor` na transição única boot→hero (dispara paint, não layout).
- **Estados iniciais no CSS, GSAP só revela**: evita flash de conteúdo no 1º frame se o JS atrasar.
- **Crossfade coreografado no morph** (não FLIP real): 90% do efeito com 10% do risco/tempo.
- **`prefers-reduced-motion` respeitado**: timeline salta ao fim + cursor sem piscar.
- **Hover do CTA em CSS, coreografia em GSAP**: micro-interação constante não precisa de JS.

## React
- **`useGSAP` em vez de `useEffect` para animações**: reverte/mata tudo no desmonte (e no double-mount do StrictMode) — sem vazamento nem animação duplicada.
- **Refs em vez de `document.querySelector`**: o React é dono do DOM; `scope` no useGSAP isola os seletores dentro da section.
- **Listeners de skip em `useEffect` separado, com cleanup**: animação e interação com o navegador são responsabilidades distintas.
- **DOM completo desde o 1º render (invisível via CSS)**: nada é montado no meio da animação — zero layout shift.

## Acessibilidade / responsivo
- **`100svh` em vez de `100vh`**: viewport real no mobile (desconta a barra do navegador).
- **`clamp()` na tipografia**: escala fluida sem media queries.
- **Terminal com `aria-hidden`**: é teatro visual; o conteúdo real (h1) fica acessível a leitores de tela.
- **`:focus-visible` estilizado**: navegação por teclado visível, na cor da identidade.

## Cores e identidade (revisão)
- **Paleta trocada para a identidade oficial DevClub** (verde do logo + roxo profundo): página institucional é a casa da marca; inventar paleta seria redecorá-la. Terminal verde-fósforo ainda reforça o conceito (mais icônico que o âmbar).
- **Tokens renomeados por função** (`--destaque`, não `--verde`): se a marca mudar, troco valores em um lugar só.
- **Amarelo-ácido do #semDesculpas NÃO virou segundo acento** (regra: um acento por página); homenagem virou easter egg no log do terminal: `modo #semDesculpas ativado`.
- **Intro alongada (~4.5s)**: logs a ~0.5s/linha para dar tempo de leitura (3-4 palavras/s de leitura média). Aceitável porque a intro é pulável.

## Página completa (rascunho v1)
- **Fio condutor**: toda seção abre com um pseudo-comando de terminal (`devclub list --formacoes` etc.) — o conceito da intro atravessa a página inteira, e o fechamento devolve o terminal com `--sua-vez` (loop narrativo).
- **Formações em scroll horizontal pinado**: scroll vertical vira deslocamento lateral (`x` negativo do trilho); `end` dinâmico = largura real do trilho (1px rolado = 1px deslocado); `invalidateOnRefresh` recalcula no resize. Com movimento reduzido, vira faixa rolável nativa (sem pin).
- **Reveals globais com `[data-reveal]`**: um único sistema no App anima toda entrada por scroll; seções apenas marcam o atributo — zero lógica repetida.
- **Marquee de empresas em CSS puro** (dois grupos idênticos + translateX(-50%) = loop perfeito; mask-image nas bordas): animação constante e desacoplada não precisa de JS.
- **Depoimentos em mosaico via CSS columns** (`columns` + `break-inside: avoid`): masonry sem biblioteca.
- **Grade bento na plataforma** (célula principal 2x2 + satélites): hierarquia visual sem imagem nenhuma — a "janela" da plataforma é desenhada em código.
- **Professores com avatar de iniciais**: concurso permite conteúdo fictício; iniciais elegantes > fotos de banco de imagem.
- **Menu entra com delay de 4.6s via CSS `animation-delay`** (após a intro): animação única e independente da timeline não precisa de GSAP.
- **Rodapé declara que a página é conceitual com dados ilustrativos**: honestidade com quem abrir o link fora do contexto do concurso.

## Formações v2 (feedback do rascunho)
- **Scroll horizontal pinado REMOVIDO**: obrigava o visitante a atravessar 14 cards para continuar a página — sequestro de scroll é o mesmo pecado da intro sem skip. Lição: efeito impressionante ≠ boa UX; o critério é sempre quem está rolando.
- **Substituído por grade filtrável por categoria**: tudo visível de imediato, interação opcional (filtros), funciona idêntico no mobile, e o bug de cards escondidos morre por definição.
- **Filtros com `role="tab"` + `aria-selected`**: semântica de abas para leitores de tela.
- **Reanimação dos cards a cada filtro** via `dependencies: [categoria]` no useGSAP: o efeito re-executa quando o estado muda.
- **Arte pixel generativa por card**: hash FNV do nome → semente → PRNG mulberry32 → grade 7x7 com simetria espelhada (truque dos identicons do GitHub). Mesmo nome = mesma arte, sempre. Eco intencional do logo QR do DevClub; nenhum asset externo, nenhuma imagem repetida entre candidatos.
- **Professores com retratos de mockup (randomuser.me) + fallback para iniciais via `onError`**: rede pode falhar; a página, não.

## Fundo vivo (hero)
- **Canvas 2D, não DOM**: milhares de pontos como elementos HTML mataria o layout; canvas desenha tudo num único elemento por frame.
- **Malha de pixels quadrados (não círculos)**: continua o motivo pixel/QR da identidade — até o fundo fala a língua do logo.
- **Interação**: repulsão quadrática (forte só bem perto do cursor) + acendimento verde por proximidade; em repouso, respiração de opacidade com fase aleatória por ponto (nunca pisca em uníssono).
- **Performance**: `devicePixelRatio` limitado a 2; IntersectionObserver pausa o rAF quando o hero sai da tela; listeners `passive`.
- **Reduced motion**: desenha um único quadro estático, sem loop e sem mouse.

## Fundo vivo v2 — global + site todo preto
- **Canvas promovido de "dentro do hero" para fixo atrás do site inteiro** (`position: fixed` + `pointer-events: none`; conteúdo com `z-index` acima): a malha reage ao mouse em qualquer dobra e vira a assinatura da página.
- **Coordenadas do mouse diretas (clientX/Y)**: canvas fixo na viewport dispensa getBoundingClientRect por movimento.
- **IntersectionObserver removido**: o canvas fixo está sempre visível; em aba oculta o próprio requestAnimationFrame congela.
- **Site todo preto (#050308)**: as animações de backgroundColor do hero (boot→roxo e escurecimento na fase de scroll) foram REMOVIDAS — ficaram sem função com fundo único. Tirar código morto é decisão tão importante quanto adicionar.
- **Visibilidade aumentada** (alpha base 0.10, roxo mais claro, pixel maior): a malha passou de rumor a personagem.
- **Janelas de terminal levemente translúcidas** (rgba 0.88): a malha aparece atrás delas — profundidade sem sacrificar legibilidade.

## Cursor customizado
- **Duas peças**: ponto (pixel verde, resposta quase imediata) + anel quadrado que persegue com atraso — a defasagem entre os dois cria a elasticidade; um elemento só pareceria cursor de sistema pintado.
- **`gsap.quickTo` em vez de `gsap.to` por movimento**: reusa o mesmo tween para a propriedade que muda 60+ vezes/segundo; criar um tween novo por evento de mouse é pressão de garbage collector.
- **Delegação de eventos**: um `pointerover` no documento + `closest()` decide o estado (link/card/texto) — escala para elementos criados depois, sem listener por elemento.
- **Estados via `data-estado` + transições em CSS**: JS decide O QUE o cursor é; CSS decide COMO ele se transforma. Separação de responsabilidades.
- **Formas com significado**: quadrado (eco da malha/pixel), mira girada 45° sobre ações, moldura arredondada sobre cards, barra de edição sobre texto (eco do terminal).
- **Só monta com `(hover: hover) and (pointer: fine)`**: touch nunca vê cursor; e `cursor: none` global só entra via classe quando o customizado ativa — sem mouse, nada muda.
- **`pointer-events: none` + z-index 200**: nunca rouba clique, nunca fica atrás de nada.

## Cursor v2 (correção + glifo)
- **Detecção movida do `pointerover` para DENTRO do `pointermove`**: a v1 dependia de dois eventos sincronizados (um movia, outro detectava) — se um falha, o cursor "funciona mas não reage". Um evento, um caminho: se move, detecta. Correção arquitetural, não remendo.
- **Escrita no DOM só quando o estado MUDA** (`if !== antes de atribuir`): pointermove roda dezenas de vezes/segundo; reescrever atributo idêntico por frame é invalidação de estilo à toa.
- **Glifo `</>` materializa sobre cards** (opacity+scale via CSS): o cursor "lê" o conteúdo.
- **Sobre "enfeitar demais"**: critério adotado — enfeite é o que existe APESAR do conceito; extensão é o que existe POR CAUSA dele. O cursor usa o vocabulário pixel/terminal da página e nunca esconde affordance. Componente isolado: remoção = 1 linha no App. Validação prevista via teste de corredor antes da entrega.

## Cursor v3 — fusão design importado + engenharia própria
- **Origem dupla declarada**: visual gerado no Claude Design (barra piscante de terminal, glow, rótulo contextual, glifos); engenharia reescrita como componente React porque o script original era IIFE SEM cleanup — no StrictMode/HMR do Vite ele se duplicava (dois cursores, estilos empilhando).
- **Partículas movidas do movimento para o CLIQUE**: a malha do fundo já responde à posição do mouse; partículas por movimento criavam duas respostas simultâneas ao mesmo estímulo (ruído percebido pelo autor). Regra adotada: cada estímulo do usuário → UMA resposta visual. Movimento = malha; clique = explosão de glifos.
- **Rótulo contextual via `data-cursor-text`**: pill verde sob o cursor com texto do elemento — recurso herdado do design importado, mantido por agregar affordance real.
- **Lerp manual no anel** (`rx += (mx-rx)*0.16`): mesma matemática do Lenis; 16% da distância por frame = perseguição elástica.
- **Componente retorna `null`**: as peças vivem no body via DOM direto (precisam flutuar acima de tudo); o componente React existe só como ciclo de vida (montagem/cleanup). Padrão consciente e defendido.
- **Estilos migrados do JS injetado para cursor.css**: estilo em arquivo de estilo; string de CSS dentro de JS dificulta manutenção e escapou do tema (agora usa var(--destaque)).

## Blindagem mobile (rodada 1)
- **Menu hambúrguer com overlay de tela cheia** estilo prompt (`$ Formações`): links gigantes entram em cascata via transition-delay inline; CTA migra da barra para o overlay em <720px. `aria-expanded`, `aria-hidden` e `tabIndex` condicionais para acessibilidade; scroll do fundo travado enquanto aberto.
- **`ScrollTrigger.config({ ignoreMobileResize: true })`**: a barra de URL do celular some/aparece ao rolar e dispara resize — sem essa config, os pins recalculam no meio do gesto e a página salta.
- **Malha do fundo mais espaçada em <640px** (58px vs 44px): sem mouse não há interação, só respiração — menos pontos = menos trabalho por frame = bateria.
- **Padding de seção reduzido no mobile** (110px → 72px): respiro proporcional à tela.

## Correções do teste mobile real (via deploy)
- **Hero decapitado**: overflow:hidden (exigido pelo pin) corta conteúdo maior que a tela em vez de deixar rolar; dieta tipográfica em <640px (headline ~10.5vw, margens menores) até caber com folga em 100svh.
- **Malha "garrada" no toque**: touch dispara pointermove mas não tem pointerleave — o último toque ficava gravado como posição eterna do "mouse". Correção conceitual: sem `(hover:hover)`, a malha nem escuta o ponteiro (toque é intenção de clique, não hover).
- **"Banner atrás de banner"**: no mobile as seções colapsavam em uma coluna infinita de cards iguais. Formações e depoimentos viram carrosséis de deslize NATIVO (overflow-x + scroll-snap): diferente do scroll horizontal sequestrado abolido antes — aqui o deslize é gesto voluntário do dedo e a rolagem vertical passa reto. Card a 76-78vw deixa o vizinho aparecer na borda: alfabeto visual de "tem mais ali, desliza".
- **Scrollbar oculta nos carrosséis** (scrollbar-width + ::-webkit-scrollbar): a affordance é o card cortado na borda, não a barra.

## Rodada mobile 2 (feedback do deploy)
- **Pin do hero desativado em <768px**: pin é o recurso mais frágil do mobile (viewport dinâmico, barra de URL); o desvanecer preso rende pouco em tela pequena. Troca consciente: menos efeito, mais robustez — no celular o hero é uma seção normal e centrada.
- **Números-fantasma de capítulo em cada seção** via contadores de CSS puro (counter-increment + ::before, texto vazado com -webkit-text-stroke): identidade de "capítulos de uma jornada" contra a sensação de lista infinita; zero JSX. Fechamento excluído (epílogo, não capítulo).
- **Plataforma em 2 colunas no mobile** (satélites): metade da altura empilhada.
- **`.dif-check` oculto no mobile**: affordance de hover não existe no toque — elemento que só aparece no hover é código morto em touch.

---

# BACKLOG RUMO À ENTREGA (prazo: 23/07, envio planejado: 22/07)

## Conteúdo e visual
- [ ] Fotos/imagens: avaliar imagens ilustrativas nas seções (plataforma, faculdade) — critério: só entra imagem que obedece à paleta; nada de banco de imagem genérico gritando por cima do tema.
- [ ] Vídeos de depoimento: cards de vídeo fictícios (thumbnail + play) no mosaico — vídeo real é opcional, o padrão visual é o que conta.
- [ ] Lapidação por seção: revisar espaçamentos, hierarquia e microinterações dobra a dobra (lista viva — anotar achados aqui).
- [ ] Favicon conferido em produção + meta tags OG (título, descrição, imagem de preview) — o link precisa ficar bonito no WhatsApp do avaliador.
- [ ] Revisão final de todos os textos (typos derrubaram candidato no portfólio de referência).

## Qualidade
- [ ] Lighthouse ≥ 90 em Performance e Acessibilidade (rodar em produção, não no dev).
- [ ] Teste de corredor do cursor com 2 pessoas (decidir: fica ou sai).
- [ ] Teste completo em: Chrome desktop, celular real (4G), simulador tablet (768-1024px).
- [ ] Conferir prefers-reduced-motion de ponta a ponta.

## Entrega
- [ ] E-mail para contato@rodolfomori.com com: nome completo, cidade/estado, link da página, link do repo, LinkedIn + "por que me contratar" (específico: aluno DevClub, sistema real em produção para cliente, 1 parágrafo sobre a decisão de design), pretensão salarial PJ mensal.
- [ ] Envio no dia 22 — nunca no dia do prazo.

---

# ROTEIRO DE ESTUDO PARA A ENTREVISTA

> Método: ler cada arquivo NA ORDEM abaixo, em voz alta, explicando cada bloco.
> Onde travar, voltar ao capítulo correspondente das decisões acima.
> Meta: conseguir responder "por que isso?" apontando para QUALQUER linha.

## Ordem de leitura (do alicerce ao enfeite)

### 1. index.html + src/main.jsx — o ponto de partida
Conceitos: onde o React "nasce" (createRoot), por que StrictMode fica ligado
(monta 2x em dev DE PROPÓSITO para expor efeitos mal limpos), fontes com
preconnect e os 3 papéis tipográficos (display grita / texto conversa / mono computa).

### 2. src/index.css — o design system
Conceitos: design tokens em :root nomeados por FUNÇÃO (--destaque, não --verde),
reset e box-sizing: border-box, utilitários .secao/.secao-comando (o fio condutor),
[data-reveal] como contrato entre CSS (estado inicial) e GSAP (estado final),
números-fantasma com CSS counters, focus-visible.

### 3. src/App.jsx — a orquestra
Conceitos: Lenis e o casamento dos 3 relógios (lenis.on(scroll) → ScrollTrigger.update;
gsap.ticker dirige o lenis.raf — UM relógio para todos), lerp = interpolação (10% da
distância por frame), ignoreMobileResize (barra de URL do celular), o sistema único
de reveals ([data-reveal] + toggleActions), ordem das dobras.

### 4. src/components/Hero.jsx + hero.css — o coração
Conceitos: timeline como fila e os position parameters ("+=0.15" | "<" | "-=0.4"),
TextPlugin com ease none (máquina digita uniforme), stagger e a conta
(tempo total = stagger × itens; headline < 1s), CSS começa / GSAP termina (anti-FOUC),
crossfade coreografado vs FLIP (90% do efeito, 10% do risco), skip via progress(1)
+ onComplete disparando a Fase 4 (fotografia dos valores iniciais — POR QUE a
timeline de scroll só nasce quando a intro acaba), contextSafe (adoção pro cleanup),
pin só ≥768px (troca consciente), o bug do grid estourado
(min-width:auto em filho de grid + max-content do marquee → minmax(0,1fr)),
marquee com 2 grupos + translateX(-50%) = loop perfeito, 100svh vs 100vh,
máscara overflow:hidden nas palavras, prefers-reduced-motion em camadas.

### 5. src/components/FundoVivo.jsx — o organismo
Conceitos: canvas vs DOM (milhares de pontos, 1 elemento), devicePixelRatio limitado
a 2, aleatório reproduzível (fase por ponto — nunca piscam juntos), repulsão
quadrática, "toque não é hover" (sem pointerleave no touch → malha surda ao ponteiro
em telas de toque; o bug do verde garrado), pointer-events:none, malha mais
espaçada no mobile (bateria), por que rAF congela sozinho em aba oculta.

### 6. src/components/Cursor.jsx + cursor.css — a assinatura
Conceitos: história das 3 versões (v1 dois eventos → frágil; v2 detecção no
pointermove; v3 fusão com design importado), POR QUE o script original quebrava
(IIFE sem cleanup + StrictMode/HMR = cursores duplicados), gsap.quickTo (reusa
tween, poupa garbage collector), lerp manual do anel (mesma matemática do Lenis),
componente que retorna null (peças no body, React só como ciclo de vida),
partículas no CLIQUE e a regra "um estímulo → uma resposta visual",
delegação com closest(), cursor:none com !important (a exceção honesta),
(hover:hover) and (pointer:fine).

### 7. src/components/Formacoes.jsx + formacoes.css — a iteração de UX
Conceitos: a HISTÓRIA (v1 scroll horizontal pinado → sequestro de scroll → grade
filtrável; o commit refactor: registra isso), arte generativa completa
(hash FNV-1a → semente → mulberry32 → grade 7×7 espelhada = identicons do GitHub;
mesmo nome = mesma arte), useGSAP com dependencies (re-anima ao filtrar),
role=tab + aria-selected, carrossel NATIVO no mobile vs sequestro
(deslize voluntário; card a 76vw = vizinho na borda = affordance),
scrollbar oculta de propósito.

### 8. src/components/Menu.jsx + menu.css
Conceitos: estado rolou (scroll listener passivo) + fundo translúcido com
backdrop-filter, hambúrguer → overlay com cascata via transitionDelay inline,
travar scroll do body com overlay aberto, tabIndex condicional e aria-expanded,
animation-delay de 4.6s casado com a duração da intro (acoplamento assumido:
mudou a intro, mudar o delay).

### 9. Demais seções (Diferenciais, Plataforma, Depoimentos, Professores, Faculdade, Fechamento) + secoes.css
Conceitos: variedade de layout como decisão (lista editorial / bento / mosaico com
CSS columns + break-inside / grade auto-fill), retratos com fallback onError,
o LOOP narrativo (terminal → página → terminal --sua-vez), rodapé honesto
(página conceitual), affordance de hover morta no touch (.dif-check).

## Perguntas prováveis + esboço de resposta

**"Por que Vite e não Next?"** Página estática sem SSR; Vite = dev server
instantâneo e build enxuto. Trade-off aceito: SEO — irrelevante para link direto
de concurso. Sei nomear o que perdi: é isso que torna a escolha defensável.

**"Por que GSAP e não CSS puro?"** Sequenciamento (timeline), sobreposição
(position parameters) e scrub por scroll não existem em CSS. CSS ficou com o que
é constante (cursor piscando, marquee, hovers) — cada tecnologia no seu papel.

**"O que esse scrub: 1 faz?"** Inverte quem manda: o scroll vira o dedo no play,
com 1s de suavização. Na intro o TEMPO toca; na fase de scroll o USUÁRIO toca.

**"Por que só transform e opacity?"** Pipeline de render: layout → paint →
composite. transform/opacity vão direto ao composite (GPU). Exceções conscientes:
backgroundColor (transição única, dispara paint, não layout).

**"Se eu pedir pra mudar o verde, o que você toca?"** Uma linha: --destaque no
:root. Tokens por função. (Os rgba do canvas/glow são literais — sei onde estão
e por quê: canvas não lê var() do CSS.)

**"Por que o cursor não aparece no celular?"** (hover:hover) and (pointer:fine):
cursor pressupõe ponteiro; no toque o componente nem monta. Mesmo princípio na
malha: toque não é hover.

**"O que você faria diferente com mais tempo?"** Resposta honesta preparada:
extrair constantes de animação para um arquivo de tokens JS, testes de
componente, imagens/vídeos reais das seções, matchMedia do GSAP para gerenciar
breakpoints das animações num lugar só.

**"O que aqui foi gerado por IA?"** Verdade tranquila: usei IA como par de
programação e professor — cada decisão está registrada neste arquivo com o
porquê, e a prova de domínio é esta conversa: pergunte qualquer linha.

## Rotina até a entrega
1 sessão de leitura por dia (ordem acima) + 1 rodada de "quebra 3 coisas de
propósito" no arquivo do dia + atualizar este arquivo com o que aprender.
