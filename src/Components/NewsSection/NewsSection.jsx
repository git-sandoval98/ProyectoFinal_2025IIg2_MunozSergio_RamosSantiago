import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { listPublished } from "../../Firebase/newsService";

function toDateSafe(value) {
  if (!value) return null;
  // Firestore Timestamp
  if (typeof value?.toDate === "function") {
    try { return value.toDate(); } catch { 
      
     }
  }
  // JS Date
  if (value instanceof Date) return value;
  // string/number -> Date
  const d = new Date(value);
  return isNaN(d) ? null : d;
}

function formatDate(value, locale = "es-ES") {
  const d = toDateSafe(value);
  if (!d) return ""; 
  return d.toLocaleDateString(locale, {
    year: "numeric", month: "short", day: "2-digit"
  });
}

export default function NewsSection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const rows = await listPublished();
      setItems(rows);
    })();
  }, []);

  const recent = useMemo(() => {
    const withDate = items.map(n => {
      const created = toDateSafe(n.createdAt);
      const updated = toDateSafe(n.updatedAt);
      const sortDate = created || updated || new Date(0);
      return { ...n, _sortDate: sortDate };
    });
    return withDate
      .sort((a, b) => b._sortDate - a._sortDate)
      .slice(0, 6);
  }, [items]);

  return (
    <section style={{ marginTop: 24 }}>
      <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="icon">📺</span> Noticias recientes
      </h2>

      <div
        className="grid cards"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 12 }}
      >
        {recent.map(n => {
          const showDate = formatDate(n.createdAt) || formatDate(n.updatedAt) || "";
          return (
            <article key={n.id} className="card" style={{ overflow: "hidden" }}>
              {n.imageUrl && (
                <div style={{ height: 160, overflow: "hidden", borderRadius: 12 }}>
                  <img
                    src={n.imageUrl}
                    alt={n.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}
              <div style={{ marginTop: 10 }}>
                <div className="small" style={{ opacity: 0.8 }}>
                  {showDate && <span className="badge">{showDate}</span>}
                </div>
                <h3 style={{ margin: "6px 0 8px" }}>{n.title}</h3>
                <Link to={`/noticia/${n.id}`} className="btn">
                  Abrir
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
