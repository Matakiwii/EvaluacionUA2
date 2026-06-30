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
        icono: "⛩️"
    },
    {
        id: 2,
        nombre: "Trekking en Cerro Castillo",
        categoria: "trekking",
        lugar: "Cerro Castillo",
        precio: 65000,
        cuposDisponibles: 20,
        descripcion: "Ascenso guiado a través de paisajes montañosos espectaculares. Vistas panorámicas de la Patagonia y senderos bien marcados para diferentes niveles.",
        icono: "⛰️"
    },
    {
        id: 3,
        nombre: "Navegación a la Laguna San Rafael",
        categoria: "navegacion",
        lugar: "Puerto Aysén",
        precio: 120000,
        cuposDisponibles: 10,
        descripcion: "Viaje en bote hacia el espectacular glaciar San Rafael. Observa el hielo ancestral calving en la laguna de aguas azul turquesa.",
        icono: "🏔️"
    },
    {
        id: 4,
        nombre: "Pesca con Mosca en Ríos Patagónicos",
        categoria: "pesca",
        lugar: "Cochrane",
        precio: 95000,
        cuposDisponibles: 8,
        descripcion: "Experiencia de pesca deportiva con mosca en ríos prístinos de la Patagonia. Guías especializados y equipamiento incluido.",
        icono: "🎣"
    },
    {
        id: 5,
        nombre: "Kayak en Fiordos de Aysén",
        categoria: "deportes",
        lugar: "Caleta Tortel",
        precio: 75000,
        cuposDisponibles: 12,
        descripcion: "Remar en aguas tranquilas rodeado de paisajes de fiordos patagónicos. Vida silvestre, cascadas y naturaleza virgen.",
        icono: "🏄"
    },
    {
        id: 6,
        nombre: "Recorrido por la Carretera Austral",
        categoria: "cultura",
        lugar: "Chile Chico",
        precio: 55000,
        cuposDisponibles: 25,
        descripcion: "Viaje panorámico por la legendaria Carretera Austral. Pueblos pintorescos, vistas montañosas y historia de la Patagonia.",
        icono: "🛣️"
    }
];

/* =====================================
   VARIABLES GLOBALES
   ===================================== */

let filtroActual = "todos";
let reservaSeleccionada = null;

/* =====================================
   FUNCIONES: RENDERIZADO Y FILTRADO
   ===================================== */

/**
 * Renderiza dinámicamente las tarjetas de experiencias
 * @param {Array} lista - Arreglo de experiencias a mostrar
 */
function renderExperiencias(lista) {
    const container = document.getElementById("tarjetas-container");
    
    // Limpiar contenedor
    container.innerHTML = "";
    
    // Si la lista está vacía
    if (lista.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 2rem;">No hay experiencias disponibles en esta categoría.</p>';
        return;
    }
    
    // Crear tarjeta por cada experiencia
    lista.forEach(experiencia => {
        const tarjeta = crearTarjetaExperiencia(experiencia);
        container.appendChild(tarjeta);
    });
}

/**
 * Crea el elemento DOM de una tarjeta de experiencia
 * @param {Object} experiencia - Objeto con datos de la experiencia
 * @returns {HTMLElement} - Elemento tarjeta
 */
function crearTarjetaExperiencia(experiencia) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    
    // Verificar si hay cupos disponibles
    const sinCupos = experiencia.cuposDisponibles <= 0;
    
    // Usar textContent para evitar XSS
    tarjeta.innerHTML = `
        <div class="tarjeta-icono">${experiencia.icono}</div>
        <div class="tarjeta-contenido">
            <h3 class="tarjeta-titulo">${escaparHTML(experiencia.nombre)}</h3>
            <p class="tarjeta-metadata">
                📍 ${escaparHTML(experiencia.lugar)}
            </p>
            <span class="tarjeta-categoria">${escaparHTML(experiencia.categoria)}</span>
            <p class="tarjeta-precio">$${experiencia.precio.toLocaleString('es-CL')}</p>
            <p class="tarjeta-cupos ${sinCupos ? 'sin-cupos' : ''}">
                Cupos disponibles: <strong>${experiencia.cuposDisponibles}</strong>
            </p>
            <div class="tarjeta-descripcion">
                <p>${escaparHTML(experiencia.descripcion)}</p>
            </div>
            <div class="tarjeta-acciones">
                <button class="btn-vermas" data-id="${experiencia.id}">Ver más</button>
                <button class="btn-reservar" data-id="${experiencia.id}" ${sinCupos ? 'disabled' : ''}>
                    ${sinCupos ? 'Sin cupos' : 'Reservar'}
                </button>
            </div>
        </div>
    `;
    
    return tarjeta;
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} texto - Texto a escapar
 * @returns {string} - Texto escapado
 */
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

/**
 * Filtra experiencias por categoría
 * @param {string} categoria - Categoría a filtrar
 */
function filtrarPorCategoria(categoria) {
    filtroActual = categoria;
    
    const listaFiltrada = categoria === "todos" 
        ? experiencias 
        : experiencias.filter(exp => exp.categoria === categoria);
    
    renderExperiencias(listaFiltrada);
    agregarEventosTarjetas();
}

