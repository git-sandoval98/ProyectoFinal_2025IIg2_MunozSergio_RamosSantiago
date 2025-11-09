import React from "react";
import Page from "../Page/Page";

export default function ErrorFallback({ error }) {
  console.error(error);
  return (
    <Page>
      <h1>Ocurrió un problema</h1>
      <p className="small">
        Algo salió mal al cargar la página. Intenta recargar o volver al inicio.
      </p>
      {error?.message && (
        <pre style={{whiteSpace:"pre-wrap", background:"#f6f6f6", padding:12, borderRadius:8}}>
          {error.message}
        </pre>
      )}
      <a className="btn" href="/">Ir al Inicio</a>
    </Page>
  );
}
