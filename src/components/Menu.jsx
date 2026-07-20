// Menu — fixo no desktop; no mobile os links viram um overlay
// de tela cheia aberto pelo botão hambúrguer (estilo terminal).
import { useEffect, useState } from "react";
import "./menu.css";

const LINKS = [
  { rotulo: "Formações", href: "#formacoes" },
  { rotulo: "Faculdade", href: "#faculdade" },
  { rotulo: "Área do Aluno", href: "#plataforma" },
];

export default function Menu() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // menu aberto trava o scroll do fundo (overlay é a página agora)
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <>
      <header className={`menu ${rolou ? "menu--solido" : ""}`}>
        <a className="menu-logo" href="#topo" onClick={() => setAberto(false)}>
          <span className="menu-logo-marca">&lt;DevClub/&gt;</span>
        </a>

        <nav className="menu-links" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.rotulo}
            </a>
          ))}
        </nav>

        <div className="menu-acoes">
          <a className="menu-cta" href="#matricula">
            Quero ser aluno
          </a>
          <button
            className={`menu-hamburguer ${aberto ? "menu-hamburguer--x" : ""}`}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            onClick={() => setAberto(!aberto)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* overlay mobile: links gigantes estilo prompt */}
      <nav
        className={`menu-overlay ${aberto ? "menu-overlay--aberto" : ""}`}
        aria-label="Navegação móvel"
        aria-hidden={!aberto}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            style={{ transitionDelay: aberto ? `${0.08 + i * 0.06}s` : "0s" }}
            onClick={() => setAberto(false)}
            tabIndex={aberto ? 0 : -1}
          >
            <span aria-hidden="true">$ </span>
            {l.rotulo}
          </a>
        ))}
        <a
          className="menu-overlay-cta"
          href="#matricula"
          style={{ transitionDelay: aberto ? "0.28s" : "0s" }}
          onClick={() => setAberto(false)}
          tabIndex={aberto ? 0 : -1}
        >
          Quero ser aluno
        </a>
      </nav>
    </>
  );
}
