import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../Components/Auth/AuthContext";
import Page from "../../Components/Page/Page";
import Card from "../../Components/Card/Card";
import { ROLES } from "../../utils/constants";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Page>
      <h1>Panel administrativo</h1>
      <p className="small">Acceso restringido para usuarios autenticados.</p>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 16 }}
      >
        {user?.role === ROLES.REPORTERO && (
          <Card>
            <h3>Mis noticias</h3>
            <p>
              Crear, editar y marcar como <strong>Terminado</strong>.
            </p>
            <Link to="mis-noticias" className="btn">
              Abrir
            </Link>
          </Card>
        )}

        {user?.role === ROLES.EDITOR && (
          <Card>
            <h3>Todas las noticias</h3>
            <p>
              Aprobar, <strong>Publicar</strong>, <strong>Desactivar</strong> y editar.
            </p>
            <Link to="todas" className="btn">
              Abrir
            </Link>
          </Card>
        )}
      </div>
      <div style={{ marginTop: 24 }}>
        <Outlet />
      </div>
    </Page>
  );
}
