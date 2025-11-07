// src/Pages/Home/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Page from "../../Components/Page/Page";
import Card from "../../Components/Card/Card";
import { listPublished } from "../../Firebase/newsService";

export default function Home() {
  const [all, setAll] = useState([]);

  // Cargar noticias PUBLICADAS
  useEffect(() => {
    (async () => {
      const rows = await listPublished();
      setAll(rows);
    })();
  }, []);

  // Máximo 12 para portada
  const news = useMemo(() => all.slice(0, 12), [all]);

  // Secciones únicas (categoryId)
  const sections = useMemo(
    () => Array.from(new Set(all.map((n) => n.categoryId).filter(Boolean))),
    [all]
  );

  return (
    <Page>
      <h1>Portal de Noticias</h1>
      <p className="small">Noticias publicadas visibles sin autenticación.</p>

      <motion.div
        className="grid cards"
        style={{ marginTop: 16 }}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {news.map((n) => (
          <motion.div
            key={n.id}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          >
            <Card>
              {n.imageUrl && (
                <div
                  style={{
                    height: 140,
                    overflow: "hidden",
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={n.imageUrl}
                    alt={n.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}
              <span className="badge">{n.categoryId || "Sin sección"}</span>
              <h3>{n.title}</h3>
              <p>{n.subtitle}</p>
              <Link to={`/noticia/${n.id}`} className="btn">
                Leer
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <h2 style={{ marginTop: 28 }}>Secciones</h2>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))" }}
      >
        {sections.map((s) => (
          <Card key={s}>
            <strong>{s}</strong>
          </Card>
        ))}
      </div>
    </Page>
  );
}
