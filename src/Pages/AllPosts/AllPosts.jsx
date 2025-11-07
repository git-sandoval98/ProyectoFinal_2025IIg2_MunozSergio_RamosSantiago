import { useEffect, useState } from "react";
import Page from "../../Components/Page/Page";
import MButton from "../../Components/MiButton/MButton";
import { useToast } from "../../Components/Toast/Toast";

import { listAllNews, updateNews as updateNewsSvc } from "../../Firebase/newsService";
import { NEWS_STATE } from "../../utils/constants";

export default function AllPosts() {
  const [items, setItems] = useState([]);
  const { push } = useToast();

  async function load() {
    const rows = await listAllNews();
    setItems(rows);
  }

  useEffect(() => { load(); }, []);

  async function publish(id) {
    await updateNewsSvc(id, { state: NEWS_STATE.PUBLICADO });
    push("Noticia publicada", "success");
    await load();
  }
  async function disable(id) {
    await updateNewsSvc(id, { state: NEWS_STATE.DESACTIVADO });
    push("Noticia desactivada", "info");
    await load();
  }
  async function toEdit(id) {
    await updateNewsSvc(id, { state: NEWS_STATE.EDICION });
    push("Devuelta a Edición", "info");
    await load();
  }

  return (
    <Page>
      <h1>Gestión editorial</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Portada</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((n) => (
            <tr key={n.id}>
              <td style={{ width: 80 }}>
                {n.imageUrl && (
                  <img
                    src={n.imageUrl}
                    alt=""
                    style={{ width: 80, height: 48, objectFit: "cover", borderRadius: 6 }}
                  />
                )}
              </td>
              <td>{n.title}</td>
              <td>{n.authorName}</td>
              <td>
                <span className="badge">{n.state}</span>
              </td>
              <td>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <MButton onClick={() => publish(n.id)}>Publicar</MButton>
                  <MButton className="ghost" onClick={() => disable(n.id)}>Desactivar</MButton>
                  <MButton onClick={() => toEdit(n.id)}>Devolver a Edición</MButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
