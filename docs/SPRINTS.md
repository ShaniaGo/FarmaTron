# Planificación de Sprints - FarmaTron

**Duración de sprint**: 2 semanas  
**Inicio del proyecto**: Febrero 2026

---

## Sprint 1 – Fundamentos y autenticación

**Objetivo**: Estructura base, API, autenticación y primera pantalla funcional.

### Sprint Backlog

| Tarea | Responsable | Estado |
|-------|-------------|--------|
| Configurar proyecto Laravel (API REST) | Dev | ✅ |
| Configurar proyecto React (Vite, Tailwind) | Dev | ✅ |
| Migraciones de base de datos (usuarios, farmacias, medicamentos, etc.) | Dev | ✅ |
| Implementar registro e inicio de sesión (API + frontend) | Dev | ✅ |
| Integrar Laravel Sanctum para tokens | Dev | ✅ |
| Layout base (Navbar, Footer) y rutas | Dev | ✅ |
| Seeders con datos iniciales | Dev | ✅ |

### Entregables

- Backend API con auth
- Login y registro funcionales
- Layout con navegación

### Retrospectiva (notas)

- ✅ Definir bien el esquema de BD desde el inicio.
- 📌 Priorizar MigracionesSeeder para datos coherentes.

---

## Sprint 2 – Catálogo y carrito

**Objetivo**: Catálogo de medicamentos con búsqueda/filtros y carrito funcional.

### Sprint Backlog

| Tarea | Responsable | Estado |
|-------|-------------|--------|
| API: listar medicamentos con filtros (categoría, búsqueda) | Dev | ✅ |
| API: categorías de medicamentos | Dev | ✅ |
| MedicamentosSeeder (crear medicamentos y stock) | Dev | ✅ |
| Vista Medicamentos.jsx conectada a la API | Dev | ✅ |
| API: agregar al carrito | Dev | ✅ |
| API: ver, actualizar y eliminar items del carrito | Dev | ✅ |
| Modelo CarritoCompra (fillable, relaciones) | Dev | ✅ |
| Vista Carrito.jsx conectada a la API | Dev | ✅ |

### Entregables

- Catálogo con búsqueda y filtros
- Carrito completo (agregar, modificar cantidad, eliminar)

### Retrospectiva (notas)

- ✅ Separar MedicamentosSeeder para poder ejecutarlo sin fallar por usuarios duplicados.
- ✅ Cargar solo el área del grid al filtrar, manteniendo visible buscador y filtros.

---

## Sprint 3 – Mejoras UX y documentación

**Objetivo**: Mejoras de experiencia de usuario, documentación y metodología.

### Sprint Backlog

| Tarea | Responsable | Estado |
|-------|-------------|--------|
| Tooltips con Tippy.js en iconos del Navbar | Dev | ✅ |
| Estado activo en menú según ruta actual | Dev | ✅ |
| Cargar categorías una sola vez, medicamentos al filtrar | Dev | ✅ |
| Spinner solo en zona de resultados (Medicamentos) | Dev | ✅ |
| Toasts para feedback (agregar al carrito, etc.) | Dev | ✅ |
| Documentación técnica (DOCUMENTACION.md) | Dev | ✅ |
| Documentación de metodología (Scrum + XP) | Dev | ✅ |
| Product Backlog y planificación de sprints | Dev | ✅ |

### Entregables

- Mejoras de UX en catálogo y navegación
- Documentación de proyecto y metodología

---

## Sprint 4 – Checkout y pedidos (planificado)

**Objetivo**: Flujo completo de compra y seguimiento de pedidos.

### Sprint Backlog

| Tarea | Responsable | Estado |
|-------|-------------|--------|
| Vista Checkout con formulario (dirección, teléfono, método de pago) | Dev | Pendiente |
| Integrar creación de pedido desde carrito | Dev | Pendiente |
| Vista detalle de pedido con seguimiento | Dev | Pendiente |
| Limpiar carrito tras confirmar pedido | Dev | Pendiente |

### Entregables (objetivo)

- Checkout funcional
- Pedidos creados desde el carrito
- Seguimiento de estados de pedido

---

## Resumen de velocidad (estimado)

| Sprint | Tareas planificadas | Tareas completadas |
|--------|---------------------|--------------------|
| 1 | 7 | 7 |
| 2 | 8 | 8 |
| 3 | 8 | 8 |
| 4 | 4 | 0 |
