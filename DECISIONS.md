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

Excelente trabalho — você acabou de aprender três coisas na prática que muita gente só decora. Deixa eu fechar cada uma:
Stagger: 0.08 é o certo aqui, e existe uma conta por trás: o tempo total de revelação é stagger × número de palavras. Com 4 palavras, 0.08 × 4 = ~0.3s de cascata — o olho percebe o movimento sem esperar por ele. Com 0.3, são 1.2s só de headline, e o usuário já está esperando a página "terminar de carregar". Regra de bolso para guardar: revelação completa de headline abaixo de 1 segundo. Stagger longo funciona quando o elemento é grande e poucos (3 cards entrando), não em texto.

Bounce: engraçado, né? E é exatamente por isso que não serve. Easing é a personalidade do movimento: bounce é brincalhão/infantil, elastic é exagerado, power4.out é confiante e preciso. Uma página institucional que quer transmitir "aqui você vira profissional" precisa se mover como profissional. Se o Rodolfo perguntar "por que power4.out?", sua resposta é essa: easing é escolha de tom de voz, não de técnica.

O botão inclicável: você acabou de conhecer um dos bugs mais traiçoeiros do frontend. O terminal estava com opacity: 0 — invisível, mas ainda lá, cobrindo o botão e capturando seus cliques. As três formas de "sumir" com algo em CSS são diferentes de verdade: opacity: 0 esconde mas mantém espaço e cliques; visibility: hidden esconde e bloqueia cliques, mas mantém o espaço; display: none remove completamente. Existe ainda pointer-events: none, que deixa visível mas "furável" ao clique. Guarda esse quarteto — é pergunta clássica de entrevista técnica, e você agora sabe pela dor, não pela teoria.

Sobre as cores: você está certíssimo
E quero registrar: essa observação foi maturidade de design, não detalhe. Uma página institucional é a casa da marca — inventar paleta para ela é como redecorar a casa dos outros. O Rodolfo vai reparar, positivamente, que você respeitou a identidade. Aliás, isso vira mais uma linha no seu DECISIONS.md.
E a melhor parte: o conceito sobrevive intacto e até melhora. Terminal de fósforo verde é o clássico absoluto (mais icônico que o âmbar), e o verde é literalmente a cor do logo do DevClub. A narrativa fica: terminal verde-fósforo (o zero) → página roxa profunda (o universo DevClub) → "contratado." em verde, a cor da marca marcando o destino. Caiu de paraquedas no colo do conceito.
Agora vem uma lição de arquitetura CSS junto com a troca. Repare que no código as variáveis se chamam --ambar, --ambar-escuro — nome de cor. Isso foi um erro meu proposital que agora fica evidente: se a variável se chamasse --destaque (nome de papel), você trocaria só o valor e nenhum outro arquivo precisaria mudar. Nomear tokens pela função, não pela aparência, é padrão de design system profissional. Vamos corrigir os dois de uma vez.

Esse item 2, aliás, é uma pergunta de entrevista pronta: "por que tem um hex duplicado no JSX se existe variável CSS?" — porque o GSAP anima valores computados no JavaScript, não resolve var() de forma confiável em todos os contextos. A solução profissional seria ler a variável com getComputedStyle ou centralizar tokens num arquivo JS, mas para um valor único, duplicar com comentário é pragmatismo aceitável. Anote no diário.


Total da intro: ~4.5s até o morph. "intro alongada para legibilidade dos logs (~0.5s/linha); aceitável porque é pulável". Ritmo de animação calculado pela velocidade de leitura é argumento fino de entrevista.