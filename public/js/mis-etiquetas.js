class MiMenu extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
<nav class="navbar navbar-expand-lg ctrl-navbar">
  <div class="container-fluid px-0">
    <a class="navbar-brand ps-3" href="/">
      <img src="img/LOGO.svg" class="logo-svg" alt="CTRL Studio">
    </a>

    <!-- BOTÓN MÓVIL -->
    <button class="navbar-toggler border-0 shadow-none me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        data-i18n-aria="nav.abrir"
        aria-label="Abrir menú">
      <span class="toggler-bar"></span>
      <span class="toggler-bar"></span>
    </button>

    <!-- NAV ÚNICO -->
    <div class="collapse navbar-collapse" id="mainNav">

      <!-- LINKS -->
      <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3 px-3 px-lg-0">

        <li class="nav-item">
          <a class="nav-link" href="/" data-i18n="nav.inicio">INICIO</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/empresa" data-i18n="nav.nosotros">NOSOTROS</a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-i18n="nav.servicios">
            SERVICIOS
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/productos" data-i18n="nav.servicios.todos">Todos los servicios</a></li>
            <li><a class="dropdown-item" href="/productos#branding" data-i18n="nav.servicios.branding">Branding</a></li>
            <li><a class="dropdown-item" href="/productos#plantillas" data-i18n="nav.servicios.plantillas">Plantillas</a></li>
            <li><a class="dropdown-item" href="/productos#planes" data-i18n="nav.servicios.planes">Planes</a></li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/contacto" data-i18n="nav.contacto">CONTACTO</a>
        </li>

        <!-- CARRITO -->
        <li class="nav-item">
          <a href="/carrito" class="nav-link d-flex align-items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span id="cart-count">0</span>
          </a>
        </li>

        <!-- USUARIO -->
        <li class="nav-item">
          <a href="/usuario" class="btn-carrito" data-i18n-aria="nav.perfil" aria-label="Mi Perfil" title="Mi Perfil">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          </a>
        </li>

        <!-- IDIOMA -->
        <li class="nav-item d-flex align-items-center">
          <lang-selector></lang-selector>
        </li>

      </ul>
    </div>

  </div>
</nav>`;
    }

    connectedCallback() {
        const dropdownMenu = this.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', (e) => e.stopPropagation());
        }

        import('./i18n.js').then(({ t, applyTranslations }) => {
            applyTranslations();
            this.querySelectorAll('[data-i18n-aria]').forEach(el => {
                const val = t(el.getAttribute('data-i18n-aria'));
                el.setAttribute('aria-label', val);
                if (el.hasAttribute('title')) el.setAttribute('title', val);
            });
        });
    }
}

window.customElements.define('mi-menu', MiMenu);

class MiPie extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
<footer class="ctrl-footer">
  <div class="container">
    <div class="row gy-4">
      <div class="col-lg-4">
        <img src="img/LOGO.svg" class="logo-svg" alt="CTRL Studio" style="height: 2rem; width: auto; color: var(--azul);">
        <p class="footer-tagline mt-3">Purpose beyond px</p>
        <div class="footer-socials mt-3">
          <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
          <a href="https://www.behance.net" target="_blank" rel="noopener" aria-label="Behance">BE</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">LI</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener" aria-label="Twitter/X">XX</a>
        </div>
      </div>
      <div class="col-lg-2 col-6">
        <p class="footer-heading" data-i18n="footer.heading.nosotros">Nosotros</p>
        <ul class="footer-links">
          <li><a href="/empresa" data-i18n="footer.nosotros">Nosotros</a></li>
          <li><a href="/empresa" data-i18n="footer.equipo">Equipo</a></li>
          <li><a href="/empresa" data-i18n="footer.proceso">Proceso</a></li>
          <li><a href="/contacto" data-i18n="nav.contacto">Contacto</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-6">
        <p class="footer-heading" data-i18n="footer.heading.productos">Productos</p>
        <ul class="footer-links">
          <li><a href="/productos#branding" data-i18n="footer.branding">Branding</a></li>
          <li><a href="/productos#plantillas" data-i18n="footer.plantillas">Plantillas</a></li>
          <li><a href="/productos#planes" data-i18n="footer.planes">Planes</a></li>
        </ul>
      </div>
      <div class="col-lg-4">
        <p class="footer-heading" data-i18n="footer.heading.horario">Horario de atención</p>
        <p class="footer-schedule" data-i18n="footer.schedule">Lun – Dom: Activos 24/7</p>
        <p class="footer-contact mt-3">
          <a href="mailto:hi@ctrlstudio.es">hi@ctrlstudio.es</a><br>
        </p>
      </div>
    </div>
    <div class="footer-bottom mt-5">
      <span>&copy; 2026 CTRL Studio — Valencia, España</span>
      <span data-i18n="footer.derechos">Todos los derechos reservados</span>
    </div>
  </div>
</footer>`;
    }

    connectedCallback() {
        import('./i18n.js').then(({ applyTranslations }) => {
            applyTranslations();
        });
    }
}
window.customElements.define('mi-pie', MiPie);

class LangSelector extends HTMLElement {
    connectedCallback() {
        import('./i18n.js').then(({ getLang, setLang }) => {
            const lang = getLang();
            this.innerHTML = `<div class="lang-selector" style="display:flex;gap:0.4rem;align-items:center;font-size:0.72rem;font-weight:700;letter-spacing:0.08em;">
                <button class="lang-btn${lang==='es'?' lang-active':''}" style="background:none;border:none;cursor:pointer;opacity:${lang==='es'?'1':'0.4'};font-weight:700;font-size:0.72rem;letter-spacing:0.08em;" onclick="void 0" data-lang="es">ES</button>
                <span style="opacity:0.3">|</span>
                <button class="lang-btn${lang==='en'?' lang-active':''}" style="background:none;border:none;cursor:pointer;opacity:${lang==='en'?'1':'0.4'};font-weight:700;font-size:0.72rem;letter-spacing:0.08em;" onclick="void 0" data-lang="en">EN</button>
            </div>`;
            this.querySelectorAll('[data-lang]').forEach(btn => {
                btn.addEventListener('click', () => setLang(btn.dataset.lang));
            });
        });
    }
}
if (!customElements.get('lang-selector')) {
    customElements.define('lang-selector', LangSelector);
}
