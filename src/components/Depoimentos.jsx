// Depoimentos — mosaico (masonry via CSS columns): alturas
// diferentes criam o ritmo visual de "muro de vidas".
import "./secoes.css";

const DEPOIMENTOS = [
  { n: "Mariana C.", c: "de vendedora a dev front end", f: "Comecei do absoluto zero. Onze meses depois, assinei meu primeiro contrato CLT como desenvolvedora." },
  { n: "João Pedro S.", c: "júnior aos 17 anos", f: "Entrei no DevClub no ensino médio. Hoje sou o dev mais novo da minha empresa." },
  { n: "Carlos H.", c: "transição aos 42", f: "Achava que era tarde. A comunidade provou o contrário: fui contratado antes de terminar a formação." },
  { n: "Aline R.", c: "full stack em fintech", f: "As mentorias semanais mudaram meu jogo. Cheguei na entrevista sabendo exatamente o que falar." },
  { n: "Rafael T.", c: "de suporte a back end", f: "O playground me deu coragem de quebrar as coisas. Quebrar me ensinou a consertar — e a ser aprovado." },
  { n: "Beatriz M.", c: "primeira dev da família", f: "A recrutadora revisou meu currículo linha por linha. Três semanas depois, três entrevistas marcadas." },
  { n: "Diego F.", c: "dev mobile remoto", f: "Trabalho hoje para uma empresa de outro estado, de casa. O mural da fama me deu visibilidade real." },
  { n: "Larissa G.", c: "analista de dados", f: "PowerBI e análise de dados me tiraram do operacional. Dobrei o salário em um ano." },
];

export default function Depoimentos() {
  return (
    <section className="secao" id="depoimentos">
      <p className="secao-comando" data-reveal>devclub log --vidas-transformadas</p>
      <h2 className="secao-titulo" data-reveal>
        Milhares de vidas <em>transformadas</em> dentro da comunidade
      </h2>

      <div className="dep-mosaico">
        {DEPOIMENTOS.map((d) => (
          <figure className="dep-card" key={d.n} data-reveal>
            <blockquote className="dep-fala">“{d.f}”</blockquote>
            <figcaption className="dep-autor">
              <span className="dep-nome">{d.n}</span>
              <span className="dep-cargo">{d.c}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
