// Menu fixo: aparece deslizando após a intro (delay via CSS)
// e ganha fundo translúcido quando a página rola.
import { useEffect, useState } from "react";
import "./menu.css";

export default function Menu() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header className={`menu ${rolou ? "menu--solido" : ""}`}>
      <a className="menu-logo" href="#topo">
        <span className="menu-logo-marca">&lt;DevClub/&gt;</span>
      </a>
      <nav className="menu-links" aria-label="Navegação principal">
        <a href="#formacoes">Formações</a>
        <a href="#faculdade">Faculdade</a>
        <a href="#plataforma">Área do Aluno</a>
      </nav>
      <a className="menu-cta" href="#matricula">
        Quero ser aluno
      </a>
    </header>
  );
}
