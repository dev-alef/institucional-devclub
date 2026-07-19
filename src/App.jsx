// App.jsx — esqueleto da página: Lenis (scroll), reveals
// globais por scroll e a ordem das dobras.
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import FundoVivo from "./components/FundoVivo";
import Cursor from "./components/Cursor";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Formacoes from "./components/Formacoes";
import Diferenciais from "./components/Diferenciais";
import Plataforma from "./components/Plataforma";
import Depoimentos from "./components/Depoimentos";
import Professores from "./components/Professores";
import Faculdade from "./components/Faculdade";
import Fechamento from "./components/Fechamento";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  // Lenis: um relógio só para scroll + GSAP (ver DECISIONS.md)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Reveals globais: todo [data-reveal] sobe e aparece quando
  // entra na viewport. UM sistema para a página inteira —
  // cada seção só marca o atributo, sem repetir lógica.
  useGSAP(() => {
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduzirMovimento) return; // CSS já deixa tudo visível

    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // dispara quando o topo do el cruza 85% da tela
          toggleActions: "play none none none", // toca 1x e pronto
        },
      });
    });
  });

  return (
    <>
      <FundoVivo />
      <Cursor />
      <Menu />
      <main>
        <Hero />
        <Formacoes />
        <Diferenciais />
        <Plataforma />
        <Depoimentos />
        <Professores />
        <Faculdade />
        <Fechamento />
      </main>
    </>
  );
}
