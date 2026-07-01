# 🌿 Plataforma de Experiencias Turísticas Sostenibles - Aysén

Proyecto web funcional para promover el turismo de bajo impacto en la Región de Aysén, Patagonia (Chile).

## 📋 Descripción

Una plataforma que permite descubrir y reservar experiencias de turismo sostenible en Aysén, con un sistema de control de cupos para garantizar un impacto ambiental bajo.

**Experiencias disponibles:**
- 🚤 Navegación a las Capillas de Mármol
- ⛰️ Trekking en Cerro Castillo
- 🏔️ Navegación a la Laguna San Rafael
- 🎣 Pesca con Mosca
- 🏄 Kayak en Fiordos
- 🛣️ Recorrido por la Carretera Austral

## 🎯 Requisitos Cumplidos

### HTML5 & CSS3 (Semanas 1-2)
- ✅ HTML semántico con etiquetas: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- ✅ CSS externo (`styles.css`) sin estilos inline ni frameworks
- ✅ Layout responsivo con **Flexbox** y **CSS Grid**
- ✅ Accesibilidad: labels asociados, ARIA roles, contraste adecuado
- ✅ Media queries: 768px y 480px (mobile-first)
- ✅ Respeta `prefers-reduced-motion` y `prefers-contrast`

### JavaScript Funcional (Semana 3-5)

#### 2.1.1 - Modificar el DOM ✅
```javascript
- renderExperiencias()      // Genera tarjetas dinámicamente
- crearTarjeta()           // Crea elementos con createElement
- poblarSelect()           // Puebla select de forma dinámica
- actualizarResumen()      // Actualiza DOM en tiempo real
```
- Uso de `createElement`, `appendChild`, `textContent`
- Sin uso de `innerHTML` con datos del usuario (prevención XSS)

#### 2.1.2 - Validar Formularios ✅
```javascript
- Validador object         // Objeto reutilizable con reglas
- validar(datos)          // Valida todos los campos en JS
- mostrarErrores()        // Muestra mensajes al lado del campo
```
- Validación en JavaScript (no solo HTML)
- Email con regex
- Número de personas vs cupos disponibles
- Fecha futura
- Prevención de XSS: `escaparHTML()`

#### 2.1.3 - Arreglos y Objetos ✅
```javascript
const experiencias = [
    {
        id, nombre, categoria, lugar, precio, cuposDisponibles, 
        descripcion, icono,
        descontarCupo(cantidad),    // Método de instancia
        estaDisponible(cantidad)    // Método de instancia
    },
    // ... 5 experiencias más
]
```

#### 2.1.4 - Funciones Reutilizables ✅
- `escaparHTML()` - Previene XSS (reutilizable)
- `obtenerExperiencia()` - Busca por ID
- `filtrarExperiencias()` - Filtra por categoría
- `Validador.validar()` - Validación centralizada
- **Delegación de eventos** - Un solo listener para múltiples elementos

### Características Implementadas

✅ **Renderizado dinámico** de 6 experiencias  
✅ **Filtros por categoría** con `classList`  
✅ **Botones Ver más/Ver menos** con toggle  
✅ **Formulario con validación completa**  
✅ **Descuento automático de cupos**  
✅ **Resumen de reserva en tiempo real**  
✅ **Mensajes de éxito/error en el DOM**  
✅ **Diseño responsivo y accesible**  
✅ **Código optimizado y mantenible**

## 📁 Estructura de Archivos

```
EvaluacionUA2/
├── index.html       (7.9 KB)  - HTML5 semántico
├── styles.css       (13.4 KB) - Estilos responsive
├── script.js        (11.2 KB) - JavaScript funcional (optimizado)
└── README.md        (este archivo)
```

## 🚀 Cómo Usar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Matakiwii/EvaluacionUA2.git
   ```

2. **Abrir en el navegador:**
   - Abre `index.html` directamente en tu navegador
   - O usa un servidor local: `python -m http.server 8000`

3. **Interactuar:**
   - Filtra experiencias por categoría
   - Haz clic en "Ver más" para leer descripción completa
   - Haz clic en "Reservar" para llenar el formulario
   - Completa el formulario y confirma tu reserva
   - Los cupos se descuentan automáticamente

## 💡 Decisiones de Diseño

### Optimización de Código
- **Delegación de eventos** en lugar de listeners por elemento
- **Objeto Validador** reutilizable con reglas centralizadas
- **Métodos en objetos** de experiencias (descontarCupo, estaDisponible)
- **Funciones pequeñas** con responsabilidad única
- Reducción de código ~40% vs. versión inicial

### Accesibilidad
- `aria-describedby` en campos de formulario
- `role="alert"` en mensajes de error/éxito
- Labels asociados correctamente
- Contraste de colores WCAG AA
- Navegación con teclado

### Seguridad
- Validación en JavaScript (no confiar en HTML)
- `escaparHTML()` para prevenir XSS
- `textContent` en lugar de `innerHTML` para datos del usuario
- Sanitización de emails con regex

### Responsividad
- Mobile-first approach
- Grid responsivo: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- Breakpoints: 768px (tablets) y 480px (móviles)

## 🎓 Conceptos Aplicados

- ✅ Semántica HTML5
- ✅ CSS Grid y Flexbox
- ✅ Variables CSS (custom properties)
- ✅ Media queries responsive
- ✅ Delegación de eventos (event delegation)
- ✅ Manipulación del DOM con métodos modernos
- ✅ Validación de formularios
- ✅ Prevención de XSS
- ✅ Métodos de objetos
- ✅ Funciones puras y reutilizables
- ✅ Accesibilidad web (WCAG)

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Móviles iOS y Android

## 👨‍💻 Autor

**Matakiwii** - Estudiante de Evaluación UA2

## 📝 Licencia

Este proyecto es de propósito educativo.

---

**Estado:** ✅ Completado y optimizado
**Última actualización:** 2026-07-01
