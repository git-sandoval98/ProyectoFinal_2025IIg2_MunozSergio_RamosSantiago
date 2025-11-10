import { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import Page from "../../Components/Page/Page";
import MButton from "../../Components/MiButton/MButton";
import { useToast } from "../../Components/Toast/Toast";

import { createNews, listMyNews, updateNews } from "../../Firebase/newsService";
import { NEWS_STATE } from "../../utils/constants";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MyPosts() {
  const { user } = useAuth();
  const { push } = useToast();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    categoryId: "Tecnología",
    content: "",
    imagePreview: "", // solo preview local (sin Storage por ahora)
  });

  async function load() {
    if (!user?.uid) return;
    const rows = await listMyNews(user.uid);
    setItems(rows);
  }

  useEffect(() => { load(); }, [user?.uid]);

  // Preview local de imagen (aún no subimos a Storage)
  function onPickImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, imagePreview: ev.target.result }));
    reader.readAsDataURL(file);
  }

  async function onCreate(e) {
    e.preventDefault();
    if (!form.title.trim()) return push("El título es obligatorio", "error");

    const id = await createNews({
      title: form.title,
      subtitle: form.subtitle,
      content: form.content,
      categoryId: form.categoryId,
      authorId: user.uid,
      authorName: user.displayName || user.email,
      state: NEWS_STATE.EDICION,
      imageUrl: "", // cuando se active Storage, aquí guardaremos la URL real
    });

    setForm({ title: "", subtitle: "", categoryId: "Tecnología", content: "", imagePreview: "" });
    push("Borrador guardado en Edición", "success");
    await load();
    console.log("Nueva noticia:", id);
  }

  async function markDone(id) {
    await updateNews(id, { state: NEWS_STATE.TERMINADO });
    push("Marcado como Terminado", "success");
    await load();
  }

  return (
    <Page>
      <h1>Mis noticias</h1>

      <form className="card" onSubmit={onCreate}>
        <div className="form-row">
          <label>Título</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
        </div>

        <div className="form-row">
          <label>Subtítulo</label>
          <input
            className="input"
            value={form.subtitle}
            onChange={(e) => setForm(f => ({ ...f, subtitle: e.target.value }))}
          />
        </div>

        <div className="form-row">
          <label>Sección</label>
          <select
            className="select"
            value={form.categoryId}
            onChange={(e) => setForm(f => ({ ...f, categoryId: e.target.value }))}
          >
            <option>Tecnología</option>
            <option>Deportes</option>
            <option>Política</option>
            <option>Cultura</option>
          </select>
        </div>

        <div className="form-row">
          <label>Imagen (opcional)</label>
          <input type="file" accept="image/*" className="input" onChange={onPickImage} />
          {form.imagePreview && (
            <div style={{ height: 160, overflow: "hidden", borderRadius: 12, marginTop: 8 }}>
              <img
                src={form.imagePreview}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Contenido</label>
          <ReactQuill theme="snow" value={form.content} onChange={(v) => setForm(f => ({ ...f, content: v }))} />
        </div>

        <MButton className="primary">Guardar en Edición</MButton>
      </form>

      <h2 style={{ marginTop: 24 }}>Borradores y finalizadas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Sección</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((n) => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.categoryId}</td>
              <td><span className="badge">{n.state}</span></td>
              <td>
                {(n.state === NEWS_STATE.EDICION || n.state === NEWS_STATE.TERMINADO) && (
                  <MButton onClick={() => markDone(n.id)}>Marcar Terminado</MButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
