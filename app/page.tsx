'use client'

import { useEffect } from 'react'

export default function HomePage() {
  useEffect(() => {
    // Initialize any client-side code here
  }, [])

  return (
    <>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 order-lg-1">
              <h1 className="hero-title">
                Lo que tu<br />
                <em className="marca">marca</em><br />
                necesita.
              </h1>
              <p className="hero-subtitle">
                Convertimos marcas en movimientos.
                Rompemos esquemas, hackeamos algoritmos. Perdemos el <img src="/img/ctrlWordmark.svg" alt="CTRL" className="hero-logo" />
              </p>
              <div className="hero-ctas">
                <a href="/productos" className="btn-ctrl btn-ctrl-primary">Ver servicios ↗</a>
                <a href="/empresa" className="btn-ctrl btn-ctrl-outline">Sobre nosotros</a>
              </div>
            </div>
            <div className="col-lg-6 order-lg-2">
              <div className="mockup-carousel-wrapper">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="mockup-dot"></div>
                  <span className="mockup-handle">@ctrlstudio.co</span>
                </div>
                <div id="mockupCarousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#mockupCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#mockupCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#mockupCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="/img/MOCKUP1.png" className="d-block w-100 mockup-image" alt="Branding Completo" />
                      <div className="carousel-caption d-none d-md-block">
                        <button className="mockup-btn">BRANDING COMPLETO ↗</button>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="/img/MOCKUP1.png" className="d-block w-100 mockup-image" alt="Identidad Visual" />
                      <div className="carousel-caption d-none d-md-block">
                        <button className="mockup-btn">IDENTIDAD VISUAL ↗</button>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="/img/MOCKUP1.png" className="d-block w-100 mockup-image" alt="Diseño Estratégico" />
                      <div className="carousel-caption d-none d-md-block">
                        <button className="mockup-btn">DISEÑO ESTRATÉGICO ↗</button>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#mockupCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#mockupCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS STRIP */}
      <section className="services-strip">
        <div className="container">
          <p className="section-label">Qué hacemos</p>
          <div className="service-item">
            <span className="service-name">Identidad &amp; Branding</span>
            <span className="service-tag">DISEÑO</span>
          </div>
          <div className="service-item">
            <span className="service-name">Plantillas Gráficas</span>
            <span className="service-tag">DESCARGA</span>
          </div>
          <div className="service-item">
            <span className="service-name">Planes Mensuales</span>
            <span className="service-tag">SUSCRIPCIÓN</span>
          </div>
          <div className="service-item">
            <span className="service-name">Consultoría Visual</span>
            <span className="service-tag">ESTRATEGIA</span>
          </div>
        </div>
      </section>

      {/* CARRUSEL DE TRABAJOS */}
      <section className="works-section">
        <div className="container mb-4">
          <p className="section-label">Trabajos recientes</p>
        </div>
        <div className="carousel-track" id="carousel-root"></div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-section">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-7">
              <p className="section-label">Quiénes somos</p>
              <h2 className="about-title">
                Somos <em>más</em><br />que un estudio.
              </h2>
              <div className="row stats-row gy-4 mt-2">
                <div className="col-4">
                  <div className="stat-item">
                    <div className="stat-number">80+</div>
                    <div className="stat-label">PROYECTOS</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <div className="stat-number">3</div>
                    <div className="stat-label">AÑOS</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">DEDICACIÓN</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="frost-card p-4 p-lg-5">
                <p className="about-intro-text">
                  CTRL Studio nace de la mente de una chalada de 20 años que se ha puesto como propósito hacer que la vida sea más cuqui
                </p>
                <a href="/empresa" className="btn-ctrl btn-ctrl-outline mt-4 d-inline-flex">Conoce nuestra historia →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <mi-pie></mi-pie>

      <script src="/js/mis-etiquetas.js"></script>
      <script src="/js/fondo.js"></script>
      <script src="/js/proyectos.js"></script>
    </>
  )
}
