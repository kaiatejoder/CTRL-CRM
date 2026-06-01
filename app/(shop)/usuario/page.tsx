'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function UsuarioPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showToast = (msg: string) => {
        const t = document.getElementById("ut-toast") || document.getElementById("toast")
        if (!t) return
        t.textContent = msg
        t.classList.add("show")
        clearTimeout((showToast as any)._t)
        ;(showToast as any)._t = setTimeout(() => t.classList.remove("show"), 2600)
      }

      const isLoggedIn = () => {
        return document.cookie.split(';').some((c: string) => c.trim().startsWith('jwt='))
      }

      ;(window as any).showPanel = (id: string, btn?: HTMLElement) => {
        document.querySelectorAll('.perfil-panel').forEach(p => p.classList.remove('active'))
        document.querySelectorAll('.perfil-tab').forEach(t => t.classList.remove('active'))
        const panel = document.getElementById('panel-' + id)
        if (panel) panel.classList.add('active')
        if (btn) btn.classList.add('active')
      }

      let modoActual = 'acceso'
      ;(window as any).switchTab = (modo: string, e?: Event) => {
        modoActual = modo
        document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'))
        if (e && (e as any).target) (e as any).target.classList.add('active')
        ;(window as any).toggleModo(modo)
      }

      ;(window as any).toggleModo = (modo: string) => {
        modoActual = modo
        const campos = document.getElementById('campos-registro')
        const btn = document.getElementById('btn-submit')
        const radios = document.querySelectorAll('input[name="modo"]')
        if (modo === 'registro') {
          if (campos) campos.style.display = 'block'
          if (btn) btn.textContent = 'REGISTRARSE ↗'
          ;(radios[1] as HTMLInputElement).checked = true
          ;['nombre','apellidos','telefono','password2'].forEach(id => {
            const el = document.getElementById(id) as HTMLInputElement
            if (el) el.required = true
          })
        } else {
          if (campos) campos.style.display = 'none'
          if (btn) btn.textContent = 'ENTRAR ↗'
          ;(radios[0] as HTMLInputElement).checked = true
          ;['nombre','apellidos','telefono','password2'].forEach(id => {
            const el = document.getElementById(id) as HTMLInputElement
            if (el) el.required = false
          })
        }
      }

      const form = document.getElementById('form-usuario') as HTMLFormElement
      if (form) {
        form.addEventListener('submit', async (e: Event) => {
          e.preventDefault()
          if (modoActual === 'registro') {
            const pass = (document.getElementById('password') as HTMLInputElement).value
            const pass2 = (document.getElementById('password2') as HTMLInputElement).value
            if (pass !== pass2) {
              showToast('Las contraseñas no coinciden')
              return
            }
            showToast('Cuenta creada. Inicia sesión.')
            ;(window as any).switchTab('acceso', null)
            form.reset()
          } else {
            showToast('Iniciando sesión...')
            form.reset()
          }
        })
      }

      ;(window as any).cerrarSesionConSincronizacion = async () => {
        showToast('Cerrando sesión...')
        document.getElementById('login-section')!.style.display = 'block'
        document.getElementById('perfil-section')!.style.display = 'none'
        document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      }

      ;(window as any).cerrarSesion = (window as any).cerrarSesionConSincronizacion

      const modForm = document.getElementById('form-modificar') as HTMLFormElement
      if (modForm) {
        modForm.addEventListener('submit', (e: Event) => {
          e.preventDefault()
          showToast('Datos actualizados')
          modForm.reset()
        })
      }

      const claveForm = document.getElementById('form-clave') as HTMLFormElement
      if (claveForm) {
        claveForm.addEventListener('submit', (e: Event) => {
          e.preventDefault()
          const n = (document.getElementById('clave-nueva') as HTMLInputElement).value
          const n2 = (document.getElementById('clave-nueva2') as HTMLInputElement).value
          if (n !== n2) {
            showToast('Las contraseñas no coinciden')
            return
          }
          showToast('Contraseña actualizada')
          claveForm.reset()
        })
      }

      ;(window as any).marcarTodasLeidas = () => {
        document.querySelectorAll('.notif-dot').forEach(d => {
          d.className = 'notif-dot read'
        })
        document.querySelectorAll('.notif-item').forEach(i => i.classList.remove('unread'))
        showToast('Todas las notificaciones marcadas como leídas')
      }

      ;(window as any).renderApariencia = () => {}

      ;(window as any).resetTema = () => {
        showToast('Apariencia restablecida')
      }

      ;(window as any).utToast = showToast
      ;(window as any).showToast = showToast

      document.addEventListener('DOMContentLoaded', () => {
        if (isLoggedIn()) {
          document.getElementById('login-section')!.style.display = 'none'
          document.getElementById('perfil-section')!.style.display = 'block'
        } else {
          document.getElementById('login-section')!.style.display = 'block'
          document.getElementById('perfil-section')!.style.display = 'none'
        }
        if (window.location.hash === '#registro') {
          (window as any).switchTab('registro', null)
        }
      })
    }
  }, [])

  return (
    <>
      <div className="bg-dots"></div>
      <mi-menu></mi-menu>

      {/* ================================================================
           SECCIÓN LOGIN / REGISTRO
      ================================================================ */}
      <div id="login-section">
        <section className="usuario-hero">
          <div className="container">
            <p className="section-label">Mi cuenta</p>
            <h1 className="usuario-hero-title">Bienvenido/a.</h1>
          </div>
        </section>

        <section className="pb-5">
          <div className="container">
            <div className="form-tabs mb-0">
              <button className="form-tab active" onClick={(e) => (window as any).switchTab?.('acceso', e)}>ACCESO</button>
              <button className="form-tab" onClick={(e) => (window as any).switchTab?.('registro', e)}>REGISTRO</button>
            </div>

            <div className="form-card ctrl-form mt-0" style={{ borderTopLeftRadius: '0', margin: '8rem 8rem' }}>
              <div className="radio-group" id="radio-group">
                <label className="radio-option">
                  <input type="radio" name="modo" value="acceso" defaultChecked onChange={() => (window as any).toggleModo?.('acceso')} />
                  Acceso
                </label>
                <label className="radio-option">
                  <input type="radio" name="modo" value="registro" onChange={() => (window as any).toggleModo?.('registro')} />
                  Registro
                </label>
              </div>

              <form id="form-usuario" noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="usuario"
                    placeholder="hola@tudominio.com" required autoComplete="email" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control" id="password" name="clave"
                    placeholder="••••••••" required minLength={8} autoComplete="current-password" />
                </div>

                <div id="campos-registro" style={{ display: 'none' }}>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label" htmlFor="nombre">Nombre</label>
                      <input type="text" className="form-control" id="nombre" name="nombre"
                        placeholder="Ana" autoComplete="given-name" />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label" htmlFor="apellidos">Apellidos</label>
                      <input type="text" className="form-control" id="apellidos" name="apellidos"
                        placeholder="García López" autoComplete="family-name" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="telefono">Teléfono</label>
                    <input type="tel" className="form-control" id="telefono" name="telefono"
                      placeholder="+34 600 000 000"
                      pattern="[\+]?[0-9\s\-]{9,15}" autoComplete="tel" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password2">Confirmar contraseña</label>
                    <input type="password" className="form-control" id="password2" name="clave2"
                      placeholder="••••••••" minLength={8} autoComplete="new-password" />
                  </div>

                  <div id="campos-direccion">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="domicilio">Domicilio</label>
                      <input type="text" className="form-control" id="domicilio" name="domicilio" placeholder="Calle Mayor, 1" autoComplete="street-address" />
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label" htmlFor="poblacion">Población</label>
                        <input type="text" className="form-control" id="poblacion" name="poblacion" placeholder="Valencia" autoComplete="address-level2" />
                      </div>
                      <div className="col-4 mb-3">
                        <label className="form-label" htmlFor="provincia">Provincia</label>
                        <input type="text" className="form-control" id="provincia" name="provincia" placeholder="Valencia" autoComplete="address-level1" />
                      </div>
                      <div className="col-2 mb-3">
                        <label className="form-label" htmlFor="cp">CP</label>
                        <input type="text" className="form-control" id="cp" name="cp" placeholder="46001" maxLength={5} autoComplete="postal-code" />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-ctrl btn-ctrl-primary w-100" id="btn-submit">
                  ENTRAR ↗
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* ================================================================
           SECCIÓN PERFIL / DASHBOARD
      ================================================================ */}
      <section id="perfil-section" className="perfil-section" style={{ display: 'none' }}>
        <div className="container">

          {/* HERO */}
          <div className="perfil-hero">
            <div className="perfil-hero-inner">
              <div className="perfil-avatar" id="perfil-avatar">U</div>
              <div>
                <div className="perfil-nombre" id="perfil-nombre">Usuario</div>
                <div className="perfil-email" id="perfil-email">usuario@email.com</div>
                <div className="perfil-since">Cliente desde enero 2026</div>
              </div>
              <div className="perfil-actions">
                <a href="/carrito" className="ut-btn ut-btn-ghost">Ver carrito</a>
                <button className="ut-btn ut-btn-danger" onClick={() => (window as any).cerrarSesionConSincronizacion?.()}>Cerrar sesión</button>
              </div>
            </div>

            {/* TABS */}
            <nav className="perfil-tabs">
              <button className="perfil-tab active" onClick={(e) => (window as any).showPanel?.('dashboard', e.currentTarget)}>Dashboard</button>
              <button className="perfil-tab" onClick={(e) => (window as any).showPanel?.('descargas', e.currentTarget)}>Descargas</button>
              <button className="perfil-tab" onClick={(e) => (window as any).showPanel?.('notificaciones', e.currentTarget)}>Notificaciones</button>
              <button className="perfil-tab" onClick={(e) => (window as any).showPanel?.('formularios', e.currentTarget)}>Formularios</button>
              <button className="perfil-tab" onClick={(e) => (window as any).showPanel?.('pedidos', e.currentTarget)}>Mis pedidos</button>
              <button className="perfil-tab" onClick={(e) => (window as any).showPanel?.('cuenta', e.currentTarget)}>Mi cuenta</button>
              <button className="perfil-tab" onClick={(e) => (window as any).showPanel?.('apariencia', e.currentTarget)}>Apariencia</button>
            </nav>
          </div>

          {/* ── PANEL: DASHBOARD ── */}
          <div className="perfil-panel active" id="panel-dashboard">
            <div className="dash-bento">
              {/* Bienvenida */}
              <div className="ut-card db-wide welcome-card">
                <div className="welcome-card-title">Hola, <span id="dash-nombre">Usuario</span> 👋</div>
                <div className="welcome-card-sub">Tienes <strong>2 descargas</strong> disponibles, <strong>1 notificación</strong> sin leer y <strong>1 formulario</strong> pendiente.</div>
                <div className="welcome-buttons">
                  <button className="ut-btn ut-btn-primary" onClick={() => (window as any).showPanel?.('descargas', document.querySelectorAll('.perfil-tab')[1] as HTMLElement)}>Descargas →</button>
                  <button className="ut-btn ut-btn-ghost" onClick={() => (window as any).showPanel?.('formularios', document.querySelectorAll('.perfil-tab')[3] as HTMLElement)}>Formularios pendientes</button>
                </div>
              </div>

              {/* Stat: Pedidos */}
              <div className="ut-card ut-stat">
                <div className="ut-stat-icon">◑</div>
                <div className="ut-stat-num">3</div>
                <div className="ut-stat-label">Pedidos totales</div>
                <div className="ut-stat-sub">Último: 03/03/2026</div>
              </div>

              {/* Stat: Descargas */}
              <div className="ut-card ut-stat">
                <div className="ut-stat-icon">↓</div>
                <div className="ut-stat-num">2</div>
                <div className="ut-stat-label">Descargas</div>
                <div className="ut-stat-sub">Kit Social + Guía</div>
              </div>

              {/* Stat: Notificaciones */}
              <div className="ut-card ut-stat">
                <div className="ut-stat-icon">◎</div>
                <div className="ut-stat-num">1</div>
                <div className="ut-stat-label">Sin leer</div>
                <div className="ut-stat-sub">1 nueva notificación</div>
              </div>

              {/* Stat: Plan */}
              <div className="ut-card ut-stat db-wide plan-stat">
                <div className="ut-stat-icon">★</div>
                <div className="ut-stat-num">Plan Starter</div>
                <div className="ut-stat-label">Suscripción activa</div>
                <div>
                  <a href="/productos" className="ut-btn ut-btn-primary plan-stat-button">Actualizar plan →</a>
                </div>
              </div>

              {/* Actividad reciente */}
              <div className="ut-card db-full">
                <div className="activity-header">
                  <span className="activity-header-title">Actividad reciente</span>
                  <button className="ut-btn ut-btn-ghost" style={{ fontSize: '0.65rem', padding: '0.3rem 0.8rem' }}
                    onClick={() => (window as any).showPanel?.('pedidos', document.querySelectorAll('.perfil-tab')[4] as HTMLElement)}>Ver pedidos →</button>
                </div>
                <div>
                  <div className="activity-item">
                    <div className="activity-dot success"></div>
                    <div className="activity-content">Pedido <strong>#CTR-00141</strong> — Identidad de Marca en curso</div>
                    <div className="activity-time">03/03/2026</div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot success"></div>
                    <div className="activity-content">Descarga disponible — <strong>Kit Social Media</strong></div>
                    <div className="activity-time">28/02/2026</div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot accent"></div>
                    <div className="activity-content">Formulario de brief pendiente de rellenar</div>
                    <div className="activity-time">25/02/2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PANEL: DESCARGAS ── */}
          <div className="perfil-panel" id="panel-descargas">
            <div className="ut-card">
              <div className="panel-header">
                <span className="panel-header-title">Recursos disponibles</span>
              </div>
              <div className="descarga-item">
                <div className="descarga-icon">ZIP</div>
                <div>
                  <div className="descarga-nombre">Kit Social Media — Plantillas Instagram</div>
                  <div className="descarga-meta">24 archivos · PSD + AI · 128 MB · Comprado el 28/02/2026</div>
                </div>
                <button className="descarga-btn" onClick={() => (window as any).utToast?.('Descargando Kit Social Media...')}>↓ Descargar</button>
              </div>
              <div className="descarga-item">
                <div className="descarga-icon">PDF</div>
                <div>
                  <div className="descarga-nombre">Guía de Marca — Brief Creativo</div>
                  <div className="descarga-meta">1 archivo · PDF · 4.2 MB · Incluido en tu plan</div>
                </div>
                <button className="descarga-btn" onClick={() => (window as any).utToast?.('Descargando Guía de Marca...')}>↓ Descargar</button>
              </div>
              <div className="descarga-item locked">
                <div className="descarga-icon">—</div>
                <div>
                  <div className="descarga-nombre">Pack Tipografías CTRL — Uso Comercial</div>
                  <div className="descarga-meta">Requiere Plan Pro o superior</div>
                </div>
                <button className="descarga-btn" disabled>Bloqueado</button>
              </div>
            </div>
          </div>

          {/* ── PANEL: NOTIFICACIONES ── */}
          <div className="perfil-panel" id="panel-notificaciones">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--ut-txt-muted)' }}>1 sin leer</span>
              <button className="ut-btn ut-btn-ghost" style={{ fontSize: '0.65rem', padding: '0.3rem 0.8rem' }}
                onClick={() => (window as any).marcarTodasLeidas?.()}>Marcar todas como leídas</button>
            </div>
            <div className="ut-card">
              <div className="notif-item unread" id="notif-1">
                <div className="notif-dot" id="notif-dot-1"></div>
                <div>
                  <div className="notif-titulo">Tu pedido #CTR-00141 está en curso</div>
                  <div className="notif-body">Hemos comenzado a trabajar en tu proyecto de Identidad de Marca. Puedes hacer seguimiento desde la sección Mis Pedidos.</div>
                  <div className="notif-time">Hace 2 días · 03/03/2026</div>
                </div>
              </div>
              <div className="notif-item">
                <div className="notif-dot read"></div>
                <div>
                  <div className="notif-titulo">Nueva descarga disponible</div>
                  <div className="notif-body">Tu Kit Social Media ya está disponible para descargar desde la sección Descargas.</div>
                  <div className="notif-time">Hace 10 días · 28/02/2026</div>
                </div>
              </div>
              <div className="notif-item">
                <div className="notif-dot read"></div>
                <div>
                  <div className="notif-titulo">Bienvenido/a a CTRL Studio</div>
                  <div className="notif-body">Gracias por registrarte. Explora nuestros servicios y plantillas desde el catálogo.</div>
                  <div className="notif-time">Hace 15 días · 23/02/2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PANEL: FORMULARIOS ── */}
          <div className="perfil-panel" id="panel-formularios">
            <div className="ut-card">
              <div className="panel-header">
                <span className="panel-header-title">Formularios y documentos</span>
              </div>

              <div className="form-pendiente">
                <div>
                  <div className="form-pend-title">Brief creativo — Identidad de Marca</div>
                  <div className="form-pend-sub">Necesitamos esta información para comenzar tu proyecto. Plazo: 10/03/2026</div>
                </div>
                <span className="form-pend-badge fpb-urgente">Urgente</span>
                <button className="form-pend-btn" onClick={() => (window as any).utToast?.('Abriendo formulario...')}>Rellenar →</button>
              </div>

              <div className="form-pendiente">
                <div>
                  <div className="form-pend-title">Encuesta de satisfacción — Kit Social</div>
                  <div className="form-pend-sub">Cuéntanos tu experiencia con el kit descargado.</div>
                </div>
                <span className="form-pend-badge fpb-pendiente">Pendiente</span>
                <button className="form-pend-btn" onClick={() => (window as any).utToast?.('Abriendo encuesta...')}>Rellenar →</button>
              </div>

              <div className="form-pendiente">
                <div>
                  <div className="form-pend-title">Contrato de servicios — Identidad de Marca</div>
                  <div className="form-pend-sub">Firmado el 01/03/2026. Disponible para descarga.</div>
                </div>
                <span className="form-pend-badge fpb-ok">Firmado</span>
                <button className="form-pend-btn fpb-ok-btn" onClick={() => (window as any).utToast?.('Descargando contrato...')}>↓ Descargar</button>
              </div>
            </div>
          </div>

          {/* ── PANEL: PEDIDOS ── */}
          <div className="perfil-panel" id="panel-pedidos">
            <div className="ut-card">
              <div className="panel-header">
                <span className="panel-header-title">Historial de pedidos</span>
              </div>
              <div className="pedido-ut">
                <div className="pedido-ut-head">
                  <span className="pedido-ut-id">#CTR-00141</span>
                  <span className="pedido-status-badge status-en-curso">EN CURSO</span>
                  <span className="pedido-ut-fecha">03/03/2026</span>
                </div>
                <div className="pedido-ut-item"><span>Identidad de Marca Completa</span><span>890,00€</span></div>
                <div className="pedido-ut-total">Total: 1.077,90€ <span style={{ fontSize: '0.72rem', fontWeight: '400', color: 'var(--ut-txt-muted)' }}>(IVA 21% incluido)</span></div>
              </div>
              <div className="pedido-ut">
                <div className="pedido-ut-head">
                  <span className="pedido-ut-id">#CTR-00139</span>
                  <span className="pedido-status-badge status-completado">COMPLETADO</span>
                  <span className="pedido-ut-fecha">28/02/2026</span>
                </div>
                <div className="pedido-ut-item"><span>Kit Social Media — Pack Completo</span><span>29,00€</span></div>
                <div className="pedido-ut-total">Total: 35,09€ <span style={{ fontSize: '0.72rem', fontWeight: '400', color: 'var(--ut-txt-muted)' }}>(IVA 21% incluido)</span></div>
              </div>
            </div>
          </div>

          {/* ── PANEL: MI CUENTA ── */}
          <div className="perfil-panel" id="panel-cuenta">
            <div className="row gy-3">
              <div className="col-lg-8">
                <div className="ut-section-label">Modificar datos personales</div>
                <div className="ut-card cuenta-card">
                  <form id="form-modificar" className="cuenta-form" noValidate>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label" htmlFor="mod-nombre">Nombre</label>
                        <input type="text" className="form-control" id="mod-nombre" name="nombre" autoComplete="given-name" />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label" htmlFor="mod-apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="mod-apellidos" name="apellidos" autoComplete="family-name" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="mod-telefono">Teléfono</label>
                      <input type="tel" className="form-control" id="mod-telefono" name="telefono"
                        pattern="[\+]?[0-9\s\-]{9,15}" autoComplete="tel" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="mod-domicilio">Domicilio</label>
                      <input type="text" className="form-control" id="mod-domicilio" name="domicilio" autoComplete="street-address" />
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label" htmlFor="mod-poblacion">Población</label>
                        <input type="text" className="form-control" id="mod-poblacion" name="poblacion" autoComplete="address-level2" />
                      </div>
                      <div className="col-4 mb-3">
                        <label className="form-label" htmlFor="mod-provincia">Provincia</label>
                        <input type="text" className="form-control" id="mod-provincia" name="provincia" autoComplete="address-level1" />
                      </div>
                      <div className="col-2 mb-3">
                        <label className="form-label" htmlFor="mod-cp">CP</label>
                        <input type="text" className="form-control" id="mod-cp" name="cp" maxLength={5} autoComplete="postal-code" />
                      </div>
                    </div>
                    <button type="submit" className="ut-btn ut-btn-primary">GUARDAR CAMBIOS</button>
                  </form>
                </div>

                <div className="ut-section-label">Cambiar contraseña</div>
                <div className="ut-card cuenta-card">
                  <form id="form-clave" className="cuenta-form" noValidate>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="clave-actual">Contraseña actual</label>
                      <input type="password" className="form-control" id="clave-actual" name="claveActual" required minLength={8} autoComplete="current-password" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="clave-nueva">Nueva contraseña</label>
                      <input type="password" className="form-control" id="clave-nueva" name="claveNueva" required minLength={8} autoComplete="new-password" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="clave-nueva2">Confirmar nueva contraseña</label>
                      <input type="password" className="form-control" id="clave-nueva2" name="claveNueva2" required minLength={8} autoComplete="new-password" />
                    </div>
                    <button type="submit" className="ut-btn ut-btn-ghost">CAMBIAR CONTRASEÑA</button>
                  </form>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="ut-section-label">Acciones rápidas</div>
                <div className="ut-card quick-actions">
                  <a href="/carrito" className="ut-btn ut-btn-ghost w-100 justify-content-center">Ver carrito</a>
                  <a href="/productos" className="ut-btn ut-btn-ghost w-100 justify-content-center">Catálogo</a>
                  <button className="ut-btn ut-btn-danger w-100 justify-content-center" onClick={() => (window as any).cerrarSesion?.()}>CERRAR SESIÓN</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── PANEL: APARIENCIA ── */}
          <div className="perfil-panel" id="panel-apariencia">
            <div className="row gy-3">
              <div className="col-lg-8">
                {/* TEMAS */}
                <div className="ut-section-label">Tema de la interfaz</div>
                <div className="apariencia-grid" id="ap-temas"></div>

                {/* ACENTO */}
                <div className="ut-section-label">Color de acento</div>
                <div className="ut-card accent-card">
                  <div className="acento-grid" id="ap-acentos"></div>
                  <div className="accent-description">
                    El color de acento se aplica a botones, líneas activas y elementos interactivos.
                  </div>
                </div>

                {/* TEXTURAS */}
                <div className="ut-section-label">Textura de fondo</div>
                <div className="ut-card texture-card">
                  <div className="textura-grid" id="ap-texturas"></div>
                  <div className="texture-description">
                    Coloca tus archivos en <code className="ap-code">web/img/textures/</code>
                    con los nombres indicados. Formato PNG recomendado, 512×512 px, tileable.
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="ut-section-label">Preview</div>
                <div className="ut-card preview-card">
                  <div className="ap-preview-nombre" id="ap-preview-nombre">Ana G.</div>
                  <div className="ap-preview-subtitle">Previsualización del tema</div>
                  <button className="ut-btn ut-btn-primary w-100 justify-content-center mb-2" style={{ pointerEvents: 'none' }}>Botón primario</button>
                  <button className="ut-btn ut-btn-ghost w-100 justify-content-center" style={{ pointerEvents: 'none' }}>Botón secundario</button>
                  <div className="ap-preview-text">
                    El tema se aplica instantáneamente y se guarda automáticamente.
                  </div>
                  <div className="ap-reset-section">
                    <button className="ut-btn ut-btn-danger" style={{ fontSize: '0.65rem', padding: '0.3rem 0.8rem' }} onClick={() => (window as any).resetTema?.()}>Restablecer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-spacer"></div>
        </div>
      </section>

      <div className="ut-toast" id="ut-toast"></div>
      <div className="ctrl-toast" id="toast"></div>
      <mi-pie></mi-pie>

      <Script src="/js/mis-etiquetas.js" strategy="afterInteractive" />
      <Script src="/js/fondo.js" strategy="afterInteractive" />
      <Script src="/js/carrito.js" strategy="afterInteractive" />

      <style jsx>{`
        /* Additional user-specific styles can be added here if needed */
      `}</style>
    </>
  )
}
