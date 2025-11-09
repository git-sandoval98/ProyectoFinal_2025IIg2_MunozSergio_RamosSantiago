import React from "react";
import { useAuth } from "./AuthContext";

export default function RoleGuard({ allow = [], children }) {
  const { user } = useAuth();
  if (!user) return null;
  if (!allow.includes(user.role)) {
    return (
      <div style={{padding:16}}>
        <h3>Acceso restringido</h3>
        <p className="small">No tienes permisos para ver esta sección.</p>
      </div>
    );
  }
  return children;
}
