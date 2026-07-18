// ============================================================
// FundoVivo.jsx — malha de pixels reativa ao mouse (canvas)
// Uma grade de "pixels" roxos apagados cobre o hero; perto do
// cursor eles acendem em verde e se afastam de leve (repulsão),
// com uma respiração ambiente sutil. Continua o motivo pixel/QR
// da identidade.
// Performance: canvas 2D (um único elemento, milhares de pontos),
// pausa via IntersectionObserver quando o hero sai da tela, e
// dpr limitado a 2 (retina sem pagar 3x de pixels).
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

    const ESPACO = 46;  // px entre pontos da malha
    const RAIO = 150;   // alcance da influência do mouse
    const TAM = 2.2;    // tamanho base do pixel

    let largura = 0;
    let altura = 0;
    let pontos = [];
    let rafId = null;
    let rodando = false;
    const mouse = { x: -9999, y: -9999 };

    const montarMalha = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = canvas.offsetWidth;
      altura = canvas.offsetHeight;
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pontos = [];
      for (let y = ESPACO / 2; y < altura; y += ESPACO) {
        for (let x = ESPACO / 2; x < largura; x += ESPACO) {
          // fase aleatória: cada pixel respira fora de sincronia
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
        const perto = Math.max(0, 1 - dist / RAIO); // 0 longe → 1 em cima

        // repulsão: quadrática p/ ser forte só bem perto do cursor
        const empurrao = perto * perto * 14;
        const px = p.x + (dist > 0 ? (dx / dist) * empurrao : 0);
        const py = p.y + (dist > 0 ? (dy / dist) * empurrao : 0);

        // respiração ambiente (0..1), desligada em reduced motion
        const respira = reduzirMovimento
          ? 0
          : (Math.sin(t / 1400 + p.fase) + 1) / 2;

        const alfa = 0.05 + respira * 0.05 + perto * 0.55;
        ctx.fillStyle =
          perto > 0.02
            ? `rgba(61, 220, 90, ${alfa})`   // verde: tocado pelo cursor
            : `rgba(122, 92, 180, ${alfa})`; // roxo: estado de repouso
        const tam = TAM + perto * 2.4;
        ctx.fillRect(px - tam / 2, py - tam / 2, tam, tam);
      }
      rafId = requestAnimationFrame(desenharQuadro);
    };

    const ligar = () => {
      if (rodando) return;
      rodando = true;
      rafId = requestAnimationFrame(desenharQuadro);
    };
    const desligar = () => {
      rodando = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    montarMalha();

    if (reduzirMovimento) {
      // versão estática: um único desenho, sem loop nem mouse
      desenharQuadro(0);
      desligar();
    } else {
      const aoMover = (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      const aoSair = () => {
        mouse.x = -9999;
        mouse.y = -9999;
      };
      window.addEventListener("pointermove", aoMover, { passive: true });
      window.addEventListener("pointerleave", aoSair);
      window.addEventListener("resize", montarMalha);

      // pausa o loop quando o hero sai da viewport: canvas
      // animando fora da tela é bateria e CPU no lixo
      const observador = new IntersectionObserver(
        ([entrada]) => (entrada.isIntersecting ? ligar() : desligar()),
        { threshold: 0 }
      );
      observador.observe(canvas);

      return () => {
        desligar();
        observador.disconnect();
        window.removeEventListener("pointermove", aoMover);
        window.removeEventListener("pointerleave", aoSair);
        window.removeEventListener("resize", montarMalha);
      };
    }

    return desligar;
  }, []);

  return <canvas className="fundo-vivo" ref={canvasRef} aria-hidden="true" />;
}
