# 🍷 LicoCastillo - Sistema de Inventarios (Frontend)

Frontend profesional para el sistema de gestión de inventarios de LicoCastillo, desarrollado con **Vite + React + TypeScript**.

---

## 🏗️ Arquitectura del Frontend

El proyecto sigue una **arquitectura limpia y escalable** con separación clara de responsabilidades:

```
src/
├── api/                    # Servicios HTTP y configuración
│   ├── axios.config.ts     # Configuración de Axios con interceptors
│   ├── endpoints.ts        # Definición centralizada de endpoints
│   └── services/           # Servicios por módulo
│       ├── productosService.ts
│       └── inventarioService.ts
│
├── types/                  # DTOs y tipos TypeScript
│   ├── dtos/              # DTOs que coinciden con el backend
│   │   ├── producto.dto.ts
│   │   └── inventario.dto.ts
│   └── responses.ts       # Tipos de respuestas de API
│
├── components/            # Componentes reutilizables
│   ├── common/           # Componentes base (Button, Input, Card)
│   └── layout/           # Layout, Header, Sidebar
│
├── pages/                # Páginas/Vistas
│   ├── Dashboard.tsx     # Dashboard principal
│   └── Productos.tsx     # Gestión de productos
│
├── styles/               # Estilos globales y tema
│   ├── theme.ts         # Paleta de colores
│   └── globals.css      # Estilos globales
│
├── App.tsx              # Configuración de rutas
└── main.tsx             # Punto de entrada
```

---

## 🎨 Paleta de Colores

Diseño **sobrio y elegante** para una aplicación de licores:

- **Primarios**: Marrones y dorados (whisky/cognac)
- **Secundarios**: Amber/dorado claro
- **Acentos**: Dorado metálico, cobre, bronce
- **Neutros**: Escalas de gris y crema
- **Estados**: Verde oscuro, rojo vino, amarillo oscuro

---

## ⚙️ Configuración

### Requisitos Previos

- Node.js 18+
- npm o pnpm
- Backend corriendo en `http://localhost:8000`

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env y configurar VITE_API_URL si es necesario
```

### Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🔗 Integración con Backend

### DTOs Tipados

Todos los DTOs están **fuertemente tipados** y coinciden exactamente con el backend:

```typescript
// ProductoCreateDTO coincide con backend/app/application/dto/producto_dto.py
export interface ProductoCreateDTO {
  sku: string;
  nombre: string;
  tipo_licor: string;
  // ...
}
```

### Servicios HTTP

Los servicios encapsulan toda la lógica de comunicación con el backend:

```typescript
// Ejemplo de uso
import productosService from '@/api/services/productosService';

const productos = await productosService.obtenerTodos();
const nuevoProducto = await productosService.registrar(datos);
```

### Endpoints Centralizados

Todos los endpoints están definidos en `api/endpoints.ts`:

```typescript
export const PRODUCTOS_ENDPOINTS = {
  LISTAR: '/api/v1/productos',
  REGISTRAR: '/api/v1/productos',
  // ...
};
```

---

## 📦 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.1 | Librería UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7.1 | Build tool |
| Axios | Latest | Cliente HTTP |
| React Router | 7.1 | Routing |

---

## 🧩 Componentes Principales

### Layout Components

- **Layout**: Estructura principal de la aplicación
- **Header**: Barra superior con logo y navegación
- **Sidebar**: Menú lateral con rutas

### Common Components

- **Button**: Botón reutilizable con variantes (primary, secondary, success, danger, outline)
- **Card**: Tarjeta contenedora con título y acciones
- **Input**: Campo de entrada con validación y mensajes de error

### Pages

- **Dashboard**: Resumen con estadísticas del inventario
- **Productos**: Listado completo de productos con filtros

---

## 🚀 Características Implementadas

### ✅ Completadas

- [x] Arquitectura hexagonal frontend
- [x] DTOs tipados coincidentes con backend
- [x] Servicios HTTP con Axios
- [x] Paleta de colores sobria para licores
- [x] Layout responsivo (Header + Sidebar)
- [x] Componentes comunes reutilizables
- [x] Dashboard con estadísticas
- [x] Listado de productos con filtros
- [x] Integración completa con backend FastAPI

### 🔄 En Desarrollo

- [ ] Formulario de registro de productos
- [ ] Formulario de edición de productos
- [ ] Módulo de inventario (entradas/salidas)
- [ ] Historial de movimientos
- [ ] Búsqueda avanzada
- [ ] Exportación a Excel/PDF

---

## 🔧 Configuración de Entorno

### Variables de Entorno (.env)

```env
# URL del backend
VITE_API_URL=http://localhost:8000

# Nombre de la aplicación
VITE_APP_NAME=LicoCastillo

# Versión
VITE_APP_VERSION=1.0.0
```

---

## 🎯 Buenas Prácticas Implementadas

### ✅ Código Limpio

- Sin datos quemados en el frontend
- DTOs independientes y reutilizables
- Componentes pequeños y específicos
- Separación de lógica y presentación

### ✅ TypeScript

- Tipado fuerte en todos los componentes
- Interfaces claras y documentadas
- No uso de `any`

### ✅ Arquitectura

- Separación clara de responsabilidades
- Servicios singleton para HTTP
- Configuración centralizada
- Fácil de testear y mantener

---

## 📝 Notas de Desarrollo

### Comunicación con Backend

El frontend se comunica con el backend FastAPI a través de:

1. **Axios configurado** con interceptors para manejo de errores
2. **Servicios** que encapsulan las llamadas HTTP
3. **DTOs tipados** que garantizan consistencia de datos
4. **Endpoints centralizados** para fácil mantenimiento

### Manejo de Errores

- Interceptor de Axios captura errores HTTP
- Errores mostrados al usuario de forma amigable
- Logging en consola para debugging

---

## 👥 Equipo de Desarrollo

- **Proyecto**: LicoCastillo
- **Curso**: Arquitectura de Sistemas
- **Tecnologías**: Vite + React + TypeScript

---

## 📄 Licencia

Proyecto académico para el curso de Arquitectura de Sistemas.

---

**Última actualización**: 2025-11-06
**Versión**: 1.0.0
**Estado**: ✅ Funcional - En desarrollo activo
