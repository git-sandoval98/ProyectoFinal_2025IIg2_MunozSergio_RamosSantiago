import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/ConfigFirebase";
import { doc, getDoc } from "firebase/firestore";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) { setUser(null); setLoading(false); return; }
      const snap = await getDoc(doc(db, "users", fbUser.uid));
      setUser({
        uid: fbUser.uid,
        email: fbUser.email ?? "",
        displayName: fbUser.displayName ?? "",
        ...(snap.exists() ? snap.data() : { role: undefined })
      });
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return <AuthCtx.Provider value={{ user, loading }}>{children}</AuthCtx.Provider>;
}
