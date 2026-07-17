// ============================================================
// Hero.jsx — intro "a página que se compila" (Fases 0-4)
// Detalhes didáticos completos: ver DECISIONS.md e a auditoria
// final do projeto.
// ============================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./hero.css";

gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);

const COMANDO = "$ devclub init carreira --from-zero";

const LOGS = [
  "instalando lógica de programação ... ok",
  "configurando react + node ......... ok",
  "conectando você à comunidade ...... ok",
  "modo #semDesculpas ativado ........ ok",
  "fazendo deploy da sua carreira ....",
];

const HEADLINE = ["Do", "zero", "ao", "contratado."];

export default function Hero() {
  const escopoRef = useRef(null);
  const tlRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const reduzirMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Fase 4 — criada só quando a intro termina (fotografia
      // dos valores iniciais; ver DECISIONS.md)
      const iniciarFaseScroll = contextSafe(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: escopoRef.current,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: 1,
            },
          })
          .to(".hero-scroll-dica", { opacity: 0, duration: 0.15 }, 0)
          .to(".hero-conteudo", { y: -90, opacity: 0.1, duration: 1 }, 0)
          .to(".hero", { backgroundColor: "#0d0716", duration: 1 }, 0);
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: iniciarFaseScroll,
      });
      tlRef.current = tl;

      // FASE 0 — boot
      tl.to(".terminal-comando", { text: COMANDO, duration: 1.3, ease: "none" });

      // FASE 1 — compile (0.45 de stagger p/ dar tempo de leitura)
      tl.to(
        ".terminal-log",
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.45 },
        "+=0.2"
      );

      // FASE 2 — morph
      tl.to(
        ".terminal",
        { opacity: 0, scale: 1.06, duration: 0.5, ease: "power3.in" },
        "+=0.7"
      );
      tl.set(".terminal", { display: "none" });
      tl.to(".hero", { backgroundColor: "#1a0b2e", duration: 0.8 }, "<");
      tl.to(
        ".palavra",
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" },
        "<+0.1"
      );
      tl.to(".hero-sub", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      tl.to(".hero-cta", { y: 0, opacity: 1, duration: 0.6 }, "-=0.45");
      tl.to(".hero-empresas", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      tl.to(".hero-scroll-dica", { opacity: 1, duration: 0.8 }, "-=0.2");

      if (reduzirMovimento) tl.progress(1);
    },
    { scope: escopoRef }
  );

  // Skip da intro por qualquer interação
  useEffect(() => {
    const pular = () => tlRef.current?.progress(1);
    const opcoes = { once: true, passive: true };
    window.addEventListener("wheel", pular, opcoes);
    window.addEventListener("touchstart", pular, opcoes);
    window.addEventListener("keydown", pular, opcoes);
    window.addEventListener("pointerdown", pular, opcoes);
    return () => {
      window.removeEventListener("wheel", pular);
      window.removeEventListener("touchstart", pular);
      window.removeEventListener("keydown", pular);
      window.removeEventListener("pointerdown", pular);
    };
  }, []);

  return (
    <section className="hero" ref={escopoRef} id="topo">
      <div className="terminal" aria-hidden="true">
        <div className="terminal-janela">
          <div className="terminal-barra">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="terminal-linha">
            <span className="terminal-comando"></span>
            <span className="terminal-cursor"></span>
          </p>
          {LOGS.map((linha) => (
            <p className="terminal-log" key={linha}>
              {linha}
            </p>
          ))}
        </div>
      </div>

      <div className="hero-conteudo">
        <h1 className="hero-titulo">
          {HEADLINE.map((palavra) => (
            <span className="palavra-mascara" key={palavra}>
              <span className="palavra">{palavra}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">
          +25 mil alunos já passaram por aqui — e estão nas maiores
          empresas do Brasil e do mundo.
        </p>

        <a className="hero-cta" href="#formacoes">
          Quero ser aluno
        </a>

        {/* faixa de empresas: marquee infinito em CSS puro */}
        <div className="hero-empresas" aria-label="Empresas que contratam alunos">
          <p className="hero-empresas-rotulo">alunos contratados em</p>
          <div className="marquee">
            <div className="marquee-trilho" aria-hidden="true">
              {[...Array(2)].map((_, i) => (
                <span className="marquee-grupo" key={i}>
                  <span>TechNova</span>
                  <span>Bankly</span>
                  <span>DataForge</span>
                  <span>CloudBR</span>
                  <span>PixelPay</span>
                  <span>Orbitta</span>
                  <span>Nexo Labs</span>
                  <span>Loopz</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-scroll-dica">role para começar</div>
      </div>
    </section>
  );
}
