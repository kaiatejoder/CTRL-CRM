'use client'

import { useEffect } from 'react'

export default function CarritoPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Import cart functions from global scope
      declare global {
        var getCart: () => any[]
        var updateQty: (nombre: string, delta: number) => void
        var removeFromCart: (nombre: string) => void
        var showToast: (msg: string) => void
      }

      const renderCarrito = () => {
        const cart = (window as any).getCart?.() || []
        const contenido = document.getElementById("carrito-contenido")
        if (!contenido) return

        if (cart.length === 0) {
          contenido.innerHTML = `
            <div class="carrito-vacio">
              <div class="carrito-vacio-icon">🛒</div>
              <h3 class="empty-cart-heading">Tu carrito está vacío</h3>
              <p>Explora nuestros servicios y añade lo que necesites.</p>
              <a href="/productos" class="btn-ctrl btn-ctrl-primary mt-3 d-inline-flex">Ver servicios ↗</a>
            </div>`
          actualizarResumen(0)
          return
        }

        let html = `<div class="carrito-tabla-wrap">
          <div class="carrito-tabla-header">
            <span>Servicio</span>
            <span>Precio unit.</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
          </div>`

        cart.forEach((item: any) => {
          const sub = item.precio * item.qty
          html += `
          <div class="carrito-row" id="row-${encodeURIComponent(item.nombre)}">
            <div>
              <div class="item-nombre">${item.nombre}</div>
              <div class="item-cat">${item.categoria.toUpperCase()}</div>
            </div>
            <div class="item-precio">${item.precio.toFixed(2).replace('.',',')}€</div>
            <div class="qty-control">
              <button class="qty-btn" onclick="cambiarQty('${item.nombre}', -1)">−</button>
              <span class="qty-num" id="qty-${encodeURIComponent(item.nombre)}">${item.qty}</span>
              <button class="qty-btn" onclick="cambiarQty('${item.nombre}', 1)">+</button>
            </div>
            <div class="item-subtotal">${sub.toFixed(2).replace('.',',')}€</div>
            <button class="btn-remove" onclick="eliminarItem('${item.nombre}')" aria-label="Eliminar">✕</button>
          </div>`
        })

        html += `</div>`
        contenido.innerHTML = html

        const total = cart.reduce((s: number, i: any) => s + i.precio * i.qty, 0)
        actualizarResumen(total)
      }

      const actualizarResumen = (subtotal: number) => {
        const iva = subtotal * 0.21
        const total = subtotal + iva
        const fmt = (n: number) => n.toFixed(2).replace('.', ',') + '€'
        const subtotalEl = document.getElementById("resumen-subtotal")
        const ivaEl = document.getElementById("resumen-iva")
        const totalEl = document.getElementById("resumen-total")
        if (subtotalEl) subtotalEl.textContent = fmt(subtotal)
        if (ivaEl) ivaEl.textContent = fmt(iva)
        if (totalEl) totalEl.textContent = fmt(total)
      }

      ;(window as any).cambiarQty = (nombre: string, delta: number) => {
        (window as any).updateQty?.(nombre, delta)
        renderCarrito()
      }

      ;(window as any).eliminarItem = (nombre: string) => {
        (window as any).removeFromCart?.(nombre)
        renderCarrito()
        ;(window as any).showToast?.("Eliminado del carrito")
      }

      ;(window as any).iniciarPedido = () => {
        const hasJwt = document.cookie.split(';').some((c: string) => c.trim().startsWith('jwt='))
        if (!hasJwt) {
          const modal = new (window as any).bootstrap.Modal(document.getElementById("loginModal"))
          modal.show()
        } else {
          window.location.href = '/compra'
        }
      }

      document.addEventListener("DOMContentLoaded", renderCarrito)
    }
  }, [])

  return (
    <>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      <section className="carrito-hero">
        <div className="container">
          <p className="section-label">Tu selección</p>
          <h1 className="carrito-hero-title">Carrito</h1>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <div className="row gy-4">
            {/* LISTA */}
            <div className="col-lg-8">
              <div id="carrito-contenido">
                {/* Se rellena con JS */}
              </div>
            </div>

            {/* RESUMEN */}
            <div className="col-lg-4">
              <div className="resumen-card">
                <div className="resumen-titulo">Resumen del pedido</div>
                <div className="resumen-row">
                  <span>Subtotal</span>
                  <span id="resumen-subtotal">0,00€</span>
                </div>
                <div className="resumen-row">
                  <span>IVA (21%)</span>
                  <span id="resumen-iva">0,00€</span>
                </div>
                <div className="resumen-divider"></div>
                <div className="resumen-row resumen-total">
                  <span>Total</span>
                  <span id="resumen-total">0,00€</span>
                </div>
                <button className="btn-ctrl btn-ctrl-primary w-100 mt-4"
                  id="btn-pedido" onClick={() => (window as any).iniciarPedido?.()}>
                  FORMALIZAR PEDIDO ↗
                </button>
                <a href="/productos" className="btn-ctrl btn-ctrl-outline w-100 mt-2 justify-content-center">
                  Seguir comprando
                </a>
                <p className="mt-3 text-center empty-cart-text">
                  Es necesario estar identificado para finalizar la compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL LOGIN REQUERIDO */}
      <div className="modal fade" id="loginModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-2">
            <div className="modal-header border-0 pb-0">
              <h2 className="modal-title login-modal-title" id="loginModalLabel">
                Identifícate para continuar
              </h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p className="login-modal-description">
                Necesitas estar identificado para formalizar tu pedido.
              </p>
              <div className="d-flex gap-2 mt-3">
                <a href="/usuario" className="btn-ctrl btn-ctrl-primary flex-grow-1 justify-content-center">
                  INICIAR SESIÓN
                </a>
                <a href="/usuario#registro" className="btn-ctrl btn-ctrl-outline flex-grow-1 justify-content-center">
                  REGISTRARSE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ctrl-toast" id="toast"></div>
      <mi-pie></mi-pie>

      <script src="/js/mis-etiquetas.js"></script>
      <script src="/js/fondo.js"></script>
      <script src="/js/carrito.js"></script>

      <style jsx>{`
        .carrito-hero { padding: 8rem 0 3rem; }
        .carrito-hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        /* TABLA CARRITO */
        .carrito-tabla-wrap {
          border-radius: var(--radius);
          border: 1px solid var(--gris-mid);
          overflow: hidden;
          background: white;
        }
        .carrito-tabla-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          background: var(--gris-claro);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: var(--txt-muted);
          text-transform: uppercase;
        }
        .carrito-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 1rem;
          padding: 1.2rem 1.5rem;
          align-items: center;
          border-top: 1px solid var(--gris-claro);
        }
        .carrito-row:hover { background: rgba(152,159,203,0.04); }
        .item-nombre { font-weight: 600; font-size: 0.9rem; }
        .item-cat {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--rojo);
          font-weight: 700;
          margin-top: 0.2rem;
        }
        .item-precio { font-size: 0.9rem; font-weight: 500; }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .qty-btn {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          border: 1.5px solid var(--gris-mid);
          background: transparent;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .qty-btn:hover { border-color: var(--rojo); color: var(--rojo); }
        .qty-num { font-size: 0.9rem; font-weight: 600; min-width: 1.5rem; text-align: center; }
        .item-subtotal { font-weight: 700; font-size: 0.95rem; }
        .btn-remove {
          background: none;
          border: none;
          color: var(--gris-mid);
          cursor: pointer;
          font-size: 1.1rem;
          transition: color 0.2s;
          padding: 0;
        }
        .btn-remove:hover { color: var(--rojo); }

        /* RESUMEN */
        .resumen-card {
          border-radius: var(--radius);
          border: 1px solid var(--gris-mid);
          background: white;
          padding: 2rem;
          position: sticky;
          top: 7rem;
        }
        .resumen-titulo { font-size: 0.7rem; letter-spacing: 0.15em; font-weight: 700; text-transform: uppercase; color: var(--txt-muted); margin-bottom: 1.5rem; }
        .resumen-row { display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.8rem; }
        .resumen-total { font-size: 1.3rem; font-weight: 700; }
        .resumen-divider { height: 1px; background: var(--gris-mid); margin: 1rem 0; }

        /* VACÍO */
        .carrito-vacio { text-align: center; padding: 5rem 2rem; color: var(--txt-muted); }
        .carrito-vacio-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.3; }

        /* MODAL LOGIN */
        .modal-content { border-radius: var(--radius); border: none; }
        .modal-header { border-bottom: 1px solid var(--gris-claro); }

        /* RESPONSIVE */
        @media (max-width: 767px) {
          .carrito-tabla-header { display: none; }
          .carrito-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            padding: 1.2rem;
          }
        }
      `}</style>
    </>
  )
}
