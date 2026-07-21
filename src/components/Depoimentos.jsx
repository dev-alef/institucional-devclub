// Depoimentos — mosaico de texto + "vídeos" de depoimento.
// DECISÃO: sem vídeo real (conteúdo fictício permitido; mp4 de
// banco pesaria MB e fugiria do tema). O card de vídeo toca como
// TRANSCRIÇÃO AO VIVO: play → barra de progresso + equalizador
// pulsando + fala digitando palavra por palavra (legenda de
// terminal). Vídeo sem vídeo: microinteração real, zero assets.
import { useEffect, useRef, useState } from "react";
import "./secoes.css";

const VIDEOS = [
  {
    n: "Mariana C.",
    c: "de vendedora a dev front end",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
    fala: "Eu vendia roupa no shopping e estudava de madrugada. Onze meses depois assinei meu primeiro contrato como desenvolvedora. Ninguém acreditava — hoje ninguém duvida.",
  },
  {
    n: "Carlos H.",
    c: "transição de carreira aos 42",
    foto: "https://randomuser.me/api/portraits/men/52.jpg",
    fala: "Achava que programação era coisa de moleque de vinte anos. A comunidade me provou o contrário: fui contratado antes de terminar a formação.",
  },
  {
    n: "Larissa G.",
    c: "analista de dados",
    foto: "https://randomuser.me/api/portraits/women/33.jpg",
    fala: "PowerBI me tirou do operacional. Em um ano dobrei o salário e hoje apresento os números que antes eu só digitava.",
  },
];

const DEPOIMENTOS = [
  { n: "João Pedro S.", c: "júnior aos 17 anos", foto: "https://randomuser.me/api/portraits/men/75.jpg", f: "Entrei no DevClub no ensino médio. Hoje sou o dev mais novo da minha empresa." },
  { n: "Aline R.", c: "full stack em fintech", foto: "https://randomuser.me/api/portraits/women/26.jpg", f: "As mentorias semanais mudaram meu jogo. Cheguei na entrevista sabendo exatamente o que falar." },
  { n: "Rafael T.", c: "de suporte a back end", foto: "https://randomuser.me/api/portraits/men/41.jpg", f: "O playground me deu coragem de quebrar as coisas. Quebrar me ensinou a consertar — e a ser aprovado." },
  { n: "Beatriz M.", c: "primeira dev da família", foto: "https://randomuser.me/api/portraits/women/57.jpg", f: "A recrutadora revisou meu currículo linha por linha. Três semanas depois, três entrevistas marcadas." },
  { n: "Diego F.", c: "dev mobile remoto", foto: "https://randomuser.me/api/portraits/men/29.jpg", f: "Trabalho hoje para uma empresa de outro estado, de casa. O mural da fama me deu visibilidade real." },
];

// duração do "playback": ritmo de fala (~0.26s por palavra) + respiro
const duracaoDe = (fala) => fala.split(" ").length * 0.26 + 1.2;
const formatar = (seg) =>
  `0:${String(Math.round(seg)).padStart(2, "0")}`;

function VideoDepoimento({ v }) {
  const [tocando, setTocando] = useState(false);
  const timerRef = useRef(null);
  const palavras = v.fala.split(" ");
  const duracao = duracaoDe(v.fala);

  const alternar = () => {
    if (tocando) {
      clearTimeout(timerRef.current);
      setTocando(false);
      return;
    }
    setTocando(true);
    // fim do "vídeo": volta ao estado de capa
    timerRef.current = setTimeout(() => setTocando(false), duracao * 1000);
  };

  // higiene: componente desmontado não pode deixar timer vivo
  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <article className={`dep-video ${tocando ? "dep-video--tocando" : ""}`}>
      <div className="dep-video-tela">
        {/* capa: foto + play */}
        <img className="dep-video-foto" src={v.foto} alt="" loading="lazy" />
        <button
          className="dep-video-play"
          onClick={alternar}
          aria-label={
            tocando
              ? `Pausar depoimento de ${v.n}`
              : `Reproduzir depoimento de ${v.n}`
          }
          aria-pressed={tocando}
        >
          {tocando ? "❚❚" : "▶"}
        </button>

        {/* transcrição ao vivo: palavras com atraso escalonado */}
        <p className="dep-video-transcricao" aria-hidden={!tocando}>
          {palavras.map((p, i) => (
            <span
              key={i}
              className="dep-video-palavra"
              style={{ animationDelay: tocando ? `${0.4 + i * 0.26}s` : "0s" }}
            >
              {p}{" "}
            </span>
          ))}
        </p>

        {/* equalizador (5 barras) */}
        <span className="dep-video-eq" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </span>

        {/* barra de progresso: anima por CSS na duração exata */}
        <span
          className="dep-video-progresso"
          style={{ animationDuration: `${duracao}s` }}
          aria-hidden="true"
        />
      </div>

      <figcaption className="dep-autor">
        <span className="dep-nome">{v.n}</span>
        <span className="dep-cargo">
          {v.c} · <span className="dep-video-dur">▸ {formatar(duracao)}</span>
        </span>
      </figcaption>
    </article>
  );
}

export default function Depoimentos() {
  return (
    <section className="secao" id="depoimentos">
      <p className="secao-comando" data-reveal>devclub log --vidas-transformadas</p>
      <h2 className="secao-titulo" data-reveal>
        Milhares de vidas <em>transformadas</em> dentro da comunidade
      </h2>

      {/* trilha de "vídeos" */}
      <div className="dep-videos">
        {VIDEOS.map((v) => (
          <div key={v.n} data-reveal>
            <VideoDepoimento v={v} />
          </div>
        ))}
      </div>

      {/* mosaico de texto */}
      <div className="dep-mosaico">
        {DEPOIMENTOS.map((d) => (
          <figure className="dep-card" key={d.n} data-reveal>
            <blockquote className="dep-fala">“{d.f}”</blockquote>
            <figcaption className="dep-autor dep-autor--com-foto">
              <img className="dep-avatar" src={d.foto} alt="" loading="lazy" />
              <span>
                <span className="dep-nome">{d.n}</span>
                <span className="dep-cargo">{d.c}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
