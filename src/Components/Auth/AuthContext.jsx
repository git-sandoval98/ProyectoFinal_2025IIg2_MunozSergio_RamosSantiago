import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/ConfigFirebase";
import { doc, getDoc } from "firebase/firestore";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const buildUser = useCallback((fbUser, extra = {}) => {
    return {
      uid: fbUser.uid,
      email: fbUser.email ?? "",
      displayName: fbUser.displayName ?? "",
      ...extra,
      role:
        typeof extra.role === "string"
          ? extra.role.toUpperCase()
          : undefined,
    };
  }, []);

  const fetchUserDoc = useCallback(async (uid) => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : {};
  }, []);

  const refreshUser = useCallback(async () => {
    const fbUser = auth.currentUser;
    if (!fbUser) {
      setUser(null);
      return;
    }
    try {
      const data = await fetchUserDoc(fbUser.uid);
      setUser(buildUser(fbUser, data));
    } catch (e) {
      console.error("Error refreshing user:", e);
      setUser(buildUser(fbUser));
    }
  }, [buildUser, fetchUserDoc]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const data = await fetchUserDoc(fbUser.uid);
        setUser(buildUser(fbUser, data));
      } catch (e) {
        console.error("Error reading user doc:", e);
        setUser(buildUser(fbUser));
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [buildUser, fetchUserDoc]);

  return (
    <AuthCtx.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthCtx.Provider>
  );
}
