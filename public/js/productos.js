/**
 * productos.js
 * Catalog logic. Self-contained, no module imports.
 * Renders categories, products grid, search, pagination.
 */

const CATEGORIAS = [
    { codigo: 1, descripcion: "Branding" },
    { codigo: 2, descripcion: "Plantillas" },
    { codigo: 3, descripcion: "Web Design" },
    { codigo: 4, descripcion: "Social Media" },
];

const PRODUCTOS = [
    { codigo: 101, nombre: "Logo + Identidad Visual",        categoria: "Branding",    categoriaId: 1, descripcion: "Logotipo, paleta, tipografías y manual básico.",            precio: 450, existencias: 999 },
    { codigo: 102, nombre: "Branding Completo",              categoria: "Branding",    categoriaId: 1, descripcion: "Identidad + papelería + redes + manual extendido.",         precio: 1200, existencias: 999 },
    { codigo: 103, nombre: "Naming + Identidad",             categoria: "Branding",    categoriaId: 1, descripcion: "Investigación de naming, identidad y aplicaciones base.",    precio: 850, existencias: 999 },
    { codigo: 201, nombre: "Plantilla Instagram (24 piezas)", categoria: "Plantillas",  categoriaId: 2, descripcion: "Kit editable para feed y stories. Editables en Canva.",     precio: 79,  existencias: 999 },
    { codigo: 202, nombre: "Plantilla LinkedIn (12 piezas)", categoria: "Plantillas",  categoriaId: 2, descripcion: "Carruseles y banners para perfil profesional.",              precio: 59,  existencias: 999 },
    { codigo: 203, nombre: "Plantilla Pitch Deck",           categoria: "Plantillas",  categoriaId: 2, descripcion: "20 slides editables para presentaciones de marca.",         precio: 89,  existencias: 999 },
    { codigo: 301, nombre: "Landing Page Single",            categoria: "Web Design",  categoriaId: 3, descripcion: "Landing one-page responsive, copy + diseño + handoff.",     precio: 690, existencias: 999 },
    { codigo: 302, nombre: "Web Corporativa (5 secciones)",  categoria: "Web Design",  categoriaId: 3, descripcion: "Diseño UI + UX, mobile-first, listo para desarrollo.",      precio: 1450, existencias: 999 },
    { codigo: 303, nombre: "Rediseño Web Existente",         categoria: "Web Design",  categoriaId: 3, descripcion: "Auditoría + propuesta visual + maquetas finales.",          precio: 980, existencias: 999 },
    { codigo: 401, nombre: "Kit Social Media Mensual",       categoria: "Social Media", categoriaId: 4, descripcion: "12 piezas mensuales adaptadas a tu identidad.",             precio: 320, existencias: 999 },
    { codigo: 402, nombre: "Estrategia de Contenidos 3m",    categoria: "Social Media", categoriaId: 4, descripcion: "Plan editorial, pilares de contenido y calendario.",        precio: 540, existencias: 999 },
    { codigo: 403, nombre: "Reels Pack (10 unidades)",       categoria: "Social Media", categoriaId: 4, descripcion: "Plantillas de reels editables + guion sugerido.",          precio: 180, existencias: 999 },
];

const PAGE_SIZE = 12;
const CART_KEY = "ctrl_cart";

let todosLosProductos = [];
let paginaActual = 1;
let categoriaActual = 0;

// ── Cart ──────────────────────────────────────────────────────────────────────

function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
}

function saveCart(c) {
    localStorage.setItem(CART_KEY, JSON.stringify(c));
    updateCartBadge(c);
    window.dispatchEvent(new Event("ctrl_cart_updated"));
}

function updateCartBadge(c) {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const total = c.reduce((acc, p) => acc + (p.qty || 1), 0);
    badge.textContent = total > 0 ? String(total) : "0";
}

window.comprar = function(id) {
    const card = document.getElementById(`prod-${id}`);
    if (!card) return;
    const name  = card.dataset.nombre;
    const price = parseFloat(card.dataset.precio);
    const qtyInput = card.querySelector(".cantidad");
    const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;

    const cart = loadCart();
    const idx = cart.findIndex(p => String(p.id) === String(id));
    if (idx >= 0) cart[idx].qty = (cart[idx].qty || 1) + qty;
    else cart.push({ id, name, price, qty });
    saveCart(cart);
    showToast("✓ Añadido al carrito");
};

window.goToCheckout = function(_el, name, price, kind) {
    const cart = loadCart();
    cart.push({ id: `${kind}-${Date.now()}`, name, price, qty: 1 });
    saveCart(cart);
    window.location.href = "/checkout";
};

// ── Toast ─────────────────────────────────────────────────────────────────────

