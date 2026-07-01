/* =====================================
   DATOS: ARREGLO DE EXPERIENCIAS
   ===================================== */

const experiencias = [
    {
        id: 1,
        nombre: "Navegación a las Capillas de Mármol",
        categoria: "navegacion",
        lugar: "Puerto Aysén",
        precio: 85000,
        cuposDisponibles: 15,
        descripcion: "Explora las impresionantes formaciones de mármol flotante en las aguas turquesas del lago General Carrera. Una experiencia única combinando naturaleza y aventura.",
        icono: "⛩️",
        descontarCupo(cantidad) {
            this.cuposDisponibles = Math.max(0, this.cuposDisponibles - cantidad);
        },
        estaDisponible(cantidad) {
            return cantidad > 0 && cantidad <= this.cuposDisponibles;
        }
    },
    {
        id: 2,
        nombre: "Trekking en Cerro Castillo",
        categoria: "trekking",
        lugar: "Cerro Castillo",
        precio: 65000,
        cuposDisponibles: 20,
        descripcion: "Ascenso guiado a través de paisajes montañosos espectaculares. Vistas panorámicas de la Patagonia y senderos bien marcados para diferentes niveles.",
        icono: "⛰️",
        descontarCupo(cantidad) {
            this.cuposDisponibles = Math.max(0, this.cuposDisponibles - cantidad);
        },
        estaDisponible(cantidad) {
            return cantidad > 0 && cantidad <= this.cuposDisponibles;
        }
    },
    {
        id: 3,
        nombre: "Navegación a la Laguna San Rafael",
        categoria: "navegacion",
        lugar: "Puerto Aysén",
        precio: 120000,
        cuposDisponibles: 10,
        descripcion: "Viaje en bote hacia el espectacular glaciar San Rafael. Observa el hielo ancestral calving en la laguna de aguas azul turquesa.",
        icono: "🏔️",
        descontarCupo(cantidad) {
            this.cuposDisponibles = Math.max(0, this.cuposDisponibles - cantidad);
        },
        estaDisponible(cantidad) {
            return cantidad > 0 && cantidad <= this.cuposDisponibles;
        }
    },
    {
        id: 4,
        nombre: "Pesca con Mosca en Ríos Patagónicos",
        categoria: "pesca",
        lugar: "Cochrane",
        precio: 95000,
        cuposDisponibles: 8,
        descripcion: "Experiencia de pesca deportiva con mosca en ríos prístinos de la Patagonia. Guías especializados y equipamiento incluido.",
        icono: "🎣",
        descontarCupo(cantidad) {
            this.cuposDisponibles = Math.max(0, this.cuposDisponibles - cantidad);
        },
        estaDisponible(cantidad) {
            return cantidad > 0 && cantidad <= this.cuposDisponibles;
        }
    },
    {
        id: 5,
        nombre: "Kayak en Fiordos de Aysén",
        categoria: "deportes",
        lugar: "Caleta Tortel",
        precio: 75000,
        cuposDisponibles: 12,
        descripcion: "Remar en aguas tranquilas rodeado de paisajes de fiordos patagónicos. Vida silvestre, cascadas y naturaleza virgen.",
        icono: "🏄",
        descontarCupo(cantidad) {
            this.cuposDisponibles = Math.max(0, this.cuposDisponibles - cantidad);
        },
        estaDisponible(cantidad) {
            return cantidad > 0 && cantidad <= this.cuposDisponibles;
        }
    },
    {
        id: 6,
        nombre: "Recorrido por la Carretera Austral",
        categoria: "cultura",
        lugar: "Chile Chico",
        precio: 55000,
        cuposDisponibles: 25,
        descripcion: "Viaje panorámico por la legendaria Carretera Austral. Pueblos pintorescos, vistas montañosas y historia de la Patagonia.",
        icono: "🛣️",
        descontarCupo(cantidad) {
            this.cuposDisponibles = Math.max(0, this.cuposDisponibles - cantidad);
        },
        estaDisponible(cantidad) {
            return cantidad > 0 && cantidad <= this.cuposDisponibles;
        }
    }
];

/* =====================================
   UTILIDADES
   ===================================== */

/**
 * Escapa caracteres HTML para prevenir XSS
 */
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

/**
 * Obtiene una experiencia por ID
 */
function obtenerExperiencia(id) {
    return experiencias.find(exp => exp.id === id);
}

