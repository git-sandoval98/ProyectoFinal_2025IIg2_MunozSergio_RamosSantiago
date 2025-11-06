import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Components/Pages/Login";
import PublicHome from "./Components/News/News"; // si usás News.jsx como home público
import Dashboard from "./Components/Admin/Admin"; // tu Admin.jsx
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import RoleGuard from "./Components/Auth/RoleGuard";
import { ROLES } from "./utils/constants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <PublicHome/> },
      { path: "login", element: <Login/> },
      {
        path: "admin",
        element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
        children: [
          { path: "mis-noticias", element:
              <RoleGuard allow={[ROLES.REPORTERO, ROLES.EDITOR]}>{/* componente por crear */}</RoleGuard>
          },
          { path: "todas", element:
              <RoleGuard allow={[ROLES.EDITOR]}>{/* componente por crear */}</RoleGuard>
          }
        ]
      }
    ]
  }
]);
