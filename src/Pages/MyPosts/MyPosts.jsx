import { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import Page from "../../Components/Page/Page";
import MButton from "../../Components/MiButton/MButton";
import { useToast } from "../../Components/Toast/Toast";

import { createNews, listMyNews, updateNews } from "../../Firebase/newsService";
import { NEWS_STATE } from "../../utils/constants";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { supabase } from "../../lib/supabase";

export default function MyPosts() {
  const { user } = useAuth();
  const { push } = useToast();

  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    categoryId: "Tecnología",
    content: "",
    imagePreview: "",
    imageFile: null,
  });

  async function load() {
    if (!user?.uid) return;
    const rows = await listMyNews(user.uid);
    setItems(rows);
  }

  useEffect(() => { load(); }, [user?.uid]);

  function onPickImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      push("Selecciona un archivo de imagen válido.", "error");
      return;
    }
    const MAX = 5 * 1024 * 1024;
    if (file.size > MAX) {
      push("La imagen supera los 5 MB.", "error");
      return;
    }

    setForm((f) => ({ ...f, imageFile: file }));

    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((f) => ({ ...f, imagePreview: ev.target.result }));
    reader.readAsDataURL(file);
  }

  async function uploadToSupabase(file, uid) {
    if (!file) return "";

    try {
      setUploading(true);

      const cleanName = file.name.replace(/[^\w.\-]+/g, "_");
      const fileName = `${Date.now()}_${cleanName}`;
      const filePath = `news/${uid}/${fileName}`;

      const { error: upErr, data } = await supabase
        .storage
        .from("images")
        .upload(filePath, file, {
          upsert: false,
          cacheControl: "3600",
          contentType: file.type || "image/*",
        });

      if (upErr) {
         const code = upErr?.status || upErr?.code;
        if (code === 401 || code === 403) {
          throw new Error(
            "No tienes permiso para subir imágenes (RLS bloquea la operación). Revisa las políticas de INSERT en el bucket 'images'."
          );
        }
        if (code === 400) {
          throw new Error(
            "El servidor rechazó la subida (400). Verifica el bucket 'images' y la ruta."
          );
        }
        throw upErr;
      }

      // Obtener URL pública
      const { data: pub } = supabase
        .storage
        .from("images")
        .getPublicUrl(filePath);

      return pub?.publicUrl || "";
    } finally {
      setUploading(false);
    }
  }

  // ------- Crear noticia --------
  async function onCreate(e) {
    e.preventDefault();
    if (!form.title.trim()) return push("El título es obligatorio", "error");
    if (!user?.uid) return push("Debes iniciar sesión.", "error");

    try {
      setSaving(true);

      let imageUrl = "";
      if (form.imageFile) {
        imageUrl = await uploadToSupabase(form.imageFile, user.uid);
      }

      const id = await createNews({
        title: form.title,
        subtitle: form.subtitle,
        content: form.content,
        categoryId: form.categoryId,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        state: NEWS_STATE.EDICION,
        imageUrl,
      });

      setForm({
        title: "",
        subtitle: "",
        categoryId: "Tecnología",
        content: "",
        imagePreview: "",
        imageFile: null,
      });

      push("Borrador guardado en Edición", "success");
      await load();
      console.log("Nueva noticia:", id);
    } catch (err) {
      console.error(err);
      push(err.message || "No se pudo guardar la noticia.", "error");
    } finally {
      setSaving(false);
    }
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
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />
        </div>

        <div className="form-row">
          <label>Subtítulo</label>
          <input
            className="input"
            value={form.subtitle}
            onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
          />
        </div>

        <div className="form-row">
          <label>Sección</label>
          <select
            className="select"
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
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
          {uploading && (
            <p className="small" style={{ marginTop: 6, opacity: .8 }}>
              Subiendo imagen…
            </p>
          )}
        </div>

        <div className="form-row">
          <label>Contenido</label>
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={(v) => setForm((f) => ({ ...f, content: v }))}
          />
        </div>

        <MButton className="primary" disabled={saving || uploading}>
          {uploading ? "Subiendo imagen…" : saving ? "Guardando…" : "Guardar en Edición"}
        </MButton>
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
