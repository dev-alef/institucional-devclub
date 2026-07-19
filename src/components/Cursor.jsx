// ============================================================
// Cursor.jsx (v3) — fusão do design gerado no Claude Design
// com a engenharia do componente anterior.
// Do design importado: barra piscante de terminal (ponto),
//   anel com glow, rótulo contextual (data-cursor-text),
//   partículas de glifos de código.
// Da engenharia nossa: componente React com CLEANUP completo
//   (o script original era IIFE sem desmontagem — no StrictMode/
//   HMR ele se duplicava), detecção de alvo DENTRO do pointermove
//   (lição da v2), guarda de reduced-motion e (hover:hover).
// Decisão de design: partículas só no CLIQUE (explosão), não no
//   movimento — a malha do fundo já responde ao movimento; cada
//   estímulo do usuário merece UMA única resposta visual.
// ============================================================
import { useEffect } from "react";
import "./cursor.css";

const GLIFOS = "01<>/{};*+=$";
const ALVOS = "a, button, [data-cursor-text]";

export default function Cursor() {
  useEffect(() => {
    const temMouse = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!temMouse || reduzirMovimento) return;

    document.documentElement.classList.add("cursor-customizado");

    // peças criadas via DOM (fora do fluxo do React de propósito:
    // vivem colados no body, acima de tudo, e morrem no cleanup)
    const criar = (classe) => {
      const d = document.createElement("div");
      d.className = classe;
      document.body.appendChild(d);
      return d;
    };
    const barra = criar("dc-barra");
    const anel = criar("dc-anel");
    const rotulo = criar("dc-rotulo");

    let mx = -100, my = -100;   // posição real do mouse
    let rx = -100, ry = -100;   // posição atrasada do anel (lerp)
    let sobreAlvo = false;
    let pressionado = false;
    let rafId = null;

    // ---------- partículas: explosão de glifos no clique ----------
    const soltarGlifo = (x, y) => {
      const p = document.createElement("span");
      p.className = "dc-glifo";
      p.textContent = GLIFOS[Math.floor(Math.random() * GLIFOS.length)];
      const alcance = 26 + Math.random() * 26;
      const angulo = Math.random() * Math.PI * 2;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.fontSize = `${11 + Math.random() * 5}px`;
      p.style.setProperty("--dx", `${Math.cos(angulo) * alcance}px`);
      p.style.setProperty("--dy", `${Math.sin(angulo) * alcance + 14}px`);
      p.style.animationDuration = `${0.55 + Math.random() * 0.35}s`;
      document.body.appendChild(p);
      p.addEventListener("animationend", () => p.remove());
    };
    const explodir = (x, y) => {
      for (let i = 0; i < 7; i++) soltarGlifo(x, y);
    };

    // ---------- eventos ----------
    const aoMover = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // detecção no MESMO evento do movimento (lição da v2)
      const alvo = e.target?.closest?.(ALVOS) || null;
      sobreAlvo = !!alvo;
      const texto = alvo?.getAttribute?.("data-cursor-text") || "";
      if (texto) rotulo.textContent = texto;
      rotulo.style.opacity = texto ? "1" : "0";
    };
    const aoApertar = (e) => {
      pressionado = true;
      explodir(e.clientX, e.clientY);
    };
    const aoSoltar = () => (pressionado = false);
    const aoSairJanela = () => {
      barra.style.opacity = "0";
      anel.style.opacity = "0";
      rotulo.style.opacity = "0";
    };
    const aoEntrarJanela = () => {
      barra.style.opacity = "";
      anel.style.opacity = "";
    };

    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerdown", aoApertar);
    window.addEventListener("pointerup", aoSoltar);
    document.documentElement.addEventListener("pointerleave", aoSairJanela);
    document.documentElement.addEventListener("pointerenter", aoEntrarJanela);

    // ---------- loop: lerp manual do anel ----------
    // rx += (alvo - atual) * 0.16 => o anel percorre 16% da
    // distância por frame: perseguição elástica (mesma família
    // matemática do lerp do Lenis)
    const tique = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const escalaAnel = sobreAlvo ? (pressionado ? 1.5 : 1.9) : pressionado ? 0.85 : 1;
      const escalaBarra = sobreAlvo ? 1.25 : 1;
      barra.style.transform =
        `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${escalaBarra})`;
      anel.style.transform =
        `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${escalaAnel})`;
      rotulo.style.transform =
        `translate(${rx}px, ${ry + 30}px) translate(-50%, 0)`;
      rafId = requestAnimationFrame(tique);
    };
    rafId = requestAnimationFrame(tique);

    // ---------- cleanup: tudo que nasce aqui, morre aqui ----------
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerdown", aoApertar);
      window.removeEventListener("pointerup", aoSoltar);
      document.documentElement.removeEventListener("pointerleave", aoSairJanela);
      document.documentElement.removeEventListener("pointerenter", aoEntrarJanela);
      barra.remove();
      anel.remove();
      rotulo.remove();
      document.querySelectorAll(".dc-glifo").forEach((p) => p.remove());
      document.documentElement.classList.remove("cursor-customizado");
    };
  }, []);

  return null; // as peças vivem no body via JS; o componente é só o ciclo de vida
}
