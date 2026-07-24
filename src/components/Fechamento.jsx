// Fechamento — o loop se fecha: a página que nasceu de um
// terminal termina em um terminal, agora esperando o comando
// do PRÓPRIO visitante. CTA final + footer.
import "./secoes.css";

export default function Fechamento() {
  return (
    <>
      <section className="secao fechamento" id="matricula">
        <span className="glow-spot glow-spot--verde" style={{ width: 500, height: 500, top: "10%", left: "50%", transform: "translateX(-50%)" }} aria-hidden="true" />
        <div className="fech-terminal vidro" data-reveal>
          <div className="plat-janela-barra" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <p className="fech-linha">
            <span className="fech-prompt">$ </span>devclub init carreira
            --sua-vez<span className="fech-cursor" aria-hidden="true"></span>
          </p>
        </div>
        <h2 className="secao-titulo fech-titulo" data-reveal>
          O próximo deploy é o <em>seu</em>
        </h2>
        <a className="hero-cta fech-cta" href="#topo" data-reveal>
          Quero ser aluno
        </a>
      </section>

      <footer className="rodape">
        <span className="menu-logo-marca">&lt;DevClub/&gt;</span>
        <p className="rodape-nota">
          Página conceitual criada para o concurso DevClub · dados
          ilustrativos · #semDesculpas
        </p>
      </footer>
    </>
  );
}
