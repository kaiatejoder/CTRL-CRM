'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function ContactoPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showToast = (msg: string) => {
        const t = document.getElementById("toast")
        if (!t) return
        t.textContent = msg
        t.classList.add("show")
        setTimeout(() => t.classList.remove("show"), 2800)
      }

      const form = document.getElementById("form-contacto") as HTMLFormElement
      if (form) {
        form.addEventListener("submit", async function(e: Event) {
          e.preventDefault()
          if (!this.checkValidity()) {
            this.reportValidity()
            return
          }
          // Simulated form submission
          showToast('✓ Mensaje enviado. Nos pondremos en contacto pronto.')
          this.reset()
        })
      }
    }
  }, [])

  return (
    <>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      {/* HERO */}
      <section className="contacto-hero">
        <div className="container">
          <p className="section-label">Hablemos</p>
          <h1 className="contacto-hero-title">
            Cuéntanos<br />
            tu <em>proyecto.</em>
          </h1>
          <div className="row gy-3 mt-4">
            <div className="col-md-3 col-6">
              <div className="info-card">
                <div className="info-card-label">EMAIL</div>
                <div className="info-card-value"><a href="mailto:hola@ctrlstudio.co">hi@ctrlstudio.es</a></div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="info-card">
                <div className="info-card-label">TELÉFONO</div>
                <div className="info-card-value"><a href="tel:+34616544507">+34 616 544 507</a></div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="info-card">
                <div className="info-card-label">UBICACIÓN</div>
                <div className="info-card-value">Valencia, España</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="info-card">
                <div className="info-card-label">HORARIO</div>
                <div className="info-card-value">Lun–Vie 9–18h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO + MAPA */}
      <section className="form-section">
        <div className="container">
          <div className="row gy-5">
            {/* FORMULARIO */}
            <div className="col-lg-6">
              <p className="section-label">Escríbenos</p>
              <div className="form-card-big ctrl-form">
                <form id="form-contacto" noValidate>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label" htmlFor="c-nombre">Nombre</label>
                      <input type="text" className="form-control" id="c-nombre" name="nombre"
                        placeholder="Ana" required autoComplete="given-name" />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label" htmlFor="c-apellidos">Apellidos</label>
                      <input type="text" className="form-control" id="c-apellidos" name="apellidos"
                        placeholder="García" required autoComplete="family-name" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="c-email">Email</label>
                    <input type="email" className="form-control" id="c-email" name="email"
                      placeholder="ana@empresa.com" required autoComplete="email" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="c-telefono">Teléfono (opcional)</label>
                    <input type="tel" className="form-control" id="c-telefono" name="telefono"
                      placeholder="+34 600 000 000"
                      pattern="[\+]?[0-9\s\-]{9,15}"
                      autoComplete="tel" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="c-asunto">Asunto</label>
                    <select className="form-select" id="c-asunto" name="asunto" required>
                      <option value="" disabled>Selecciona un tipo</option>
                      <option value="branding">Proyecto de branding</option>
                      <option value="plantilla">Consulta sobre plantillas</option>
                      <option value="plan">Información sobre planes</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="c-mensaje">Mensaje</label>
                    <textarea className="form-control" id="c-mensaje" name="mensaje" rows={4}
                      placeholder="Cuéntanos brevemente tu proyecto, marca o necesidad..."
                      required minLength={20}></textarea>
                  </div>
                  <button type="submit" className="btn-ctrl btn-ctrl-primary w-100 justify-content-center">
                    ENVIAR MENSAJE ↗
                  </button>
                </form>
              </div>
            </div>

            {/* MAPA + INFO */}
            <div className="col-lg-6">
              {/* MAPA */}
              <p className="section-label">Encuéntranos</p>
              <div className="mapa-wrapper mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.123456789012!2d-0.37739!3d39.46991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048a3fcf9fb8b%3A0xb3f7ee8a6c8f0123!2sValencia%2C%20Spain!5e0!3m2!1sen!2ses!4v1680000000000!5m2!1sen!2ses"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación CTRL Studio en Valencia"
                  style={{ width: '100%', height: '400px', borderRadius: 'var(--radius)', border: '1px solid var(--gris-mid)' }}>
                </iframe>
              </div>

              {/* HORARIO */}
              <p className="section-label">Horario de atención</p>
              <table className="horario-table mb-4">
                <tbody>
                  <tr><td>Lunes - Viernes</td><td>09:00 – 18:00</td></tr>
                  <tr><td>Sábado</td><td>10:00 - 14:00</td></tr>
                  <tr><td>Domingo</td><td className="cerrado">Cerrado</td></tr>
                </tbody>
              </table>

              {/* REDES SOCIALES */}
              <p className="section-label">Redes sociales</p>
              <div className="social-grid">
                <a href="https://www.instagram.com/ctrlstudio.co" target="_blank" rel="noopener" className="social-item">
                  <div>
                    <div className="social-name">Instagram</div>
                    <div className="social-handle">@ctrlstudio.co</div>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
                <a href="https://www.behance.net" target="_blank" rel="noopener" className="social-item">
                  <div>
                    <div className="social-name">Behance</div>
                    <div className="social-handle">behance.net/ctrlstudio</div>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener" className="social-item">
                  <div>
                    <div className="social-name">LinkedIn</div>
                    <div className="social-handle">CTRL Studio</div>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener" className="social-item">
                  <div>
                    <div className="social-name">Twitter / X</div>
                    <div className="social-handle">@ctrlstudio</div>
                  </div>
                  <span className="social-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ctrl-toast" id="toast"></div>
      <mi-pie></mi-pie>

      <Script src="/js/mis-etiquetas.js" strategy="afterInteractive" />
      <Script src="/js/fondo.js" strategy="afterInteractive" />
    </>
  )
}
