// "Tudo além do código" — os diferenciais humanos do DevClub.
// Layout: lista editorial numerada estilo changelog de terminal.
import "./secoes.css";

const ITENS = [
  { t: "Recrutadora semanal", d: "Acompanhamento com a nossa recrutadora toda semana, do currículo à negociação." },
  { t: "Terapeuta de alta performance", d: "Porque carreira acelerada precisa de mente saudável." },
  { t: "Mentorias semanais", d: "Com os melhores profissionais de tecnologia do mercado." },
  { t: "Agentes de IA 24h", d: "Dezenas de agentes treinados para destravar seu código a qualquer hora." },
  { t: "Suporte humano 7 dias", d: "Gente de verdade respondendo, todos os dias da semana." },
  { t: "Comunidade gigante", d: "A maior e melhor comunidade de profissionais de tecnologia do Brasil." },
  { t: "Vagas exclusivas", d: "Área de vagas que só alunos DevClub acessam." },
];

export default function Diferenciais() {
  return (
    <section className="secao" id="diferenciais">
      <p className="secao-comando" data-reveal>devclub run --alem-do-codigo</p>
      <h2 className="secao-titulo" data-reveal>
        Tudo que você precisa <em>além do código</em> para evoluir mais rápido
      </h2>

      <ul className="dif-lista">
        {ITENS.map((item, i) => (
          <li className="dif-item" key={item.t} data-reveal>
            <span className="dif-indice">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="dif-titulo">{item.t}</h3>
              <p className="dif-desc">{item.d}</p>
            </div>
            <span className="dif-check" aria-hidden="true">ok</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
