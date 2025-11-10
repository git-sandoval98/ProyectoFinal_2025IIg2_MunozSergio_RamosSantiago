import "./App.css";
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/ConfigFirebase";
import { useAuth } from "./Components/Auth/AuthContext";
import { useToast } from "./Components/Toast/Toast";
import Footer from "./Components/Footer/Footer";

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
      <header className="site-header">
        <nav className="site-nav">
          <div className="nav-left">
            <Link to="/">Inicio</Link>
            <Link to="/login">Login</Link>
            <Link to="/admin">Dashboard</Link>
          </div>

          <div className="nav-right">
            {user ? (
              <>
                <span className="user-info">
                  Hola{" "}
                  <strong>{user.displayName || user.email?.split("@")[0]}</strong>{" "}
                  –{" "}
                  <em>
                    {user.role === "EDITOR"
                      ? "Editor"
                      : user.role === "REPORTERO"
                      ? "Reportero"
                      : "Usuario"}
                  </em>
                </span>
                <button className="btn-logout" onClick={doLogout}>
                  Salir
                </button>
              </>
            ) : null}
          </div>
        </nav>
      </header>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
