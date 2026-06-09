'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function CompraPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showToast = (msg: string) => {
        const t = document.getElementById("toast")
        if (!t) return
        t.textContent = msg
        t.classList.add("show")
        setTimeout(() => t.classList.remove("show"), 2800)
      }

      ;(window as any).volverEnvio = () => {
        const pasoEnvio = document.getElementById("paso-envio")
        const pasoPago = document.getElementById("paso-pago")
        if (pasoEnvio && pasoPago) {
          pasoPago.style.display = "none"
          pasoEnvio.style.display = "block"
        }
      }

      const formEnvio = document.getElementById("form-envio") as HTMLFormElement
      if (formEnvio) {
        formEnvio.addEventListener("submit", (e: Event) => {
          e.preventDefault()
          if (!formEnvio.checkValidity()) {
            formEnvio.reportValidity()
            return
          }
          const pasoEnvio = document.getElementById("paso-envio")
          const pasoPago = document.getElementById("paso-pago")
          if (pasoEnvio && pasoPago) {
            pasoEnvio.style.display = "none"
            pasoPago.style.display = "block"
          }
        })
      }

      const formPago = document.getElementById("form-pago") as HTMLFormElement
      if (formPago) {
        formPago.addEventListener("submit", (e: Event) => {
          e.preventDefault()
          if (!formPago.checkValidity()) {
            formPago.reportValidity()
            return
          }
          const pasoPago = document.getElementById("paso-pago")
          const pasoConfirmacion = document.getElementById("paso-confirmacion")
          if (pasoPago && pasoConfirmacion) {
            pasoPago.style.display = "none"
            pasoConfirmacion.style.display = "block"
            const ref = Math.floor(Math.random() * 100000)
            const confRef = document.getElementById("conf-ref")
            if (confRef) confRef.textContent = `CTR-${ref}`
          }
        })
      }

      // Render order summary
      const renderCompraItems = () => {
        const cart = (window as any).getCart?.() || []
        const container = document.getElementById("compra-items")
        if (!container) return

        if (cart.length === 0) {
          container.innerHTML = '<p style="color: var(--txt-muted);">Carrito vacío</p>'
          return
        }

        let html = ''
        let subtotal = 0
        cart.forEach((item: any) => {
          const sub = item.precio * item.qty
          subtotal += sub
          html += `<div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.8rem;">
            <span>${item.nombre} × ${item.qty}</span>
            <span>${sub.toFixed(2).replace('.',',')}€</span>
          </div>`
        })

        const iva = subtotal * 0.21
        const total = subtotal + iva

        html += `<div class="resumen-divider"></div>
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--txt-muted);margin-bottom:0.5rem;">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2).replace('.',',')}€</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--txt-muted);margin-bottom:1rem;">
            <span>IVA (21%)</span>
            <span>${iva.toFixed(2).replace('.',',')}€</span>
          </div>`

        container.innerHTML = html

        const totalEl = document.getElementById("compra-total")
        if (totalEl) totalEl.textContent = total.toFixed(2).replace('.',',') + '€'
      }

      document.addEventListener("DOMContentLoaded", renderCompraItems)
    }
  }, [])

  return (
    <>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      <section className="compra-hero">
        <div className="container">
          <p className="section-label">Paso final</p>
          <h1 className="compra-hero-title">Finalizar pedido</h1>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-7">
              {/* PASO 1: ENVÍO */}
              <div id="paso-envio">
                <div className="compra-card ctrl-form">
                  <div className="compra-card-title">Datos de envío</div>
                  <form id="form-envio" noValidate>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="env-domicilio">Dirección</label>
                      <input type="text" className="form-control" id="env-domicilio" name="domicilio" required placeholder="Calle Mayor, 1" autoComplete="street-address" />
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label" htmlFor="env-poblacion">Población</label>
                        <input type="text" className="form-control" id="env-poblacion" name="poblacion" required placeholder="Valencia" autoComplete="address-level2" />
                      </div>
                      <div className="col-4 mb-3">
                        <label className="form-label" htmlFor="env-provincia">Provincia</label>
                        <input type="text" className="form-control" id="env-provincia" name="provincia" required placeholder="Valencia" autoComplete="address-level1" />
                      </div>
                      <div className="col-2 mb-3">
                        <label className="form-label" htmlFor="env-cp">CP</label>
                        <input type="text" className="form-control" id="env-cp" name="cp" required maxLength={5} placeholder="46001" autoComplete="postal-code" />
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <a href="/carrito" className="btn-ctrl btn-ctrl-outline">← Volver al carrito</a>
                      <button type="submit" className="btn-ctrl btn-ctrl-primary">CONTINUAR ↗</button>
                    </div>
                  </form>
                </div>
              </div>

              {/* PASO 2: PAGO */}
              <div id="paso-pago" style={{ display: 'none' }}>
                <div className="compra-card ctrl-form">
                  <div className="compra-card-title">Datos de pago</div>
                  <form id="form-pago" noValidate>
                    <div className="mb-3">
                      <label className="form-label">Método de pago</label>
                      <div className="pago-metodos">
                        <label className="pago-opcion">
                          <input type="radio" name="metodoPago" value="tarjeta" defaultChecked /> Tarjeta de crédito/débito
                        </label>
                        <label className="pago-opcion">
                          <input type="radio" name="metodoPago" value="transferencia" /> Transferencia bancaria
                        </label>
                      </div>
                    </div>
                    <div id="campos-tarjeta">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pago-titular">Titular</label>
                        <input type="text" className="form-control" id="pago-titular" name="titular" placeholder="Ana García" autoComplete="cc-name" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pago-numero">Número de tarjeta</label>
                        <input type="text" className="form-control" id="pago-numero" name="numero" placeholder="•••• •••• •••• ••••" maxLength={19} autoComplete="cc-number" />
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label" htmlFor="pago-exp">Caducidad</label>
                          <input type="text" className="form-control" id="pago-exp" name="caducidad" placeholder="MM/AA" maxLength={5} autoComplete="cc-exp" />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label" htmlFor="pago-cvv">CVV</label>
                          <input type="text" className="form-control" id="pago-cvv" name="cvv" placeholder="•••" maxLength={3} autoComplete="cc-csc" />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" className="btn-ctrl btn-ctrl-outline" onClick={() => (window as any).volverEnvio?.()}>← Volver</button>
                      <button type="submit" className="btn-ctrl btn-ctrl-primary">CONFIRMAR PEDIDO ↗</button>
                    </div>
                  </form>
                </div>
              </div>

              {/* PASO 3: CONFIRMACIÓN */}
              <div id="paso-confirmacion" style={{ display: 'none' }}>
                <div className="compra-card confirmacion-card">
                  <div className="confirmacion-icon">✓</div>
                  <div className="confirmacion-titulo">¡Pedido realizado!</div>
                  <div className="confirmacion-ref">Referencia: <strong id="conf-ref">—</strong></div>
                  <div className="confirmacion-texto">Recibirás un email de confirmación. Puedes seguir el estado en Mi cuenta.</div>
                  <div className="d-flex gap-2 justify-content-center mt-4">
                    <a href="/usuario" className="btn-ctrl btn-ctrl-primary">Ver mis pedidos ↗</a>
                    <a href="/productos" className="btn-ctrl btn-ctrl-outline">Seguir comprando</a>
                  </div>
                </div>
              </div>
            </div>

            {/* RESUMEN */}
            <div className="col-lg-5">
              <div className="compra-resumen">
                <div className="resumen-titulo">Tu pedido</div>
                <div id="compra-items"></div>
                <div className="resumen-divider"></div>
                <div className="resumen-row resumen-total">
                  <span>Total (IVA incl.)</span>
                  <span id="compra-total">0,00€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ctrl-toast" id="toast"></div>
      <mi-pie></mi-pie>

      <Script src="/js/mis-etiquetas.js" strategy="afterInteractive" />
      <Script src="/js/fondo.js" strategy="afterInteractive" />
      <Script src="/js/carrito.js" strategy="afterInteractive" />

      <style jsx>{`
        .compra-hero { padding: 8rem 0 3rem; }
        .compra-hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .compra-card {
          border-radius: var(--radius);
          border: 1px solid var(--gris-mid);
          background: white;
          padding: 2rem;
          margin-bottom: 2rem;
        }
        .compra-card-title {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--txt-primary);
        }

        .pago-metodos {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pago-opcion {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
        }
        .pago-opcion input[type="radio"] {
          cursor: pointer;
        }

        .confirmacion-card {
          text-align: center;
          padding: 3rem 2rem;
        }
        .confirmacion-icon {
          font-size: 3rem;
          color: var(--verde);
          margin-bottom: 1rem;
        }
        .confirmacion-titulo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .confirmacion-ref {
          font-size: 0.9rem;
          color: var(--txt-muted);
          margin-bottom: 1rem;
        }
        .confirmacion-texto {
          color: var(--txt-muted);
          margin-bottom: 2rem;
        }

        .compra-resumen {
          border-radius: var(--radius);
          border: 1px solid var(--gris-mid);
          background: white;
          padding: 2rem;
          position: sticky;
          top: 7rem;
        }
        .resumen-titulo { font-size: 0.7rem; letter-spacing: 0.15em; font-weight: 700; text-transform: uppercase; color: var(--txt-muted); margin-bottom: 1.5rem; }
        .resumen-row { display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.8rem; }
        .resumen-total { font-size: 1.3rem; font-weight: 700; margin-top: 1rem; }
        .resumen-divider { height: 1px; background: var(--gris-mid); margin: 1rem 0; }
      `}</style>
    </>
  )
}