/**
 * Filtra experiencias por categoría
 */
function filtrarExperiencias(categoria) {
    return categoria === "todos" 
        ? experiencias 
        : experiencias.filter(exp => exp.categoria === categoria);
}

/* =====================================
   RENDERIZADO DEL DOM
   ===================================== */

/**
 * Renderiza dinámicamente las tarjetas de experiencias
 */
function renderExperiencias(lista) {
    const container = document.getElementById("tarjetas-container");
    container.innerHTML = "";
    
    if (lista.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 2rem;">No hay experiencias disponibles en esta categoría.</p>';
        return;
    }
    
    lista.forEach(exp => container.appendChild(crearTarjeta(exp)));
}

/**
 * Crea el elemento DOM de una tarjeta
 */
function crearTarjeta(exp) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    const sinCupos = exp.cuposDisponibles <= 0;
    
    tarjeta.innerHTML = `
        <div class="tarjeta-icono">${exp.icono}</div>
        <div class="tarjeta-contenido">
            <h3 class="tarjeta-titulo">${escaparHTML(exp.nombre)}</h3>
            <p class="tarjeta-metadata">📍 ${escaparHTML(exp.lugar)}</p>
            <span class="tarjeta-categoria">${escaparHTML(exp.categoria)}</span>
            <p class="tarjeta-precio">$${exp.precio.toLocaleString('es-CL')}</p>
            <p class="tarjeta-cupos ${sinCupos ? 'sin-cupos' : ''}">
                Cupos: <strong>${exp.cuposDisponibles}</strong>
            </p>
            <div class="tarjeta-descripcion">
                <p>${escaparHTML(exp.descripcion)}</p>
            </div>
            <div class="tarjeta-acciones">
                <button class="btn-vermas" data-id="${exp.id}">Ver más</button>
                <button class="btn-reservar" data-id="${exp.id}" ${sinCupos ? 'disabled' : ''}>
                    ${sinCupos ? 'Sin cupos' : 'Reservar'}
                </button>
            </div>
        </div>
    `;
    
    return tarjeta;
}

/**
 * Puebla el select de experiencias
 */
function poblarSelect() {
    const select = document.getElementById("experiencia");
    experiencias.forEach(exp => {
        const option = document.createElement("option");
        option.value = exp.id;
        option.textContent = exp.nombre;
        select.appendChild(option);
    });
}

/**
 * Actualiza el resumen de la reserva
 */
function actualizarResumen(exp, personas) {
    const resumen = document.getElementById("resumen-contenido");
    
    if (!exp) {
        resumen.innerHTML = '<p class="placeholder-resumen">Selecciona una experiencia para ver el resumen</p>';
        return;
    }
    
    const total = exp.precio * personas;
    resumen.innerHTML = `
        <div class="resumen-item">
            <span class="resumen-label">Experiencia</span>
            <p class="resumen-valor">${escaparHTML(exp.nombre)}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Ubicación</span>
            <p class="resumen-valor">${escaparHTML(exp.lugar)}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Precio por persona</span>
            <p class="resumen-valor">$${exp.precio.toLocaleString('es-CL')}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Cantidad</span>
            <p class="resumen-valor">${personas}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label"><strong>Total</strong></span>
            <p class="resumen-valor" style="font-size: 1.2rem; color: #f97316; font-weight: bold;">$${total.toLocaleString('es-CL')}</p>
        </div>
    `;
}

/* =====================================
   VALIDADOR DE FORMULARIO
   ===================================== */

const Validador = {
    reglas: {
        nombre: (val) => val.trim().length >= 3 ? null : "El nombre debe tener al menos 3 caracteres",
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : "Email inválido",
        experiencia: (val) => val ? null : "Debes seleccionar una experiencia",
        personas: (val, exp) => {
            if (!val || val < 1) return "Ingresa un número válido";
            if (val > 20) return "Máximo 20 personas";
            if (exp && !exp.estaDisponible(val)) return `Solo hay ${exp.cuposDisponibles} cupos`;
            return null;
        },
        fecha: (val) => {
            if (!val) return "La fecha es obligatoria";
            const fecha = new Date(val);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            return fecha >= hoy ? null : "Selecciona una fecha futura";
        }
    },

    validar(datos) {
        const errores = {};
        
        if (this.reglas.nombre(datos.nombre)) 
            errores.nombre = this.reglas.nombre(datos.nombre);
        
        if (this.reglas.email(datos.email)) 
            errores.email = this.reglas.email(datos.email);
        
        if (this.reglas.experiencia(datos.experiencia)) 
            errores.experiencia = this.reglas.experiencia(datos.experiencia);
        
        if (this.reglas.personas(datos.personas, datos.exp)) 
            errores.personas = this.reglas.personas(datos.personas, datos.exp);
        
        if (this.reglas.fecha(datos.fecha)) 
            errores.fecha = this.reglas.fecha(datos.fecha);
        
        return errores;
    }
};

