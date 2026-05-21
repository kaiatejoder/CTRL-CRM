const TRANSLATIONS = {
    es: {
        "nav.productos":      "Productos",
        "nav.empresa":        "Empresa",
        "nav.contacto":       "Contacto",
        "nav.cuenta":         "Mi cuenta",
        "nav.carrito":        "Carrito",
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
        "nav.productos":      "Products",
        "nav.empresa":        "About",
        "nav.contacto":       "Contact",
        "nav.cuenta":         "My account",
        "nav.carrito":        "Cart",
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
