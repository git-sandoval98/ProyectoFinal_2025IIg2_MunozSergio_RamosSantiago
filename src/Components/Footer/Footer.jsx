import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="brand">
          <span className="made-with">Hecho con ❤️ por</span>
          <strong className="names">Sergio Andrés Muñoz Sandoval · Santiago Ramos Almario</strong>

          <div className="team">
            <span className="team-label">Roles del equipo:</span>
            <ul className="team-list">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z"/></svg>
                <span className="member"><strong>Sergio Andrés Muñoz Sandoval</strong> — Desarrollo Web Backend</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm18.71-10.2a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82Z"/></svg>
                <span className="member"><strong>Santiago Ramos Almario</strong> — Desarrollo Web Fronted</span>
              </li>
            </ul>
          </div>
        </div>

<nav className="social" aria-label="Redes del proyecto">

  <a
    href="https://github.com/git-sandoval98/ProyectoFinal_2025IIg2_MunozSergio_RamosSantiago"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub del proyecto"
    className="social-link"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.26 3.4.96.11-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19a10.98 10.98 0 0 1 5.8 0c2.2-1.5 3.16-1.19 3.16-1.19.63 1.59.23 2.77.11 3.06.75.82 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
    </svg>
  </a>

  <a
    href="https://console.firebase.google.com/u/0/project/pfg2-munozsergio-ramossantiago/overview"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Firebase del proyecto"
    className="social-link"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 20.5 4.24 3.47a.5.5 0 0 1 .92-.2l3.52 6.51L13.31 1.5a.5.5 0 0 1 .88.1l6.7 19.05L12 22.5 3 20.5Z" />
    </svg>
  </a>

  <a
    href="https://vercel.com/git-sandoval98s-projects/proyectofinal2025-2g2munozsergio_ramossantiago"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Vercel del proyecto"
    className="social-link"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l10 18H2z" />
    </svg>
  </a>
</nav>

      </div>

      <div className="legal">
        <small>© {year} • Proyecto Final Programación Web • Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}
