# Metodología de Desarrollo - FarmaTron

Este documento describe la aplicación de **Scrum** y **Programación Extrema (XP)** en el proyecto FarmaTron.

---

## 1. Scrum

### 1.1 Roles

| Rol | Responsabilidad en el proyecto |
|-----|-------------------------------|
| **Product Owner** | Define prioridades, valida funcionalidades, acepta entregas |
| **Scrum Master** | Facilita reuniones, elimina impedimentos, asegura el proceso |
| **Equipo de Desarrollo** | Diseño, implementación, pruebas y documentación |

### 1.2 Artefactos

- **Product Backlog**: Ver [PRODUCT_BACKLOG.md](./PRODUCT_BACKLOG.md)
- **Sprint Backlog**: Tareas seleccionadas por sprint
- **Incremento**: Funcionalidad entregada al final de cada sprint

### 1.3 Eventos Scrum

| Evento | Frecuencia | Descripción |
|--------|------------|-------------|
| **Sprint Planning** | Inicio de sprint | Selección de items del backlog, definición del objetivo del sprint |
| **Daily Standup** | Diario | 15 min: qué hice, qué haré, impedimentos |
| **Sprint Review** | Fin de sprint | Demostración del incremento, feedback del PO |
| **Retrospectiva** | Fin de sprint | Qué mejorar, qué mantener |

### 1.4 Ciclo de Sprints

Los sprints tienen duración de 2 semanas. Al final de cada sprint se entrega un incremento funcional y probado.

---

## 2. Programación Extrema (XP)

### 2.1 Prácticas XP Aplicadas

| Práctica | Implementación en FarmaTron |
|----------|----------------------------|
| **Diseño Simple** | Código claro, sin sobreingeniería. Modelos y controladores concisos |
| **Releases Cortos** | Entregas al final de cada sprint con funcionalidades completas |
| **Refactoring** | Mejora continua del código (ej: separación de MedicamentosSeeder, mejora de Carrito.jsx) |
| **Tests** | PHPUnit en backend para validar endpoints y lógica crítica |
| **Integración Frecuente** | Backend y frontend integrados vía API REST, cambios integrados al final del día |
| **Propiedad Colectiva del Código** | Código estandarizado, documentado, accesible a todo el equipo |

### 2.2 Criterios de "Done"

Una tarea se considera terminada cuando:

- [ ] El código cumple el requisito
- [ ] Las pruebas pasan (cuando aplica)
- [ ] El código está documentado/comentado
- [ ] La funcionalidad fue revisada y aceptada

---

## 3. Flujo de Trabajo General

```
Product Backlog
      │
      ▼
Sprint Planning → Sprint Backlog
      │
      ▼
Desarrollo (Daily Standups)
      │
      ▼
Sprint Review + Retrospectiva
      │
      ▼
Incremento entregado → Product Backlog actualizado
```

---

## 4. Herramientas y Registro

- **Product Backlog**: `docs/PRODUCT_BACKLOG.md`
- **Planificación de Sprints**: `docs/SPRINTS.md`
- **Documentación Técnica**: `DOCUMENTACION.md`
- **Control de versiones**: Git (commits descriptivos por feature/fix)
