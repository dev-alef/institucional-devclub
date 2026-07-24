// Professores — cards estilo "recomendado por profissionais":
// foto grande no topo, aspas de destaque, texto sobre gradiente.
import "./secoes.css";

const TIME = [
  { n: "Rodolfo Mori", area: "Fundador · Full Stack", foto: "https://randomuser.me/api/portraits/men/32.jpg", fala: "Ensinar programação mudou minha vida. Ver um aluno conseguir o primeiro emprego é o motivo de tudo isso existir." },
  { n: "Fernanda", area: "Front End · React", foto: "https://randomuser.me/api/portraits/women/44.jpg", fala: "React não é sobre decorar sintaxe. É sobre pensar em componentes — e isso eu ensino do zero." },
  { n: "Agustinho", area: "Back End · Node", foto: "https://randomuser.me/api/portraits/men/45.jpg", fala: "Back end bom é invisível: o usuário nunca percebe, só sente que tudo funciona." },
  { n: "Henrique", area: "Mobile", foto: "https://randomuser.me/api/portraits/men/22.jpg", fala: "Ensinar mobile é ensinar a pensar em quem usa com uma mão só, no ônibus, com 3G." },
  { n: "Márcio", area: "IA e Automações", foto: "https://randomuser.me/api/portraits/men/67.jpg", fala: "IA não substitui quem programa. Substitui quem não aprendeu a usar IA." },
  { n: "Juliana", area: "Análise de Dados", foto: "https://randomuser.me/api/portraits/women/65.jpg", fala: "Todo dado conta uma história. Meu trabalho é ensinar você a ouvir essa história." },
];

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
            <div className="prof-card-foto-wrap">
              <img className="prof-card-foto" src={p.foto} alt="" loading="lazy" />
              <span className="prof-card-aspas" aria-hidden="true">"</span>
            </div>
            <blockquote className="prof-card-fala">{p.fala}</blockquote>
            <div className="prof-card-rodape">
              <h3 className="prof-nome">{p.n}</h3>
              <p className="prof-area">{p.area}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
