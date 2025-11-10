import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./ConfigFirebase";

const col = collection(db, "news");

// -- Helpers --------------------------------------------------------------

function tsToMillis(v) {
  if (!v) return v ?? null;
  return typeof v.toMillis === "function" ? v.toMillis() : v;
}

function mapDoc(d) {
  const data = d.data() || {};
  return {
    id: d.id,
    ...data,
    createdAt: tsToMillis(data.createdAt),
    updatedAt: tsToMillis(data.updatedAt),
  };
}

// -- Writes ---------------------------------------------------------------

export async function createNews(data) {
  const payload = {
    title: data.title,
    subtitle: data.subtitle ?? "",
    content: data.content ?? "",
    categoryId: data.categoryId ?? "",
    imageUrl: data.imageUrl ?? "",
    authorId: data.authorId,
    authorName: data.authorName,
    state: data.state ?? "Edición",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(col, payload);
  return ref.id;
}

export async function updateNews(id, data) {
  await updateDoc(doc(db, "news", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// -- Reads ----------------------------------------------------------------

export async function getNews(id) {
  const snap = await getDoc(doc(db, "news", id));
  return snap.exists() ? mapDoc(snap) : null;
}

export async function listMyNews(uid) {
  const q = query(col, where("authorId", "==", uid), orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
}

export async function listPublished() {
  const q = query(col, where("state", "==", "Publicado"), orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
}

export async function listAllNews() {
  const q = query(col, orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
}
