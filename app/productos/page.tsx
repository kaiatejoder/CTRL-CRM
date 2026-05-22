'use client'

import { useEffect } from 'react'

export default function ProductosPage() {
  useEffect(() => {
    // Bootstrap loaded globally in layout
  }, [])

  return (
    <>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      {/* HERO */}
      <section className="prod-hero">
        <div className="container">
          <p className="section-label">Servicios y productos</p>
          <h1 className="prod-hero-title" data-i18n="hero.title">Lo que<br /><em>ofrecemos.</em></h1>
          <p className="mt-3 prod-intro-text">
            Desde identidades de marca completas hasta plantillas listas para usar. Elige lo que necesita tu proyecto.
          </p>
        </div>
      </section>

      {/* FILTROS + PRODUCTOS */}
      <section className="page-wrapper pt-0 pb-5">
        <div className="container">
          <div className="filter-bar" id="filtros-categoria"></div>
          {/* BUSCADOR */}
          <div className="busqueda-row mt-3 mb-2 d-flex gap-2 align-items-center">
            <input
              type="search"
              id="buscador-input"
              className="form-control busqueda-input"
              placeholder="Buscar productos..."
              autoComplete="off"
              style={{maxWidth: '320px'}}
              data-i18n="search.placeholder"
            />
            <button className="btn-ctrl btn-ctrl-outline" onClick={() => (window as any).buscar?.()} data-i18n="search.btn">Buscar</button>
            <button className="btn-ctrl btn-ctrl-ghost" onClick={() => (window as any).limpiarBusqueda?.()} title="Limpiar">✕</button>
          </div>
          {/* PAGINACIÓN */}
          <div id="paginacion-wrap" className="d-flex gap-1 flex-wrap mb-3"></div>
          <div className="row gy-4" id="prod-grid"></div>
        </div>
      </section>

      {/* PLANES DE SUSCRIPCIÓN */}
      <section className="planes-section" id="planes">
        <div className="container">
          <p className="section-label">Planes mensuales</p>
          <h2 className="prod-footer-cta">
            Diseño sin límites, cada mes.
          </h2>
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="plan-card">
                <div className="plan-nombre">STARTER</div>
                <div className="plan-precio">199€ <small>/mes</small></div>
                <p className="plan-desc">Para freelancers y marcas personales que necesitan apoyo creativo recurrente.</p>
                <ul className="plan-features">
                  <li>2 peticiones activas</li>
                  <li>Entrega en 48h</li>
                  <li>Revisiones ilimitadas</li>
                  <li>Formatos básicos (PNG, PDF)</li>
                </ul>
                <button
                  className="btn-add w-100"
                  onClick={(e: any) => (window as any).goToCheckout?.(e.target, 'Plan Starter — Mensual', 199, 'plan')}
                >
                  EMPEZAR ↗
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-card destacado">
                <div className="plan-nombre">PRO <span className="badge-pop">POPULAR</span></div>
                <div className="plan-precio">449€ <small>/mes</small></div>
                <p className="plan-desc">Para marcas en crecimiento que necesitan diseño constante y estrategia visual.</p>
                <ul className="plan-features">
                  <li>5 peticiones activas</li>
                  <li>Entrega en 24h</li>
                  <li>Revisiones ilimitadas</li>
                  <li>Todos los formatos</li>
                  <li>Consultoría mensual 1h</li>
                </ul>
                <button
                  className="btn-add w-100"
                  onClick={(e: any) => (window as any).goToCheckout?.(e.target, 'Plan Pro — Mensual', 449, 'plan')}
                >
                  EMPEZAR ↗
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-card">
                <div className="plan-nombre">STUDIO</div>
                <div className="plan-precio">899€ <small>/mes</small></div>
                <p className="plan-desc">Para agencias y empresas con necesidades de diseño intensivo y continuo.</p>
                <ul className="plan-features">
                  <li>Peticiones ilimitadas</li>
                  <li>Entrega en 24h</li>
                  <li>Diseñador dedicado</li>
                  <li>Todos los formatos</li>
                  <li>Consultoría mensual 4h</li>
                  <li>Acceso a plantillas premium</li>
                </ul>
                <button
                  className="btn-add w-100"
                  onClick={(e: any) => (window as any).goToCheckout?.(e.target, 'Plan Studio — Mensual', 899, 'plan')}
                >
                  EMPEZAR ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOAST */}
      <div className="ctrl-toast" id="toast">✓ Añadido al carrito</div>

      <mi-pie></mi-pie>
      <script src="/js/mis-etiquetas.js"></script>
      <script src="/js/fondo.js"></script>
      <script type="module" src="/js/carrito.js"></script>
      <script type="module" src="/js/productos.js"></script>
      <script type="module" dangerouslySetInnerHTML={{__html: `
        import { applyTranslations } from '/js/i18n.js';
        document.addEventListener('DOMContentLoaded', applyTranslations);
      `}}></script>
    </>
  )
}
