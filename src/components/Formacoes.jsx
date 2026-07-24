// Formações — grade filtrável por categoria.
// (v1 era scroll horizontal pinado; removido: sequestrar o
// scroll vertical do usuário é pedágio — ver DECISIONS.md)
// Cada card tem uma ARTE PIXEL GENERATIVA única, derivada do
// nome da formação — eco do logo QR do DevClub.
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useTilt3D from "../hooks/useTilt3D";
import "./formacoes.css";

const FORMACOES = [
  { nome: "Programação Full Stack", tag: "formação completa", cat: "formacoes", cmd: "fullstack" },
  { nome: "Programação Front End", tag: "formação completa", cat: "formacoes", cmd: "frontend" },
  { nome: "Programação Back End", tag: "formação completa", cat: "formacoes", cmd: "backend" },
  { nome: "Programação Mobile", tag: "formação completa", cat: "formacoes", cmd: "mobile" },
  { nome: "JavaScript Completo", tag: "linguagem", cat: "tech", cmd: "javascript" },
  { nome: "React", tag: "biblioteca", cat: "tech", cmd: "react" },
  { nome: "Node", tag: "runtime", cat: "tech", cmd: "node" },
  { nome: "HTML5 + CSS3", tag: "fundamentos", cat: "tech", cmd: "html-css" },
  { nome: "Gestor de IA", tag: "carreira em ia", cat: "ia", cmd: "gestor-ia" },
  { nome: "IA e Automações", tag: "inteligência artificial", cat: "ia", cmd: "ia-auto" },
  { nome: "Claude & Claude Code", tag: "inteligência artificial", cat: "ia", cmd: "claude" },
  { nome: "Trilha N8N", tag: "automação", cat: "ia", cmd: "n8n" },
  { nome: "Análise de Dados", tag: "dados", cat: "dados", cmd: "dados" },
  { nome: "PowerBI", tag: "dados", cat: "dados", cmd: "powerbi" },
];

const CATEGORIAS = [
  { id: "todas", rotulo: "todas" },
  { id: "formacoes", rotulo: "formações" },
  { id: "tech", rotulo: "linguagens & libs" },
  { id: "ia", rotulo: "ia & automações" },
  { id: "dados", rotulo: "dados" },
];

// ---------- arte pixel generativa ----------
// hash simples: transforma o nome em um número-semente.
// Mesmo nome => mesma arte, sempre (determinístico).
function semente(texto) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32: gerador pseudoaleatório a partir da semente —
// "aleatório reproduzível", a alma de arte generativa.
function criarRng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// card com tilt 3D próprio (cada card precisa do SEU hook,
// não dá pra compartilhar um ref entre múltiplos elementos)
function CardFormacao({ f, i }) {
  const tiltRef = useTilt3D();
  return (
    <article className="form-card tilt-3d" ref={tiltRef}>
      <PixelArte nome={f.nome} />
      <p className="form-card-cmd">$ devclub add {f.cmd}</p>
      <div className="form-card-base">
        <span className="form-card-indice">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="form-card-nome">{f.nome}</h3>
        <span className="form-card-tag">{f.tag}</span>
      </div>
    </article>
  );
}

function PixelArte({ nome }) {
  const rng = criarRng(semente(nome));
  const N = 7; // grade 7x7, como um mini QR
  const celulas = [];
  for (let y = 0; y < N; y++) {
    // espelhamos a metade esquerda na direita: simetria dá
    // "cara de símbolo" (mesmo truque dos identicons do GitHub)
    for (let x = 0; x < Math.ceil(N / 2); x++) {
      const r = rng();
      if (r < 0.42) continue; // célula vazia
      const cor = r > 0.82 ? "var(--destaque)" : "#3b2560";
      celulas.push({ x, y, cor });
      if (x !== N - 1 - x) celulas.push({ x: N - 1 - x, y, cor });
    }
  }
  return (
    <svg
      className="form-card-arte"
      viewBox={`0 0 ${N} ${N}`}
      aria-hidden="true"
    >
      {celulas.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="0.92" height="0.92" fill={c.cor} rx="0.12" />
      ))}
    </svg>
  );
}

export default function Formacoes() {
  const escopoRef = useRef(null);
  const [categoria, setCategoria] = useState("todas");

  const visiveis = FORMACOES.filter(
    (f) => categoria === "todas" || f.cat === categoria
  );

  // Reanima os cards a cada troca de filtro: o array de
  // dependências re-executa o efeito quando `categoria` muda.
  useGSAP(
    () => {
      gsap.fromTo(
        ".form-card",
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: "power3.out" }
      );
    },
    { scope: escopoRef, dependencies: [categoria] }
  );

  return (
    <section className="formacoes secao" id="formacoes" ref={escopoRef}>
      <p className="secao-comando" data-reveal>devclub list --formacoes</p>
      <h2 className="secao-titulo" data-reveal>
        Formações completas, do <em>zero</em> ao avançado
      </h2>
      <p className="secao-sub" data-reveal>
        Trilhas para aprender as principais tecnologias do mercado, de forma
        didática, com os melhores do mercado. Filtre pelo seu objetivo.
      </p>

      <div className="form-filtros" role="tablist" aria-label="Filtrar formações" data-reveal>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={categoria === c.id}
            className={`form-filtro ${categoria === c.id ? "form-filtro--ativo" : ""}`}
            onClick={() => setCategoria(c.id)}
          >
            {c.rotulo}
          </button>
        ))}
      </div>

      <div className="form-grade">
        {visiveis.map((f, i) => (
          <CardFormacao f={f} i={i} key={f.cmd} />
        ))}

        <article className="form-card form-card--cta">
          <h3 className="form-card-nome">Tudo isso em uma única assinatura</h3>
          <a className="form-card-botao" href="#matricula">Quero começar</a>
        </article>
      </div>
    </section>
  );
}
