import { useState } from "react";
import { TextField, Button, Tabs, Tab, Box, Typography } from "@mui/material";
import { auth } from "../../Firebase/ConfigFirebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { upsertUser } from "../../Firebase/usersService";
import { ROLES } from "../../utils/constants";

export default function Login() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    try {
      setLoading(true); setError("");
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName });
      await upsertUser(cred.user.uid, { displayName, email, role: ROLES.REPORTERO });
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  async function handleLogin() {
    try {
      setLoading(true); setError("");
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 6 }}>
      <Tabs value={tab} onChange={(_,v)=>setTab(v)} centered>
        <Tab label="Ingresar" />
        <Tab label="Registrar" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tab === 1 && (
          <TextField fullWidth label="Nombre" margin="normal"
            value={displayName} onChange={e=>setDisplayName(e.target.value)} />
        )}
        <TextField fullWidth label="Email" type="email" margin="normal"
          value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField fullWidth label="Contraseña" type="password" margin="normal"
          value={pass} onChange={e=>setPass(e.target.value)} />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        {tab === 0 ? (
          <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading} onClick={handleLogin}>
            Ingresar
          </Button>
        ) : (
          <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading} onClick={handleRegister}>
            Registrarme
          </Button>
        )}
      </Box>
    </Box>
  );
}