/**
 * Muestra/limpia errores en el formulario
 */
function mostrarErrores(errores) {
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    document.querySelectorAll("input, select").forEach(el => el.classList.remove("error"));
    
    Object.entries(errores).forEach(([campo, mensaje]) => {
        const input = document.getElementById(campo);
        const span = document.getElementById(`error-${campo}`);
        if (input && span) {
            input.classList.add("error");
            span.textContent = mensaje;
        }
    });
}

/* =====================================
   MANEJO DE EVENTOS (DELEGACIÓN)
   ===================================== */

/**
 * Delegación de eventos para tarjetas
 */
document.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    
    if (e.target.classList.contains("btn-vermas")) {
        const desc = e.target.closest(".tarjeta").querySelector(".tarjeta-descripcion");
        desc.classList.toggle("visible");
        e.target.textContent = desc.classList.contains("visible") ? "Ver menos" : "Ver más";
    }
    
    if (e.target.classList.contains("btn-reservar")) {
        const exp = obtenerExperiencia(id);
        if (exp) {
            document.getElementById("experiencia").value = exp.id;
            actualizarResumen(exp, 1);
            document.getElementById("reserva").scrollIntoView({ behavior: "smooth" });
        }
    }
    
    if (e.target.classList.contains("filtro-btn")) {
        document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("activo"));
        e.target.classList.add("activo");
        const categoria = e.target.dataset.filtro;
        renderExperiencias(filtrarExperiencias(categoria));
    }
});

/* =====================================
   EVENTOS DEL FORMULARIO
   ===================================== */

const formulario = document.getElementById("formulario-reserva");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        experiencia: parseInt(document.getElementById("experiencia").value),
        personas: parseInt(document.getElementById("personas").value),
        fecha: document.getElementById("fecha").value,
        exp: obtenerExperiencia(parseInt(document.getElementById("experiencia").value))
    };
    
    const errores = Validador.validar(datos);
    
    if (Object.keys(errores).length > 0) {
        mostrarErrores(errores);
        return;
    }
    
    // Procesar reserva exitosa
    datos.exp.descontarCupo(datos.personas);
    renderExperiencias(filtrarExperiencias("todos"));
    
    const msg = document.getElementById("mensaje-exito");
    msg.innerHTML = `
        ✅ ¡Reserva confirmada!<br>
        <strong>${escaparHTML(datos.nombre)}</strong>, tu reserva para 
        <strong>${escaparHTML(datos.exp.nombre)}</strong> 
        para ${datos.personas} ${datos.personas === 1 ? 'persona' : 'personas'} el 
        <strong>${new Date(datos.fecha).toLocaleDateString('es-CL')}</strong> 
        ha sido confirmada. Te enviaremos un email a <strong>${escaparHTML(datos.email)}</strong>
    `;
    msg.classList.add("visible");
    
    formulario.reset();
    mostrarErrores({});
    actualizarResumen(null, 1);
    msg.scrollIntoView({ behavior: "smooth" });
});

// Eventos de actualización en tiempo real
document.getElementById("personas").addEventListener("change", () => {
    const exp = obtenerExperiencia(parseInt(document.getElementById("experiencia").value));
    const personas = parseInt(document.getElementById("personas").value) || 1;
    actualizarResumen(exp, personas);
});

document.getElementById("experiencia").addEventListener("change", () => {
    const exp = obtenerExperiencia(parseInt(document.getElementById("experiencia").value));
    actualizarResumen(exp, parseInt(document.getElementById("personas").value) || 1);
});

/* =====================================
   INICIALIZACIÓN
   ===================================== */

window.addEventListener("DOMContentLoaded", () => {
    renderExperiencias(experiencias);
    poblarSelect();
    console.log("✅ Aplicación inicializada");
});
