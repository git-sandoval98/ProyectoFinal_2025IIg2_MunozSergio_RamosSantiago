import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Page from "../../Components/Page/Page";
import { listPublished } from "../../Firebase/newsService";

export default function News() {
  const [all, setAll] = useState([]);
  const [q, setQ] = useState("");
  const [sec, setSec] = useState("");

  useEffect(() => {
    (async () => {
      const rows = await listPublished();
      setAll(rows);
    })();
  }, []);

  const sections = useMemo(
    () => Array.from(new Set(all.map((n) => n.categoryId).filter(Boolean))),
    [all]
  );

  const news = useMemo(() => {
    const qLower = q.toLowerCase();
    return all.filter((n) => {
      const okQ =
        !q ||
        `${n.title ?? ""} ${n.subtitle ?? ""} ${n.content ?? ""}`
          .toLowerCase()
          .includes(qLower);
      const okS = !sec || n.categoryId === sec;
      return okQ && okS;
    });
  }, [all, q, sec]);

  return (
    <Page>
      <h1>Todas las noticias</h1>

      <div className="grid" style={{ gridTemplateColumns: "1fr 220px" }}>
        <input
          className="input"
          placeholder="Buscar..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="select"
          value={sec}
          onChange={(e) => setSec(e.target.value)}
        >
          <option value="">Todas las secciones</option>
          {sections.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <table className="table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Sección</th>
            <th>Autor</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {news.map((n) => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.categoryId}</td>
              <td>{n.authorName}</td>
              <td>
                <span className="badge">{n.state}</span>
              </td>
              <td>
                <Link to={`/noticia/${n.id}`} className="btn">
                  Abrir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
