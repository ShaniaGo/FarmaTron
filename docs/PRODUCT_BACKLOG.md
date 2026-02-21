# Product Backlog - FarmaTron

Lista priorizada de requisitos y historias de usuario del proyecto.

**Formato**: Como [rol], quiero [acción] para [beneficio].

---

## Historias de Usuario

### Autenticación

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-01 | Como visitante, quiero **registrarme** con email, contraseña y datos personales para crear mi cuenta de cliente | Alta | ✅ Hecho |
| US-02 | Como visitante, quiero **iniciar sesión** con email y contraseña para acceder a mi cuenta | Alta | ✅ Hecho |
| US-03 | Como usuario autenticado, quiero **cerrar sesión** para proteger mi cuenta en equipos compartidos | Media | ✅ Hecho |

### Catálogo de Medicamentos

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-04 | Como cliente, quiero **ver el catálogo de medicamentos** para encontrar lo que necesito | Alta | ✅ Hecho |
| US-05 | Como cliente, quiero **buscar medicamentos por nombre** para encontrar productos específicos | Alta | ✅ Hecho |
| US-06 | Como cliente, quiero **filtrar medicamentos por categoría** para refinar mi búsqueda | Alta | ✅ Hecho |
| US-07 | Como cliente, quiero ver **precio, stock y farmacia** de cada medicamento para tomar decisiones | Alta | ✅ Hecho |

### Carrito

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-08 | Como cliente autenticado, quiero **agregar medicamentos al carrito** para comprarlos después | Alta | ✅ Hecho |
| US-09 | Como cliente, quiero **ver mi carrito** con los productos, cantidades y totales | Alta | ✅ Hecho |
| US-10 | Como cliente, quiero **modificar la cantidad** de un producto en el carrito | Alta | ✅ Hecho |
| US-11 | Como cliente, quiero **eliminar productos del carrito** si ya no los necesito | Alta | ✅ Hecho |
| US-12 | Como cliente, quiero ver el **resumen del pedido** (subtotal, envío, total) antes de confirmar | Media | ✅ Hecho |

### Pedidos

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-13 | Como cliente, quiero **ver el historial de mis pedidos** para hacer seguimiento | Alta | ✅ Hecho |
| US-14 | Como cliente, quiero **crear un pedido** desde el carrito con dirección y método de pago | Alta | 🔄 Pendiente |
| US-15 | Como cliente, quiero **ver el seguimiento** de mi pedido (estados) | Media | 🔄 Pendiente |

### Perfil y Navegación

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-16 | Como usuario, quiero **acceder a mi perfil** para ver y editar mis datos | Media | ✅ Hecho |
| US-17 | Como usuario, quiero **navegar fácilmente** entre Inicio, Medicamentos, Farmacias, Carrito y Pedidos | Alta | ✅ Hecho |
| US-18 | Como usuario, quiero **tooltips en los iconos** del menú para saber su función | Baja | ✅ Hecho |
| US-19 | Como usuario, quiero ver **qué sección está activa** en el menú según la página actual | Baja | ✅ Hecho |

### Farmacias

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-20 | Como cliente, quiero **ver el listado de farmacias** disponibles | Media | 🔄 Parcial |

### Experiencia de Usuario (UX)

| ID | Historia | Prioridad | Estado |
|----|----------|-----------|--------|
| US-21 | Como usuario, quiero que **el spinner de carga solo afecte el área de resultados** al buscar/filtrar medicamentos | Media | ✅ Hecho |
| US-22 | Como usuario, quiero **notificaciones (toast)** al agregar al carrito o al completar acciones | Baja | ✅ Hecho |

---

## Priorización

- **Alta**: Funcionalidad core del producto
- **Media**: Importante pero no bloqueante
- **Baja**: Mejora de experiencia

## Leyenda de Estado

- ✅ Hecho
- 🔄 Pendiente / En progreso / Parcial
