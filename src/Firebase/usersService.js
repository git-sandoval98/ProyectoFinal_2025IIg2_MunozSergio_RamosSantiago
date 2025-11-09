import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./ConfigFirebase";

const COLLECTION = "users";

export async function upsertUser(uid, { displayName, email, role = "REPORTERO" }) {
  const ref = doc(db, COLLECTION, uid);
  await setDoc(
    ref,
    {
      displayName: displayName ?? "",
      email: email ?? "",
      role,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserById(uid) {
  const ref = doc(db, COLLECTION, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
