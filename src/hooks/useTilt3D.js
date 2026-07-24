// ============================================================
// useTilt3D — hook reutilizável para o efeito "Academy Skills":
// o card inclina sutilmente na direção do mouse (perspectiva 3D).
// Uso: const ref = useTilt3D(); <article ref={ref} className="tilt-3d">
//
// Matemática: a posição do mouse DENTRO do card (0 a largura/altura)
// vira um ângulo de -7 a +7 graus; o centro do card = 0 grau (sem
// inclinação); as bordas = inclinação máxima.
// ============================================================
import { useEffect, useRef } from "react";

const LIMITE_GRAUS = 7;

export default function useTilt3D() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!temMouse || reduzirMovimento) return;

    const aoMover = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-py * LIMITE_GRAUS).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * LIMITE_GRAUS).toFixed(2)}deg`);
    };
    const aoSair = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", aoMover);
    el.addEventListener("pointerleave", aoSair);
    return () => {
      el.removeEventListener("pointermove", aoMover);
      el.removeEventListener("pointerleave", aoSair);
    };
  }, []);

  return ref;
}
