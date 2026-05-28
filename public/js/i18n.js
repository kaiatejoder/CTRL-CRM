const TRANSLATIONS = {
    es: {
        "nav.inicio":             "INICIO",
        "nav.nosotros":           "NOSOTROS",
        "nav.servicios":          "SERVICIOS",
        "nav.servicios.todos":    "Todos los servicios",
        "nav.servicios.branding": "Branding",
        "nav.servicios.plantillas":"Plantillas",
        "nav.servicios.planes":   "Planes",
        "nav.contacto":           "CONTACTO",
        "nav.perfil":             "Mi Perfil",
        "nav.abrir":              "Abrir menú",
        "nav.productos":          "Productos",
        "nav.empresa":            "Empresa",
        "nav.cuenta":             "Mi cuenta",
        "nav.carrito":            "Carrito",
        "footer.nosotros":        "Nosotros",
        "footer.equipo":          "Equipo",
        "footer.proceso":         "Proceso",
        "footer.heading.nosotros":"Nosotros",
        "footer.heading.productos":"Productos",
        "footer.heading.horario": "Horario de atención",
        "footer.schedule":        "Lun – Dom: Activos 24/7",
        "footer.derechos":        "Todos los derechos reservados",
        "footer.branding":        "Branding",
        "footer.plantillas":      "Plantillas",
        "footer.planes":          "Planes",
        "hero.label": "Tienda",
        "hero.title": "Catálogo",
        "search.placeholder": "Buscar productos...",
        "search.btn":         "Buscar",
        "filter.all":         "TODOS",
        "cart.empty":         "Tu carrito está vacío",
        "cart.finalize":      "FORMALIZAR PEDIDO ↗",
        "cart.continue":      "Seguir comprando",
        "login.title":        "Bienvenido/a.",
        "login.tab.access":   "ACCESO",
        "login.tab.reg":      "REGISTRO",
        "login.email":        "Email",
        "login.pass":         "Contraseña",
        "login.btn":          "ENTRAR ↗",
        "reg.btn":            "REGISTRARSE ↗",
        "checkout.title":     "Finalizar pedido",
        "checkout.shipping":  "Datos de envío",
        "checkout.payment":   "Datos de pago",
        "checkout.confirm":   "¡Pedido realizado!",
        "contact.title":      "Cuéntanos tu proyecto.",
        "contact.send":       "ENVIAR MENSAJE ↗"
    },
    en: {
        "nav.inicio":             "HOME",
        "nav.nosotros":           "ABOUT",
        "nav.servicios":          "SERVICES",
        "nav.servicios.todos":    "All services",
        "nav.servicios.branding": "Branding",
        "nav.servicios.plantillas":"Templates",
        "nav.servicios.planes":   "Plans",
        "nav.contacto":           "CONTACT",
        "nav.perfil":             "My Profile",
        "nav.abrir":              "Open menu",
        "nav.productos":          "Products",
        "nav.empresa":            "About",
        "nav.cuenta":             "My account",
        "nav.carrito":            "Cart",
        "footer.nosotros":        "About",
        "footer.equipo":          "Team",
        "footer.proceso":         "Process",
        "footer.heading.nosotros":"About",
        "footer.heading.productos":"Products",
        "footer.heading.horario": "Support hours",
        "footer.schedule":        "Mon – Sun: Always on 24/7",
        "footer.derechos":        "All rights reserved",
        "footer.branding":        "Branding",
        "footer.plantillas":      "Templates",
        "footer.planes":          "Plans",
        "hero.label": "Shop",
        "hero.title": "Catalogue",
        "search.placeholder": "Search products...",
        "search.btn":         "Search",
        "filter.all":         "ALL",
        "cart.empty":         "Your cart is empty",
        "cart.finalize":      "PLACE ORDER ↗",
        "cart.continue":      "Continue shopping",
        "login.title":        "Welcome.",
        "login.tab.access":   "LOG IN",
        "login.tab.reg":      "SIGN UP",
        "login.email":        "Email",
        "login.pass":         "Password",
        "login.btn":          "LOG IN ↗",
        "reg.btn":            "SIGN UP ↗",
        "checkout.title":     "Complete order",
        "checkout.shipping":  "Shipping details",
        "checkout.payment":   "Payment details",
        "checkout.confirm":   "Order placed!",
        "contact.title":      "Tell us about your project.",
        "contact.send":       "SEND MESSAGE ↗"
    }
};

function detectLang() {
    const saved = localStorage.getItem('ctrl_lang');
    if (saved && TRANSLATIONS[saved]) return saved;
    const browser = (navigator.language || 'es').split('-')[0];
    return TRANSLATIONS[browser] ? browser : 'es';
}

export function getLang() { return detectLang(); }

export function t(key) {
    const lang = detectLang();
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['es'][key]) || key;
}

export function setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    localStorage.setItem('ctrl_lang', lang);
    location.reload();
}

export function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const val = t(el.getAttribute('data-i18n'));
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });
}
