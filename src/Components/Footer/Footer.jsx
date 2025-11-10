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

        <nav className="social" aria-label="Redes sociales">
          {/* Reemplaza los href con enlaces reales */}
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.64 9.13 8.4 9.97v-7.05H7.9v-2.92h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.29h-1.18c-1.16 0-1.52.72-1.52 1.45v1.74h2.59l-.41 2.92h-2.18v7.05c4.76-.84 8.4-4.98 8.4-9.97z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.66.5.72.28 1.33.66 1.92 1.25.6.6.98 1.2 1.26 1.93.26.7.45 1.49.5 2.66.06 1.26.07 1.64.07 4.84s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.5 2.66-.28.72-.66 1.33-1.26 1.92-.59.6-1.2.98-1.92 1.26-.7.26-1.49.45-2.66.5-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.66-.5a5.3 5.3 0 0 1-1.92-1.26 5.3 5.3 0 0 1-1.26-1.92c-.26-.7-.45-1.49-.5-2.66C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.96.5-2.66.28-.72.66-1.33 1.26-1.93.6-.59 1.2-.97 1.92-1.25.7-.26 1.49-.45 2.66-.5C8.42 2.21 8.8 2.2 12 2.2Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2H21l-6.48 7.41L22 22h-6.59l-4.1-5.38L6.3 22H3.54l6.94-7.94L2 2h6.73l3.73 5.02L18.24 2Zm-2.31 18h2.01L8.17 4H6.07l9.86 16Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.43 22h4.13V7.98H.43V22ZM8.12 7.98H4.04V22h4.08v-7.2c0-3.84 4.96-4.15 4.96 0V22h4.08v-8.54c0-6.5-7.42-6.27-9.04-3.07V7.98Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.26 3.4.96.11-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19a10.98 10.98 0 0 1 5.8 0c2.2-1.5 3.16-1.19 3.16-1.19.63 1.59.23 2.77.11 3.06.75.82 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 7.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C17.63 3.8 12 3.8 12 3.8h-.01s-5.63 0-8.19.34c-.46.05-1.46.06-2.36 1C.73 5.86.5 7.5.5 7.5S.27 9.44.27 11.38v1.23c0 1.94.23 3.88.23 3.88s.23 1.64.94 2.36c.9.94 2.08.91 2.61 1.02 1.9.18 8 .34 8 .34s5.63 0 8.19-.34c.46-.05 1.46-.06 2.36-1 .71-.72.94-2.36.94-2.36s.23-1.94.23-3.88v-1.23C23.73 9.44 23.5 7.5 23.5 7.5ZM9.8 14.83V8.77l6.18 3.03-6.18 3.03Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 8.24a7.9 7.9 0 0 1-4.56-1.46v6.91a5.84 5.84 0 1 1-5.84-5.84c.3 0 .6.03.89.08v2.57a3.29 3.29 0 1 0 2.4 3.16V2.5h2.14a5.77 5.77 0 0 0 5 2.85v2.9h-.03Z"/></svg>
          </a>
        </nav>
      </div>

      <div className="legal">
        <small>© {year} • Proyecto Final Programación Web • Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}
