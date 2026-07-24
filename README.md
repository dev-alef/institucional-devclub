# DevClub — Do zero ao contratado

Página institucional conceitual criada para o concurso de vaga de Programador(a) Full Stack da DevClub.

**🔗 Live:** https://institucional-devclub.vercel.app/

## Conceito

A página é a própria narrativa que ela vende: nasce de um terminal digitando um comando de instalação, "compila" e se transforma na página institucional — e termina de volta em um terminal, aguardando o comando de quem está lendo. Todo o visual (paleta, terminal, arte generativa dos cards) deriva desse conceito único: *código virando carreira*.

## Stack

- **Vite + React** — SPA leve, build rápido
- **GSAP + ScrollTrigger** — timeline da intro, scroll storytelling, reveals
- **Lenis** — smooth scroll
- **CSS puro** — design system com tokens (`index.css`), sem framework de UI
- **Canvas 2D** — malha de pixels reativa ao mouse (fundo vivo global)
- Deploy contínuo na **Vercel** (push → build → publish automático)

## Destaques técnicos

- Intro narrativa pulável, com fase de scroll pinada (desktop) e adaptada no mobile
- Cursor customizado com estados contextuais e partículas de código no clique
- Arte pixel generativa por formação (hash → PRNG → grade simétrica, eco do logo QR do DevClub)
- Grade de formações filtrável (substituiu um protótipo de scroll horizontal sequestrado, por UX)
- "Vídeos" de depoimento sem vídeo real: transcrição ao vivo com equalizador e progresso
- Totalmente responsivo, com `prefers-reduced-motion` respeitado em todas as animações
- Deploy contínuo: cada commit na `main` atualiza a página publicada

## Rodando localmente

```bash
npm install
npm run dev
```

## Decisões de projeto

Todo o raciocínio técnico — por que cada escolha foi feita, o que mudou de ideia no meio do caminho e por quê — está documentado em [`DECISIONS.md`](./DECISIONS.md).

---

Projeto conceitual, dados ilustrativos. #semDesculpas
