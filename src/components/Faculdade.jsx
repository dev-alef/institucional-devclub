// Faculdade + bônus — reconhecimento MEC e módulos extras.
import "./secoes.css";

const BONUS = [
  "Inglês para devs",
  "LinkedIn magnético",
  "Freelas do zero",
  "Oratória para entrevistas",
  "Finanças para PJ",
  "Git avançado",
];

export default function Faculdade() {
  return (
    <section className="secao" id="faculdade">
      <div className="fac-grade">
        <div data-reveal>
          <p className="secao-comando">devclub verify --diploma</p>
          <h2 className="secao-titulo">
            Escola reconhecida pelo <em>MEC</em>, com diplomas oficiais
          </h2>
          <p className="secao-sub">
            Formação com peso de faculdade e velocidade de mercado: diploma
            oficial para quem precisa do papel, prática real para quem
            precisa do emprego.
          </p>
          <span className="fac-selo" data-reveal>
            <span className="fac-selo-check" aria-hidden="true">✓</span>
            Reconhecimento MEC · Diploma oficial
          </span>
        </div>

        <div data-reveal>
          <h3 className="fac-bonus-titulo">Módulos bônus para ir mais longe</h3>
          <ul className="fac-bonus-lista">
            {BONUS.map((b) => (
              <li className="fac-bonus-item" key={b}>
                <span aria-hidden="true">+</span> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
