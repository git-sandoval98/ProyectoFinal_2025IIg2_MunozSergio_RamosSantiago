import { createBrowserRouter } from "react-router-dom";

import App from "./App";

// Público
import Home from "./Pages/Home/Home";
import News from "./Pages/News/News"; 
import NewsDetail from "./Pages/NewsDetail/NewsDetail";
import Login from "./Pages/Login/Login";

// Admin
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyPosts from "./Pages/MyPosts/MyPosts";
import AllPosts from "./Pages/AllPosts/AllPosts";

import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import RoleGuard from "./Components/Auth/RoleGuard";
import { ROLES } from "./utils/constants";

// 404
import ErrorFallback from "./Components/Errors/ErrorFallback";
import NotFound from "./Pages/Errors/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      // Home pública
      { index: true, element: <Home /> },

      // Otras páginas públicas
      { path: "noticias", element: <News /> },
      { path: "noticia/:id", element: <NewsDetail /> },

      // Auth
      { path: "login", element: <Login /> },

      // Panel administrativo (protegido)
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "mis-noticias",
            element: (
              <RoleGuard allow={[ROLES.REPORTERO, ROLES.EDITOR]}>
                <MyPosts />
              </RoleGuard>
            ),
          },
          {
            path: "todas",
            element: (
              <RoleGuard allow={[ROLES.EDITOR]}>
                <AllPosts />
              </RoleGuard>
            ),
          },
          // { path: "*", element: <NotFound /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
