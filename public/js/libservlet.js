
/**
 * libservlet.js
 * Librería de comunicación asíncrona con los Servlets del servidor.
 * Se importa como módulo en los .js de cada página.
 *
 * Funciones exportadas:
 *  - obtenerProductos(url)          → GET → array de ProductoBD
 *  - obtenerCategorias(url)         → GET → array de CategoriaBD
 *  - enviarUsuarioServlet(url, form) → POST → respuesta JSON del servidor
 */

// ── Obtener productos (con o sin filtro de categoría) ──────────────────────────

export async function obtenerProductos(url) {
    const options = { method: "GET" };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Fallo en el servidor");
        const listaProductos = await response.json();
        return listaProductos;
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
}

// ── Obtener categorías ─────────────────────────────────────────────────────────

export async function obtenerCategorias(url) {
    const options = { method: "GET" };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Fallo en el servidor");
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        return [];
    }
}

// ── Enviar formulario a un Servlet (POST) ──────────────────────────────────────

export async function enviarUsuarioServlet(url, formulario) {
    const formularioDatos = new FormData(formulario);
    const parametros      = new URLSearchParams(formularioDatos);

    try {
        const response = await fetch(url, {
            method: "POST",
            body:   parametros
        });
        if (!response.ok) throw new Error("Fallo en el servidor");

        const respuesta = await response.json();
        console.log("Respuesta del servlet:", respuesta);
        return respuesta;
    } catch (error) {
        console.error("Hubo un error:", error);
        return { error: "Error en el servidor" };
    }
}

// ── Logout: Sincronizar preferencias y cerrar sesión ──────────────────────────

/**
 * logOut() - Función para cerrar sesión.
 * 
 * FLUJO:
 * 1. Obtiene tema actual del localStorage (clave: 'ctrl_user_theme')
 * 2. Obtiene estado del dashboard del localStorage (clave: 'dashboardState')
 * 3. Envía ambos parámetros al servlet LogOutTienda (POST a /logOut)
 * 4. Servlet guarda en BD y invalida sesión
 * 5. Si éxito: limpia localStorage completamente y redirige a index.html
 */
export async function loginServlet(url, formulario) {
    const params = new URLSearchParams(new FormData(formulario));
    try {
        const res = await fetch(url, { method: "POST", body: params });
        if (!res.ok) throw new Error("Fallo servidor");
        return await res.json();
    } catch (e) { console.error(e); return { ok: false, mensaje: "Error de conexión" }; }
}

export async function registrarServlet(url, formulario) {
    const params = new URLSearchParams(new FormData(formulario));
    try {
        const res = await fetch(url, { method: "POST", body: params });
        if (!res.ok) throw new Error("Fallo servidor");
        return await res.json();
    } catch (e) { console.error(e); return { ok: false, mensaje: "Error de conexión" }; }
}

export async function obtenerUsuario(url) {
    try {
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (e) { return { ok: false }; }
}

export async function modificarUsuario(url, datos) {
    const params = new URLSearchParams(datos);
    try {
        const res = await fetch(url, { method: "POST", body: params });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (e) { return { ok: false, mensaje: "Error de conexión" }; }
}

export async function cambiarClaveServlet(url, datos) {
    const params = new URLSearchParams(datos);
    try {
        const res = await fetch(url, { method: "POST", body: params });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (e) { return { ok: false, mensaje: "Error de conexión" }; }
}

export async function obtenerPedidos(url) {
    try {
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (e) { return { ok: false, pedidos: [] }; }
}

export async function cancelarPedidoServlet(url, datos) {
    const params = new URLSearchParams(datos);
    try {
        const res = await fetch(url, { method: "POST", body: params });
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (e) { return { ok: false }; }
}

// ── Logout: Sincronizar preferencias y cerrar sesión ──────────────────────────

/**
 * logOut() - Función para cerrar sesión.
 *
 * FLUJO:
 * 1. Obtiene tema actual del localStorage (clave: 'ctrl_user_theme')
 * 2. Obtiene estado del dashboard del localStorage (clave: 'dashboardState')
 * 3. Envía ambos parámetros al servlet LogOutTienda (POST a /logOut)
 * 4. Servlet guarda en BD y invalida sesión
 * 5. Si éxito: limpia localStorage completamente y redirige a index.html
 */
export async function logOut() {
    try {
        // ── PASO 1: Capturar tema actual
        let themeActual = localStorage.getItem('ctrl_user_theme') || JSON.stringify({ tema: 'ctrl', acento: 'burgundy', textura: 'none' });
        
        // ── PASO 2: Capturar estado del dashboard
        let dashboardState = localStorage.getItem('dashboardState') || '{}';
        
        // ── PASO 3: Preparar datos para enviar al servidor
        const parametros = new URLSearchParams();
        parametros.append('theme', themeActual);
        parametros.append('dashboardState', dashboardState);
        
        // ── PASO 4: POST al servlet LogOutTienda
        const response = await fetch('logOut', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: parametros
        });
        
        if (!response.ok) throw new Error("Error en el servidor");
        
        const data = await response.json();
        
        // ── PASO 5: Si logout exitoso, limpiar y redirigir
        if (data.success) {
            console.log("Logout exitoso. Limpiando localStorage...");
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirigir a index.html
            window.location.href = 'index.html';
        } else {
            console.error("Error en logout:", data.mensaje);
            alert("Error al cerrar sesión: " + data.mensaje);
        }
    } catch (error) {
        console.error("Error en logOut():", error);
        alert("Error de conexión. Por favor, recarga la página.");
    }
}

