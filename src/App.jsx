import './App.css'
import { Outlet, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/ConfigFirebase";
import { useAuth } from "./Components/Auth/AuthContext";

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <header>
        {/* Si tenés Header.jsx, importalo y ponelo aquí */}
        <nav style={{ padding: 12 }}>
          <Link to="/">Inicio</Link>{" | "}
          <Link to="/login">Login</Link>{" | "}
          <Link to="/admin">Dashboard</Link>
          {user && <button onClick={() => signOut(auth)}>Salir</button>}
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}
