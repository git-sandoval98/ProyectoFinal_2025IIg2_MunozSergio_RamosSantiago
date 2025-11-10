import { useEffect, useState } from "react";
import { TextField, Button, Tabs, Tab, Box, Typography } from "@mui/material";
import { auth } from "../../Firebase/ConfigFirebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { upsertUser, getUserById } from "../../Firebase/usersService";
import { ROLES } from "../../utils/constants";
import { useToast } from "../../Components/Toast/Toast";
import { useNavigate, useLocation } from "react-router-dom";

const ERRORS = {
  "auth/invalid-email": "Email inválido.",
  "auth/user-not-found": "Usuario no encontrado.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/weak-password": "La contraseña es muy débil.",
  "auth/email-already-in-use": "Ese email ya está registrado.",
};

export default function Login() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.reason === "auth") {
      push("No tienes acceso a este apartado. Inicia sesión para continuar.", "error");
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function msg(e) {
    const code = e?.code || "";
    return ERRORS[code] || e?.message || "Ocurrió un error.";
  }

  // ---------- Registro ----------
  async function handleRegister() {
    try {
      setLoading(true);
      setError("");

      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName });

      await upsertUser(cred.user.uid, {
        displayName,
        email,
        role: ROLES.REPORTERO,
      });

      push("Cuenta creada. Ya puedes ingresar.", "success");
      setTab(0);
    } catch (e) {
      const m = msg(e);
      setError(m);
      push(m, "error");
    } finally {
      setLoading(false);
    }
  }

  // ---------- Login ----------
  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const cred = await signInWithEmailAndPassword(auth, email, pass);

      let u = await getUserById(cred.user.uid);

      if (!u) {
    
        await upsertUser(cred.user.uid, {
          displayName: cred.user.displayName || "",
          email: cred.user.email || email,
          role: ROLES.REPORTERO,
        });
        u = {
          role: ROLES.REPORTERO,
          displayName: cred.user.displayName || "",
          email: cred.user.email || email,
        };
      }

      const niceName = u.displayName || cred.user.displayName || u.email || email;
      push(`Bienvenido, ${niceName}`, "success");

      // Si venías de una ruta protegida, vuelve allí
      const from = location.state?.from || null;
      if (from) {
        return navigate(from, { replace: true });
      }

      // Redirección según rol
      if (u.role === ROLES.EDITOR || u.role === ROLES.REPORTERO) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (e) {
      const m = msg(e);
      setError(m);
      push(m, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 6 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Ingresar" />
        <Tab label="Registrar" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tab === 1 && (
          <TextField
            fullWidth
            label="Nombre"
            margin="normal"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          margin="normal"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {tab === 0 ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
            onClick={handleLogin}
          >
            Ingresar
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
            onClick={handleRegister}
          >
            Registrarme
          </Button>
        )}
      </Box>
    </Box>
  );
}
