import React from "react";
import Page from "../../Components/Page/Page";

export default function NotFound() {
  return (
    <Page>
      <h1>Página no encontrada</h1>
      <p className="small">La ruta solicitada no existe.</p>
      <a href="/" className="btn">Volver al Inicio</a>
    </Page>
  );
}
