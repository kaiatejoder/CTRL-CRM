'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function EmpresaPage() {
  useEffect(() => {
    // Bootstrap loaded globally in layout
  }, [])

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      {/* HERO */}
      <section className="port-hero">
        <div className="port-hero-bg"></div>
        <div className="hero-img-wrap"></div>
        <div className="container port-hero-content">
          <div className="hero-tag">(Esta NO soy yo)</div>
          <h1 className="hero-hola reveal">
            Hola.<br />
            Soy <em>Carla.</em>
          </h1>
          <p className="hero-desc reveal reveal-delay-1">
            Estudiante de <strong>Informática</strong> que<br />
            además hace diseño gráfico<br />y marketing digital.
          </p>
          <div className="scroll-hint reveal reveal-delay-2">Scroll para ver el trabajo</div>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="mision-section">
        <div className="container">
          <p className="mision-pre reveal">Mi misión es hacer la vida mucho más</p>
          <h2 className="mision-title reveal reveal-delay-1">
            <em>cuqui.</em>
          </h2>
          <p className="mision-sub reveal reveal-delay-2">A costa de mi cordura y un portátil roñoso</p>

          <div className="mision-grid reveal reveal-delay-3">
            <div className="mision-pill">
              <div className="mision-pill-num">+20</div>
              <div className="mision-pill-label">Proyectos</div>
              <div className="mision-pill-txt">Identidades, piezas gráficas y webs para clientes reales.</div>
            </div>
            <div className="mision-pill">
              <div className="mision-pill-num">2</div>
              <div className="mision-pill-label">Disciplinas</div>
              <div className="mision-pill-txt"> Informática + diseño gráfico. Los dos a la vez, sin disculpas.</div>
            </div>
            <div className="mision-pill">
              <div className="mision-pill-num">∞</div>
              <div className="mision-pill-label">Energéticas</div>
              <div className="mision-pill-txt">Consumidas en el proceso. Pa qué mentirte.</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRABAJO / GALERÍA */}
      <section className="trabajo-section" id="trabajo">
        <div className="container">
          <div className="trabajo-header reveal">
            <div>
              <p className="section-label">Portfolio</p>
              <h2 className="trabajo-title">Mira qué monas<br />las cosas, por favor.</h2>
            </div>
            <span className="trabajo-sub" id="proyecto-count">cargando...</span>
          </div>
          <div id="galeria-root"></div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section">
        <div className="container port-main-content">
          <div className="cta-pre reveal">Valencia, España</div>
          <h2 className="cta-title reveal reveal-delay-1">
            No tengo más cosas.<br />
            A menos que me<br />
            <em>contrates ;)</em>
          </h2>
          <p className="cta-sub reveal reveal-delay-2">¿A que diseño fenomenal?</p>
          <a href="/contacto" className="cta-btn reveal reveal-delay-3">
            Así que hazlo ↗
          </a>
        </div>
      </section>

      {/* MODAL VER PROYECTO */}
      <div className="modal fade" id="modal-ver-proyecto" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="ver-proyecto-titulo">Proyecto</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div id="ver-proyecto-img-wrap" className="mb-4">
                <img src="/img/placeholder.png" id="ver-proyecto-img" className="img-fluid rounded" alt="Proyecto" style={{width: '100%', maxHeight: '400px', objectFit: 'cover'}} />
              </div>
              <h4 id="ver-proyecto-nombre" className="mb-1"></h4>
              <p id="ver-proyecto-meta" className="text-muted mb-3"></p>
              <p id="ver-proyecto-desc" className="mb-4"></p>
              <div id="ver-proyecto-desc-completa-wrap">
                <h5>Detalles</h5>
                <p id="ver-proyecto-desc-completa" className="text-secondary"></p>
              </div>
              <div id="ver-proyecto-imgs-wrap" className="mt-4">
                <h6>Galería</h6>
                <div className="row g-3" id="ver-proyecto-imgs-container"></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="ctrl-toast" id="toast"></div>
      <mi-pie></mi-pie>

      <Script src="/js/mis-etiquetas.js" strategy="afterInteractive" />
      <Script src="/js/fondo.js" strategy="afterInteractive" />
      <Script src="/js/proyectos.js" strategy="afterInteractive" />
    </>
  )
}