/* =====================================
   FUNCIONES: EVENTOS DE TARJETAS
   ===================================== */

/**
 * Agrega eventos a los botones de las tarjetas
 */
function agregarEventosTarjetas() {
    // Eventos para botones "Ver más/Ver menos"
    document.querySelectorAll(".btn-vermas").forEach(btn => {
        btn.addEventListener("click", function() {
            const tarjeta = this.closest(".tarjeta");
            const descripcion = tarjeta.querySelector(".tarjeta-descripcion");
            
            descripcion.classList.toggle("visible");
            this.textContent = descripcion.classList.contains("visible") ? "Ver menos" : "Ver más";
        });
    });
    
    // Eventos para botones "Reservar"
    document.querySelectorAll(".btn-reservar").forEach(btn => {
        btn.addEventListener("click", function(e) {
            const id = parseInt(this.dataset.id);
            const experiencia = experiencias.find(exp => exp.id === id);
            
            if (experiencia) {
                seleccionarExperiencia(experiencia);
            }
        });
    });
}

/**
 * Selecciona una experiencia para la reserva
 * @param {Object} experiencia - Experiencia seleccionada
 */
function seleccionarExperiencia(experiencia) {
    reservaSeleccionada = experiencia;
    actualizarResumen();
    
    // Scroll suave hacia el formulario
    document.getElementById("experiencia").value = experiencia.id;
    document.getElementById("reserva").scrollIntoView({ behavior: "smooth" });
}

/**
 * Actualiza el resumen de reserva en tiempo real
 */
function actualizarResumen() {
    const resumenContenido = document.getElementById("resumen-contenido");
    
    if (!reservaSeleccionada) {
        resumenContenido.innerHTML = '<p class="placeholder-resumen">Selecciona una experiencia para ver el resumen</p>';
        return;
    }
    
    const personas = parseInt(document.getElementById("personas").value) || 1;
    const precioTotal = reservaSeleccionada.precio * personas;
    
    resumenContenido.innerHTML = `
        <div class="resumen-item">
            <span class="resumen-label">Experiencia</span>
            <p class="resumen-valor">${escaparHTML(reservaSeleccionada.nombre)}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Ubicación</span>
            <p class="resumen-valor">${escaparHTML(reservaSeleccionada.lugar)}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Precio por persona</span>
            <p class="resumen-valor">$${reservaSeleccionada.precio.toLocaleString('es-CL')}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Cantidad de personas</span>
            <p class="resumen-valor">${personas}</p>
        </div>
        <div class="resumen-item">
            <span class="resumen-label"><strong>Precio total</strong></span>
            <p class="resumen-valor" style="font-size: 1.2rem; color: #f97316; font-weight: bold;">$${precioTotal.toLocaleString('es-CL')}</p>
        </div>
    `;
}

/* =====================================
   FUNCIONES: VALIDACIÓN DE FORMULARIO
   ===================================== */

/**
 * Valida el formulario de reserva
 * @returns {boolean} - True si el formulario es válido
 */
function validarFormulario() {
    // Limpiar mensajes de error previos
    limpiarErrores();
    
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const experienciaId = document.getElementById("experiencia").value;
    const personas = parseInt(document.getElementById("personas").value);
    const fecha = document.getElementById("fecha").value;
    
    let esValido = true;
    
    // Validar nombre
    if (!nombre) {
        mostrarError("nombre", "El nombre completo es obligatorio.");
        esValido = false;
    } else if (nombre.length < 3) {
        mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
        esValido = false;
    }
    
    // Validar email
    if (!email) {
        mostrarError("email", "El email es obligatorio.");
        esValido = false;
    } else if (!validarFormatoEmail(email)) {
        mostrarError("email", "Por favor ingresa un email válido.");
        esValido = false;
    }
    
    // Validar experiencia
    if (!experienciaId) {
        mostrarError("experiencia", "Debes seleccionar una experiencia.");
        esValido = false;
    }
    
    // Validar número de personas
    if (!personas || personas < 1) {
        mostrarError("personas", "Ingresa un número válido de personas.");
        esValido = false;
    } else if (personas > 20) {
        mostrarError("personas", "No se pueden reservar más de 20 personas.");
        esValido = false;
    } else if (reservaSeleccionada && personas > reservaSeleccionada.cuposDisponibles) {
        mostrarError("personas", `Solo hay ${reservaSeleccionada.cuposDisponibles} cupos disponibles.`);
        esValido = false;
    }
    
    // Validar fecha
    if (!fecha) {
        mostrarError("fecha", "La fecha es obligatoria.");
        esValido = false;
    } else {
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada < hoy) {
            mostrarError("fecha", "Selecciona una fecha futura.");
            esValido = false;
        }
    }
    
    return esValido;
}

/**
 * Valida formato de email con regex
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el email es válido
 */
function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Muestra un mensaje de error junto a un campo
 * @param {string} campo - ID del campo
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(campo, mensaje) {
    const input = document.getElementById(campo);
    const errorSpan = document.getElementById(`error-${campo}`);
    
    input.classList.add("error");
    // Usar textContent para evitar XSS
    errorSpan.textContent = mensaje;
}

