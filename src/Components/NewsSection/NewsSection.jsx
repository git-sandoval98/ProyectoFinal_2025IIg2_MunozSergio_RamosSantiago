import "./NewsSection.css";
import n1 from "../../assets/news/news1.png";
import n2 from "../../assets/news/news2.png";
import n3 from "../../assets/news/news3.png";

const DEFAULT_ITEMS = [
  { id: 1, title: "Tecnología en el aula", excerpt: "Instalamos nuevas computadoras para el aula de medios.", image: n1, tag: "Escuela", date: "2025-11-09" },
  { id: 2, title: "Kermés solidaria", excerpt: "Gracias a la comunidad por apoyar nuestra kermés.", image: n2, tag: "Comunidad", date: "2025-11-02" },
  { id: 3, title: "Donativo de equipos", excerpt: "Seguimos tocando puertas: 18/32 equipos logrados.", image: n3, tag: "Aula de medios", date: "2025-11-08" },
];

export default function NewsSection({ items = DEFAULT_ITEMS }) {
  return (
    <section className="news-wrap" aria-labelledby="news-title">
      <div className="news-head">
        <h2 id="news-title">
          <span className="ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M3 5h18v2H3V5Zm0 4h12v10H3V9Zm14 0h4v10h-4V9Z" /></svg>
          </span>
          Noticias recientes
        </h2>
      </div>

      <div className="news-grid">
        {items.map((it) => (
          <article className="news-card" key={it.id}>
            <div className="thumb">
              <img src={it.image} alt={it.title} loading="lazy" />
              <span className="tag">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h7l7 7Z" /></svg>
                {it.tag}
              </span>
            </div>
            <div className="info">
              <h3 className="title">{it.title}</h3>
              <p className="excerpt">{it.excerpt}</p>
              <div className="meta">
                <span className="date">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 15H5V10h14v9Z" /></svg>
                  {new Date(it.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
