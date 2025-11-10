import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import Page from "../../Components/Page/Page";
import { getNews } from "../../Firebase/newsService";
import { NEWS_STATE } from "../../utils/constants";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar noticia desde Firestore
  useEffect(() => {
    async function fetchNews() {
      const data = await getNews(id);
      if (data && data.state === NEWS_STATE.PUBLICADO) {
        setNews(data);
      } else {
        setNews(null);
      }
      setLoading(false);
    }
    fetchNews();
  }, [id]);

  if (loading) {
    return <Page><div>Cargando...</div></Page>;
  }

  if (!news) {
    return <Page><div>No encontrada o no publicada</div></Page>;
  }

  return (
    <Page>
      <Link to="/" className="btn ghost">← Volver</Link>

      <motion.article
        className="card"
        style={{ marginTop: 16 }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <span className="badge">
          {news.categoryId} • {new Date(news.createdAt).toLocaleDateString()}
        </span>

        <h1 style={{ margin: "8px 0" }}>{news.title}</h1>
        <p className="small">Por {news.authorName}</p>

        {news.imageUrl && (
          <div
            style={{
              height: 320,
              overflow: "hidden",
              borderRadius: 12,
              margin: "8px 0 12px 0",
            }}
          >
            <img
              src={news.imageUrl}
              alt={news.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: news.content }} />
      </motion.article>
    </Page>
  );
}