/**
 * Limpia todos los errores del formulario
 */
function limpiarErrores() {
    document.querySelectorAll(".error-message").forEach(span => {
        span.textContent = "";
    });
    document.querySelectorAll(".form-group input, .form-group select").forEach(input => {
        input.classList.remove("error");
    });
    document.getElementById("mensaje-error-general").classList.remove("visible");
}

/* =====================================
   FUNCIONES: MANEJO DE RESERVAS
   ===================================== */

/**
 * Descuenta cupos de una experiencia
 * @param {number} experienciaId - ID de la experiencia
 * @param {number} cantidad - Cantidad de cupos a descontar
 */
function descontarCupo(experienciaId, cantidad) {
    const experiencia = experiencias.find(exp => exp.id === experienciaId);
    if (experiencia) {
        experiencia.cuposDisponibles -= cantidad;
    }
}

/**
 * Maneja el envío del formulario de reserva
 * @param {Event} event - Evento del formulario
 */
function manejarEnvioFormulario(event) {
    event.preventDefault();
    
    // Limpiar mensajes previos
    document.getElementById("mensaje-exito").classList.remove("visible");
    document.getElementById("mensaje-exito").textContent = "";
    
    // Validar formulario
    if (!validarFormulario()) {
        return;
    }
    
    // Obtener datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const experienciaId = parseInt(document.getElementById("experiencia").value);
    const personas = parseInt(document.getElementById("personas").value);
    const fecha = document.getElementById("fecha").value;
    
    // Descontar cupos
    descontarCupo(experienciaId, personas);
    
    // Actualizar vista de tarjetas
    renderExperiencias(
        filtroActual === "todos" 
            ? experiencias 
            : experiencias.filter(exp => exp.categoria === filtroActual)
    );
    agregarEventosTarjetas();
    
    // Mostrar mensaje de éxito
    const experienciaReservada = experiencias.find(exp => exp.id === experienciaId);
    const mensajeExito = document.getElementById("mensaje-exito");
    
    mensajeExito.innerHTML = `
        ✅ ¡Reserva confirmada!<br>
        <strong>${escaparHTML(nombre)}</strong>, tu reserva para 
        <strong>${escaparHTML(experienciaReservada.nombre)}</strong> 
        para ${personas} ${personas === 1 ? 'persona' : 'personas'} el 
        <strong>${new Date(fecha).toLocaleDateString('es-CL')}</strong> 
        ha sido confirmada. Te enviaremos un email a <strong>${escaparHTML(email)}</strong>
    `;
    mensajeExito.classList.add("visible");
    
    // Limpiar formulario
    document.getElementById("formulario-reserva").reset();
    limpiarErrores();
    reservaSeleccionada = null;
    actualizarResumen();
    
    // Scroll al mensaje
    mensajeExito.scrollIntoView({ behavior: "smooth" });
}

/* =====================================
   FUNCIONES: INICIALIZACIÓN
   ===================================== */

/**
 * Llena el select de experiencias con opciones
 */
function poblarSelectExperiencias() {
    const select = document.getElementById("experiencia");
    
    experiencias.forEach(experiencia => {
        const option = document.createElement("option");
        option.value = experiencia.id;
        option.textContent = experiencia.nombre;
        select.appendChild(option);
    });
}

/**
 * Agrega event listeners a los botones de filtro
 */
function agregarEventosFiltros() {
    document.querySelectorAll(".filtro-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            // Remover clase activo de todos los botones
            document.querySelectorAll(".filtro-btn").forEach(b => {
                b.classList.remove("activo");
            });
            
            // Agregar clase activo al botón clickeado
            this.classList.add("activo");
            
            // Filtrar experiencias
            const categoria = this.dataset.filtro;
            filtrarPorCategoria(categoria);
        });
    });
}

/**
 * Agrega event listeners al formulario y campos
 */
function agregarEventosFormulario() {
    // Evento del formulario
    document.getElementById("formulario-reserva").addEventListener("submit", manejarEnvioFormulario);
    
    // Evento para actualizar resumen cuando cambia personas o experiencia
    document.getElementById("personas").addEventListener("change", actualizarResumen);
    document.getElementById("experiencia").addEventListener("change", function() {
        const id = parseInt(this.value);
        if (id) {
            reservaSeleccionada = experiencias.find(exp => exp.id === id);
            actualizarResumen();
        }
    });
}

/**
 * Inicializa la aplicación
 */
function inicializar() {
    // Renderizar experiencias iniciales
    renderExperiencias(experiencias);
    
    // Agregar eventos a tarjetas
    agregarEventosTarjetas();
    
    // Agregar eventos a filtros
    agregarEventosFiltros();
    
    // Poblar select de experiencias
    poblarSelectExperiencias();
    
    // Agregar eventos al formulario
    agregarEventosFormulario();
    
    console.log("✅ Aplicación inicializada correctamente");
}

/* =====================================
   EJECUTAR AL CARGAR LA PÁGINA
   ===================================== */

// Esperar a que el DOM esté listo
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
} else {
    // Si el script se carga después
    inicializar();
}
