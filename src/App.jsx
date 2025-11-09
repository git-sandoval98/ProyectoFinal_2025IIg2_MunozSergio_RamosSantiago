import './App.css'
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/ConfigFirebase";
import { useAuth } from "./Components/Auth/AuthContext";
import { useToast } from "./Components/Toast/Toast";

export default function App() {
  const { user } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  async function doLogout() {
    await signOut(auth);
    push("Sesión cerrada", "info");
    navigate("/", { replace: true });
  }

  return (
    <>
      <header>
        <nav style={{ padding: 12 }}>
          <Link to="/">Inicio</Link>{" | "}
          <Link to="/login">Login</Link>{" | "}
          <Link to="/admin">Dashboard</Link>{" "}
          {user && <button onClick={doLogout}>Salir</button>}
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}
