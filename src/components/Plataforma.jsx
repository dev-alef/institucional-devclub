// Plataforma — grade bento: uma célula grande (a plataforma) e
// células menores orbitando (recursos).
import "./secoes.css";

const RECURSOS = [
  { t: "Trilhas e formações", d: "Cursos organizados por trilhas: você sempre sabe o próximo passo." },
  { t: "Comunidade de alunos", d: "Networking, dúvidas e parcerias dentro da própria plataforma." },
  { t: "Club Agents", d: "IAs treinadas no método DevClub para acelerar seu progresso." },
  { t: "Playground de treino", d: "Ambiente para praticar sem medo de quebrar nada." },
  { t: "Mural da fama", d: "Alunos destaque expostos para todo o clube — e recrutadores." },
  { t: "Área de vagas", d: "Oportunidades exclusivas direto no seu painel." },
];

export default function Plataforma() {
  return (
    <section className="secao" id="plataforma">
      <p className="secao-comando" data-reveal>devclub open --plataforma</p>
      <h2 className="secao-titulo" data-reveal>
        Uma plataforma <em>moderna</em>, com tudo em um só lugar
      </h2>
      <p className="secao-sub" data-reveal>
        Aulas, comunidade, vagas e IAs para acelerar seu progresso — com
        suporte dos professores em cada etapa.
      </p>

      <div className="plat-grade">
        <article className="plat-celula plat-celula--principal" data-reveal>
          <div className="plat-janela" aria-hidden="true">
            <div className="plat-janela-barra">
              <span></span><span></span><span></span>
            </div>
            <p className="plat-janela-linha">▸ aula 12 — API REST com Node</p>
            <p className="plat-janela-linha plat-janela-linha--ok">✓ projeto enviado para correção</p>
            <p className="plat-janela-linha">▸ próxima mentoria: quinta, 20h</p>
          </div>
          <h3 className="plat-titulo">Plataforma de ensino</h3>
          <p className="dif-desc">
            Projetos práticos e reais, do primeiro commit ao deploy.
          </p>
        </article>

        {RECURSOS.map((r) => (
          <article className="plat-celula" key={r.t} data-reveal>
            <h3 className="plat-titulo">{r.t}</h3>
            <p className="dif-desc">{r.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