function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

// ── Filters ───────────────────────────────────────────────────────────────────

function dibujarFiltros() {
    const nav = document.getElementById("filtros-categoria");
    if (!nav) return;
    let html = `<button class="filter-btn active" onclick="window.filtrarCategoria(0, this)">TODOS</button>`;
    CATEGORIAS.forEach(cat => {
        html += `<button class="filter-btn" onclick="window.filtrarCategoria(${cat.codigo}, this)">${cat.descripcion.toUpperCase()}</button>`;
    });
    nav.innerHTML = html;
}

window.filtrarCategoria = function(catId, btn) {
    categoriaActual = catId;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    const filtrados = catId > 0 ? PRODUCTOS.filter(p => p.categoriaId === catId) : PRODUCTOS;
    dibujarProductosPaginados(filtrados);
};

// ── Render ────────────────────────────────────────────────────────────────────

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function dibujarProductos(lista) {
    const contenedor = document.getElementById("prod-grid");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<div class="col-12 text-center py-5" style="color:var(--txt-muted)"><p>No hay productos en esta categoría.</p></div>`;
        return;
    }

    const thumbClases = ["pt1", "pt2", "pt3", "pt4", "pt5", "pt6"];

    lista.forEach((producto, i) => {
        const thumbClass = thumbClases[i % thumbClases.length];
        const categoriaStr = escapeHtml(producto.categoria);
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 prod-item";
        col.dataset.cat = String(producto.categoria).toLowerCase();
        col.innerHTML = `
            <div class="prod-card"
                 id="prod-${producto.codigo}"
                 data-existencias="${producto.existencias}"
                 data-nombre="${escapeHtml(producto.nombre)}"
                 data-precio="${producto.precio}">
                <div class="prod-thumb ${thumbClass}">${categoriaStr.toUpperCase()}</div>
                <div class="prod-body d-flex flex-column">
                    <div class="prod-categoria">${categoriaStr}</div>
                    <div class="prod-nombre">${escapeHtml(producto.nombre)}</div>
                    <p class="prod-desc">${escapeHtml(producto.descripcion)}</p>
                    <div class="prod-footer mt-auto">
                        <div class="prod-precio">${producto.precio.toFixed(2)}€<small>Proyecto único</small></div>
                        <div class="d-flex align-items-center gap-2">
                            <input type="number" value="1" min="1" max="${producto.existencias}" class="form-control form-control-sm cantidad" style="width:60px;">
                            <button class="btn-add" onclick="window.comprar('${producto.codigo}')">AÑADIR ↗</button>
                        </div>
                    </div>
                </div>
            </div>`;
        contenedor.appendChild(col);
    });
}

function dibujarProductosPaginados(lista) {
    todosLosProductos = lista;
    paginaActual = 1;
    renderPagina();
}

function renderPagina() {
    const start = (paginaActual - 1) * PAGE_SIZE;
    dibujarProductos(todosLosProductos.slice(start, start + PAGE_SIZE));
    renderPaginacion();
}

function renderPaginacion() {
    const totalPags = Math.ceil(todosLosProductos.length / PAGE_SIZE);
    const wrap = document.getElementById("paginacion-wrap");
    if (!wrap) return;
    if (totalPags <= 1) { wrap.innerHTML = ""; return; }
    let html = "";
    for (let i = 1; i <= totalPags; i++) {
        html += `<button class="pag-btn${i === paginaActual ? " active" : ""}" onclick="window.irPagina(${i})">${i}</button>`;
    }
    wrap.innerHTML = html;
}

window.irPagina = function(n) {
    paginaActual = n;
    renderPagina();
    document.getElementById("prod-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ── Search ────────────────────────────────────────────────────────────────────

window.buscar = function() {
    const q = (document.getElementById("buscador-input")?.value || "").trim().toLowerCase();
    if (!q) { dibujarProductosPaginados(PRODUCTOS); return; }
    const base = categoriaActual > 0 ? PRODUCTOS.filter(p => p.categoriaId === categoriaActual) : PRODUCTOS;
    const filtrados = base.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
    );
    dibujarProductosPaginados(filtrados);
};

window.limpiarBusqueda = function() {
    const inp = document.getElementById("buscador-input");
    if (inp) inp.value = "";
    categoriaActual = 0;
    document.querySelectorAll(".filter-btn").forEach((b, i) => b.classList.toggle("active", i === 0));
    dibujarProductosPaginados(PRODUCTOS);
};

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
    dibujarFiltros();
    dibujarProductosPaginados(PRODUCTOS);
    updateCartBadge(loadCart());
    document.getElementById("buscador-input")?.addEventListener("keydown", e => {
        if (e.key === "Enter") window.buscar();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
