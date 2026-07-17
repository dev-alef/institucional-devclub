// Professores — retratos fictícios (randomuser.me: retratos
// licenciados para mockups; concurso permite conteúdo inventado).
// Fallback: se a foto falhar, voltam as iniciais.
import { useState } from "react";
import "./secoes.css";

const TIME = [
  { n: "Rodolfo Mori", area: "Fundador · Full Stack", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { n: "Fernanda", area: "Front End · React", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
  { n: "Agustinho", area: "Back End · Node", foto: "https://randomuser.me/api/portraits/men/45.jpg" },
  { n: "Henrique", area: "Mobile", foto: "https://randomuser.me/api/portraits/men/22.jpg" },
  { n: "Márcio", area: "IA e Automações", foto: "https://randomuser.me/api/portraits/men/67.jpg" },
  { n: "Juliana", area: "Análise de Dados", foto: "https://randomuser.me/api/portraits/women/65.jpg" },
  { n: "Mateus", area: "DevOps", foto: "https://randomuser.me/api/portraits/men/11.jpg" },
];

const iniciais = (nome) =>
  nome.split(" ").map((p) => p[0]).slice(0, 2).join("");

function Retrato({ pessoa }) {
  const [falhou, setFalhou] = useState(false);
  if (falhou) {
    return (
      <span className="prof-avatar" aria-hidden="true">
        {iniciais(pessoa.n)}
      </span>
    );
  }
  return (
    <img
      className="prof-foto"
      src={pessoa.foto}
      alt=""
      loading="lazy"
      onError={() => setFalhou(true)}
    />
  );
}

export default function Professores() {
  return (
    <section className="secao" id="professores">
      <p className="secao-comando" data-reveal>devclub team --list</p>
      <h2 className="secao-titulo" data-reveal>
        Aprenda com os <em>melhores</em>
      </h2>

      <div className="prof-grade">
        {TIME.map((p) => (
          <article className="prof-card" key={p.n} data-reveal>
            <Retrato pessoa={p} />
            <h3 className="prof-nome">{p.n}</h3>
            <p className="prof-area">{p.area}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
