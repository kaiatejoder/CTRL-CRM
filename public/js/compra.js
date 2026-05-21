const STORAGE_KEY = "ctrl-studio-carrito";

function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2800);
}

let datosEnvio = {};

function renderResumen() {
    const cart = getCart();
    const cont = document.getElementById("compra-items");
    if (!cart.length) {
        cont.innerHTML = '<p style="color:var(--txt-muted);font-size:0.88rem">Carrito vacío</p>';
        document.getElementById("compra-total").textContent = "0,00€";
        return;
    }
    let total = 0;
    let html = '';
    cart.forEach(p => {
        const sub = p.precio * p.cantidad;
        total += sub;
        html += `<div class="resumen-item"><span>${p.nombre} × ${p.cantidad}</span><span>${sub.toFixed(2).replace('.',',')}€</span></div>`;
    });
    const totalConIva = total * 1.21;
    cont.innerHTML = html;
    document.getElementById("compra-total").textContent = totalConIva.toFixed(2).replace('.',',') + '€';
}

document.getElementById("form-envio").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!this.checkValidity()) { this.reportValidity(); return; }
    datosEnvio = {
        domicilio: document.getElementById("env-domicilio").value,
        poblacion: document.getElementById("env-poblacion").value,
        provincia: document.getElementById("env-provincia").value,
        cp:        document.getElementById("env-cp").value
    };
    document.getElementById("paso-envio").style.display = "none";
    document.getElementById("paso-pago").style.display  = "block";
});

window.volverEnvio = function() {
    document.getElementById("paso-pago").style.display  = "none";
    document.getElementById("paso-envio").style.display = "block";
};

document.getElementById("form-pago").addEventListener("submit", async function(e) {
    e.preventDefault();
    const cart = getCart();
    if (!cart.length) { showToast("El carrito está vacío"); return; }

    const params = new URLSearchParams();
    params.append("carrito", JSON.stringify(cart));
    params.append("domicilio", datosEnvio.domicilio || '');
    params.append("poblacion", datosEnvio.poblacion  || '');
    params.append("provincia", datosEnvio.provincia  || '');
    params.append("cp",        datosEnvio.cp         || '');

    try {
        const res  = await fetch("insertarPedido.html", { method: "POST", body: params });
        const data = await res.json();
        if (data.ok) {
            localStorage.removeItem(STORAGE_KEY);
            document.getElementById("conf-ref").textContent = data.referencia;
            document.getElementById("paso-pago").style.display         = "none";
            document.getElementById("paso-confirmacion").style.display = "block";
        } else {
            showToast(data.mensaje || "Error al procesar el pedido");
        }
    } catch (err) {
        showToast("Error de conexión");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderResumen();
    if (!getCart().length) {
        showToast("El carrito está vacío");
        setTimeout(() => window.location.href = "carrito.html", 1500);
    }
});
