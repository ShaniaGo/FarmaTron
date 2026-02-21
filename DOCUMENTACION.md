# FarmaTron - Documentación del Proyecto

Plataforma de delivery de medicamentos a domicilio. Consta de un backend Laravel (API REST) y un frontend React.

---

## Documentación de Metodología

- **[Metodología (Scrum + XP)](./docs/METODOLOGIA.md)** - Roles, artefactos, prácticas aplicadas
- **[Product Backlog](./docs/PRODUCT_BACKLOG.md)** - Historias de usuario y requisitos
- **[Planificación de Sprints](./docs/SPRINTS.md)** - Sprints, tareas y entregables

---

## Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Backend (Laravel)](#backend-laravel)
3. [Frontend (React)](#frontend-react)
4. [Geolocalización (Farmacias)](#geolocalización-farmacias)
5. [Configuración y Ejecución](#configuración-y-ejecución)
6. [Flujos Principales](#flujos-principales)

---

## Estructura del Proyecto

```
FarmaTron/
├── 01-backend-laravel/     # API REST (Laravel 12)
├── 03-frontend-react/      # SPA (React 19 + Vite)
├── docs/                   # Documentación metodológica
│   ├── METODOLOGIA.md
│   ├── PRODUCT_BACKLOG.md
│   └── SPRINTS.md
└── DOCUMENTACION.md
```

---

## Backend (Laravel)

### Tecnologías

- **Laravel 12** - Framework PHP
- **Laravel Sanctum** - Autenticación por tokens
- **MariaDB/MySQL** - Base de datos

### Estructura Principal

| Carpeta/Archivo | Descripción |
|-----------------|-------------|
| `app/Models/` | Modelos Eloquent (Usuario, Medicamento, Farmacia, CarritoCompra, etc.) |
| `app/Http/Controllers/Api/` | Controladores de la API |
| `routes/api.php` | Definición de rutas API |
| `database/migrations/` | Migraciones de base de datos |
| `database/seeders/` | Datos iniciales y de prueba |

### Modelos y Relaciones Clave

```
Usuario (usuarios)
├── carrito() → CarritoCompra[]
├── pedidos() → Pedido[]
└── calificaciones() → Calificacion[]

Medicamento (medicamentos)
├── categoria() → CategoriaMedicamento
├── stock() → StockFarmacia[]
└── pedidoDetalles() → PedidoDetalle[]

Farmacia (farmacias)
├── stock() → StockFarmacia[]
├── pedidos() → Pedido[]
└── calificaciones() → Calificacion[]

CarritoCompra (carrito_compras)
├── cliente() → Usuario
├── farmacia() → Farmacia
└── stockFarmacia() → StockFarmacia

StockFarmacia (stock_farmacia)
├── medicamento() → Medicamento
├── farmacia() → Farmacia
└── carritos() → CarritoCompra[]
```

### API - Endpoints

#### Rutas Públicas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/test` | Verificar que la API está activa |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registro de usuario |
| GET | `/api/productos` | Listar medicamentos (con filtros) |
| GET | `/api/productos/categorias` | Listar categorías |
| GET | `/api/productos/destacados` | Productos destacados |
| GET | `/api/productos/{id}` | Detalle de medicamento |
| GET | `/api/productos/{id}/farmacias` | Farmacias con stock del medicamento |

**Parámetros de productos:**
- `search` - Búsqueda por nombre
- `categoria_id` - Filtrar por categoría
- `farmacia_id` - Filtrar por farmacia
- `per_page` - Items por página (default: 15)

#### Rutas Protegidas (requieren `Authorization: Bearer {token}`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/user` | Usuario actual |
| GET | `/api/auth/verify` | Verificar token |
| GET | `/api/carrito` | Ver carrito |
| POST | `/api/carrito/agregar` | Agregar al carrito |
| PUT | `/api/carrito/{id}` | Actualizar cantidad |
| DELETE | `/api/carrito/{id}` | Eliminar del carrito |
| DELETE | `/api/carrito` | Vaciar carrito |
| GET | `/api/pedidos` | Listar pedidos |
| POST | `/api/pedidos` | Crear pedido |
| GET | `/api/pedidos/{id}` | Detalle de pedido |
| POST | `/api/pedidos/{id}/estado` | Actualizar estado |
| DELETE | `/api/pedidos/{id}/cancelar` | Cancelar pedido |
| GET | `/api/pedidos/{id}/seguimiento` | Seguimiento del pedido |

#### Payloads Importantes

**POST /api/carrito/agregar**
```json
{
  "stock_farmacia_id": 1,
  "cantidad": 2
}
```

**POST /api/pedidos**
```json
{
  "farmacia_id": 1,
  "direccion_entrega": "Av. Principal 123",
  "telefono_contacto": "04141234567",
  "instrucciones_entrega": "Dejar en portería",
  "metodo_pago": "efectivo",
  "carrito": [
    { "stock_farmacia_id": 1, "cantidad": 2 },
    { "stock_farmacia_id": 2, "cantidad": 1 }
  ]
}
```

### Seeders

```bash
# Datos completos (usuarios, farmacias, categorías, medicamentos, stock)
php artisan db:seed --class=InitialDataSeeder

# Solo medicamentos y stock (requiere farmacias existentes)
php artisan db:seed --class=MedicamentosSeeder
```

**Usuarios de prueba (InitialDataSeeder):**
- Admin: shania@gmail.com / q1w2e3.1
- Cliente: jeff@gmail.com / q1w2e3.1

---

## Frontend (React)

### Tecnologías

- **React 19** - Biblioteca UI
- **Vite 7** - Build tool
- **React Router 7** - Navegación
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **React Hook Form + Yup** - Formularios y validación
- **Lucide React** - Iconos
- **Tippy.js** - Tooltips
- **React Hot Toast** - Notificaciones
- **TanStack Query** - Cache de datos (configurado)
- **Leaflet + react-leaflet** - Mapas interactivos y geolocalización (vista Farmacias)

### Estructura de Carpetas

```
src/
├── api/              # Cliente axios configurado
├── components/       # Componentes reutilizables
│   └── layout/       # Navbar, Footer, Layout
├── context/          # AuthContext (estado de autenticación)
├── pages/            # Vistas/ páginas
│   └── auth/         # Login, Register
├── utils/            # constants.js, etc.
├── App.jsx
├── main.jsx
└── index.css
```

### Rutas (App.jsx)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Página de inicio |
| `/login` | Login | Inicio de sesión |
| `/register` | Register | Registro |
| `/medicamentos` | Medicamentos | Catálogo con búsqueda y filtros |
| `/farmacias` | Farmacias | Listado de farmacias y mapa con geolocalización |
| `/carrito` | Carrito | Carrito de compras |
| `/pedidos` | Pedidos | Historial de pedidos |
| `/perfil` | Perfil | Perfil de usuario |

### Páginas Principales

| Página | Funcionalidad |
|--------|---------------|
| **Medicamentos** | Lista de API, búsqueda, filtro por categoría, agregar al carrito |
| **Farmacias** | Listado de farmacias, mapa con marcadores (Leaflet) y botón "Ruta" a Google Maps |
| **Carrito** | Ver items, actualizar cantidad, eliminar, resumen con total |
| **Login/Register** | Auth con token en localStorage |
| **Perfil** | Datos del usuario (según implementación) |

### API y Autenticación

**Cliente API** (`src/api/index.js`):
- Base URL desde `constants.js` o `VITE_API_URL`
- Interceptor añade `Authorization: Bearer {token}` si existe en localStorage

**AuthContext** (`src/context/AuthContext.jsx`):
- `user` - Usuario actual o null
- `login(formData)` - Iniciar sesión
- `register(userData)` - Registrarse
- `logout()` - Cerrar sesión
- Token y user se guardan en `localStorage`

### Variables de Entorno

Crear `.env` en el frontend:
```
VITE_API_URL=http://localhost:8000/api
```

Para acceso desde otra máquina, usar la IP del servidor (ej: `http://192.168.0.186:8000/api`).

---

## Geolocalización (Farmacias)

La vista **Farmacias** (`/farmacias`) incluye un mapa interactivo para ubicar las farmacias asociadas.

### Tecnología

- **Leaflet** + **react-leaflet**: mapa base con tiles de OpenStreetMap (sin API key).
- Cada farmacia con coordenadas (`lat`, `lng`) se muestra como **marcador** en el mapa.
- Al hacer clic en un marcador se abre un **popup** con nombre, dirección y teléfono.

### Ubicación destacada: Farmacia FRS 23

- **Dirección:** Caracas 1034, Distrito Capital, Farmacia FRS 23  
- **Coordenadas:** 10.4806, -66.9036 (centro de Caracas, Distrito Capital)  
- Aparece como primera farmacia en el listado y con marcador propio en el mapa.

### Funcionalidad "Ruta"

- En cada tarjeta de farmacia, el botón **Ruta** abre **Google Maps** en una nueva pestaña.
- Enlace: `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}` para obtener direcciones hasta esa ubicación.

### Implementación (resumen)

| Elemento | Descripción |
|---------|-------------|
| **MapContainer** | Centrado en Caracas (zoom 14), altura 400px |
| **TileLayer** | OpenStreetMap |
| **Marker** | Icono por defecto de Leaflet; una por farmacia con coordenadas |
| **Popup** | Nombre, dirección completa y teléfono |

Las farmacias sin `lat`/`lng` no se muestran en el mapa pero siguen visibles en el listado de tarjetas.

---

## Configuración y Ejecución

### Backend

```bash
cd 01-backend-laravel
composer install
cp .env.example .env
php artisan key:generate
# Configurar DB en .env (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
php artisan migrate
php artisan db:seed --class=InitialDataSeeder
php artisan db:seed --class=MedicamentosSeeder   # Si ya hay usuarios/farmacias
php artisan serve
```

Backend disponible en `http://localhost:8000`

### Frontend

```bash
cd 03-frontend-react
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173` (o el puerto que asigne Vite)

### CORS

Si frontend y backend están en puertos/dominios distintos, configurar CORS en Laravel (`config/cors.php`).

---

## Flujos Principales

### 1. Agregar medicamento al carrito

1. Usuario en `/medicamentos`
2. Debe estar autenticado (si no, redirige a login)
3. Click en "Agregar al Carrito" → POST `/api/carrito/agregar` con `stock_farmacia_id` y `cantidad`
4. El primer stock disponible del medicamento se usa por defecto

### 2. Ver y gestionar carrito

1. Usuario en `/carrito`
2. GET `/api/carrito` obtiene items agrupados por farmacia
3. PUT `/api/carrito/{id}` actualiza cantidad
4. DELETE `/api/carrito/{id}` elimina item

### 3. Crear pedido

1. Carrito con items
2. POST `/api/pedidos` con `farmacia_id`, `direccion_entrega`, `telefono_contacto`, `metodo_pago`, `carrito[]`
3. Backend crea pedido, detalle, actualiza stock, limpia items del carrito de esa farmacia

---

## Notas Adicionales

- **Usuarios**: El modelo principal es `Usuario` (tabla `usuarios`), no el `User` por defecto de Laravel.
- **Productos = Medicamentos**: La API usa el prefijo `/productos` pero trabaja con el modelo `Medicamento`.
- **Carrito por farmacia**: Cada farmacia tiene su costo de envío; el total se calcula por grupo de farmacia.
- **Stock**: Los medicamentos se muestran solo si tienen stock disponible en alguna farmacia.
