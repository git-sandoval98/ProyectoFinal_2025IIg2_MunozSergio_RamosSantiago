import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// OJO: si tu AuthContext exporta por defecto, este import está bien.
// Si no, usa: import { AuthProvider } from "./Components/Auth/AuthContext";
import AuthProvider from "./Components/Auth/AuthContext";

// Toast provider/hook
import { ToastProvider } from "./Components/Toast/Toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
