// ============================================================
// FundoVivo.jsx — malha de pixels reativa, agora GLOBAL:
// canvas FIXO cobrindo a viewport, atrás do site inteiro.
// A página rola por cima; a malha fica, reagindo ao mouse em
// qualquer dobra. Visibilidade aumentada (v2).
// ============================================================
import { useEffect, useRef } from "react";

export default function FundoVivo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // telas pequenas: malha mais espaçada (menos pontos por frame
    // = economia de bateria; no celular não há mouse, só a respiração)
    const ESPACO = window.innerWidth < 640 ? 58 : 44;
    const RAIO = 180;    // alcance maior do cursor
    const TAM = 2.6;     // pixel maior

    let largura = 0;
    let altura = 0;
    let pontos = [];
    let rafId = null;
    const mouse = { x: -9999, y: -9999 };

    const montarMalha = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pontos = [];
      for (let y = ESPACO / 2; y < altura; y += ESPACO) {
        for (let x = ESPACO / 2; x < largura; x += ESPACO) {
          pontos.push({ x, y, fase: Math.random() * Math.PI * 2 });
        }
      }
    };

    const desenharQuadro = (t) => {
      ctx.clearRect(0, 0, largura, altura);
      for (const p of pontos) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const perto = Math.max(0, 1 - dist / RAIO);

        const empurrao = perto * perto * 16;
        const px = p.x + (dist > 0 ? (dx / dist) * empurrao : 0);
        const py = p.y + (dist > 0 ? (dy / dist) * empurrao : 0);

        const respira = reduzirMovimento
          ? 0.4
          : (Math.sin(t / 1400 + p.fase) + 1) / 2;

        // v2: alphas maiores — a malha agora é personagem, não rumor
        const alfa = 0.1 + respira * 0.09 + perto * 0.65;
        ctx.fillStyle =
          perto > 0.02
            ? `rgba(61, 220, 90, ${alfa})`
            : `rgba(150, 118, 210, ${alfa})`;
        const tam = TAM + perto * 2.6;
        ctx.fillRect(px - tam / 2, py - tam / 2, tam, tam);
      }
      rafId = requestAnimationFrame(desenharQuadro);
    };

    montarMalha();

    if (reduzirMovimento) {
      desenharQuadro(0); // um quadro estático (respira fixo em 0.4)
      if (rafId) cancelAnimationFrame(rafId);
      return;
    }

    const aoMover = (e) => {
      mouse.x = e.clientX; // canvas fixo na viewport: coords diretas
      mouse.y = e.clientY;
    };
    const aoSair = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerleave", aoSair);
    window.addEventListener("resize", montarMalha);
    rafId = requestAnimationFrame(desenharQuadro);
    // (sem IntersectionObserver: o canvas fixo está sempre visível;
    // em aba oculta o próprio rAF congela sozinho)

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerleave", aoSair);
      window.removeEventListener("resize", montarMalha);
    };
  }, []);

  return <canvas className="fundo-vivo" ref={canvasRef} aria-hidden="true" />;
}
