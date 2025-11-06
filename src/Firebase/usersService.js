import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./ConfigFirebase";

export async function upsertUser(uid, { displayName, email, role = "REPORTERO" }) {
  await setDoc(
    doc(db, "users", uid),
    {
      displayName: displayName ?? "",
      email: email ?? "",
      role,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}
