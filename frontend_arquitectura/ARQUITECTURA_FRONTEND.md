# 🏗️ ARQUITECTURA DEL FRONTEND - LICOCASTILLO

**Proyecto:** Sistema de Inventarios LicoCastillo
**Tecnologías:** Vite + React + TypeScript
**Patrón:** Arquitectura en Capas con Separación de Responsabilidades
**Fecha:** 2025-11-06

---

## 📋 RESUMEN EJECUTIVO

Frontend profesional desarrollado con **buenas prácticas**, **código limpio** y **arquitectura escalable**. El sistema está completamente integrado con el backend FastAPI y cumple con todos los requisitos funcionales.

### ✅ Características Principales

- ✅ **DTOs tipados** que coinciden exactamente con el backend
- ✅ **Servicios HTTP encapsulados** sin datos quemados
- ✅ **Componentes reutilizables** bien estructurados
- ✅ **Formularios con validación** client-side y server-side
- ✅ **Paleta de colores sobria** para app de licores
- ✅ **Responsive design** para móviles y tablets
- ✅ **Integración completa** con todos los endpoints del backend

---

## 🏗️ ESTRUCTURA DEL PROYECTO

```
src/
├── api/                           # 📡 Capa de Comunicación
│   ├── axios.config.ts            # Configuración de Axios + interceptors
│   ├── endpoints.ts               # Definición centralizada de endpoints
│   └── services/                  # Servicios HTTP (Singleton)
│       ├── productosService.ts    # RF1, RF2, RF3
│       └── inventarioService.ts   # RF4, RF5, RF8
│
├── types/                         # 📝 Tipos TypeScript
│   ├── dtos/                      # DTOs que coinciden con backend
│   │   ├── producto.dto.ts        # ProductoCreateDTO, ProductoUpdateDTO, etc.
│   │   └── inventario.dto.ts      # EntradaProductoDTO, SalidaProductoDTO, etc.
│   └── responses.ts               # ApiResponse, ApiError, etc.
│
├── components/                    # 🧩 Componentes React
│   ├── common/                    # Componentes reutilizables
│   │   ├── Button.tsx             # Botón con variantes
│   │   ├── Card.tsx               # Tarjeta contenedora
│   │   ├── Input.tsx              # Input con validación
│   │   ├── Select.tsx             # Dropdown
│   │   └── Modal.tsx              # Modal reutilizable
│   │
│   ├── layout/                    # Estructura de la app
│   │   ├── Layout.tsx             # Layout principal
│   │   ├── Header.tsx             # Barra superior
│   │   └── Sidebar.tsx            # Menú lateral
│   │
│   └── productos/                 # Módulo de productos
│       └── ProductoForm.tsx       # Formulario crear/editar
│
├── pages/                         # 📄 Páginas de la aplicación
│   ├── Dashboard.tsx              # Dashboard con estadísticas
│   ├── Productos.tsx              # Gestión de productos (RF1, RF2, RF3)
│   ├── Inventario.tsx             # Entradas y salidas (RF4, RF5)
│   └── Movimientos.tsx            # Historial de movimientos (RF8)
│
├── styles/                        # 🎨 Estilos globales
│   ├── theme.ts                   # Paleta de colores y tema
│   └── globals.css                # Estilos base y variables CSS
│
├── App.tsx                        # Configuración de rutas
└── main.tsx                       # Punto de entrada
```

---

## 🎨 PALETA DE COLORES

### Colores Primarios (Licores Añejados)
```css
--color-primary-main: #8B4513    /* Marrón whisky/cognac */
--color-primary-light: #A0522D   /* Marrón claro */
--color-primary-dark: #654321    /* Marrón oscuro */
```

### Colores Secundarios (Amber/Dorado)
```css
--color-secondary-main: #D4A574   /* Dorado licor */
--color-secondary-light: #E8C89E  /* Dorado claro */
--color-secondary-dark: #B8865A   /* Dorado oscuro */
```

### Acentos Metálicos
```css
--color-accent-gold: #D4AF37     /* Dorado metálico */
--color-accent-copper: #B87333   /* Cobre */
--color-accent-bronze: #CD7F32   /* Bronce */
```

---

## 📡 SERVICIOS HTTP

### productosService.ts

```typescript
// RF1: Registrar producto
registrar(datos: ProductoCreateDTO): Promise<ProductoResponseDTO>

// RF2: Actualizar producto
actualizar(id: number, datos: ProductoUpdateDTO): Promise<ProductoResponseDTO>

// RF3: Consultar inventario
obtenerTodos(soloActivos?: boolean): Promise<ProductoResponseDTO[]>

// Otros métodos
obtenerPorId(id: number): Promise<ProductoResponseDTO>
buscarPorSKU(sku: string): Promise<ProductoResponseDTO>
eliminar(id: number): Promise<void>
activar(id: number): Promise<ProductoResponseDTO>
desactivar(id: number): Promise<ProductoResponseDTO>
```

### inventarioService.ts

```typescript
// RF4: Registrar entrada
registrarEntrada(datos: EntradaProductoDTO): Promise<SuccessResponse>

// RF5: Registrar salida
registrarSalida(datos: SalidaProductoDTO): Promise<SuccessResponse>

// RF8: Historial de movimientos
obtenerMovimientos(productoId?: number): Promise<MovimientoInventarioDTO[]>
obtenerMovimientosRecientes(limite?: number): Promise<MovimientoInventarioDTO[]>
```

---

## 🧩 COMPONENTES REUTILIZABLES

### Button Component
```typescript
<Button
  variant="primary | secondary | success | danger | outline"
  size="sm | md | lg"
  fullWidth={boolean}
  loading={boolean}
>
  Texto del botón
</Button>
```

### Input Component
```typescript
<Input
  label="Etiqueta"
  name="campo"
  value={value}
  onChange={handleChange}
  error={errorMessage}
  helperText="Texto de ayuda"
  fullWidth={boolean}
/>
```

### Select Component
```typescript
<Select
  label="Etiqueta"
  name="campo"
  value={value}
  onChange={handleChange}
  options={[
    { value: "1", label: "Opción 1" },
    { value: "2", label: "Opción 2" }
  ]}
  error={errorMessage}
  fullWidth={boolean}
/>
```

### Modal Component
```typescript
<Modal
  isOpen={showModal}
  onClose={handleClose}
  title="Título del Modal"
  size="sm | md | lg | xl"
>
  <ContenidoDelModal />
</Modal>
```

### Card Component
```typescript
<Card
  title="Título"
  subtitle="Subtítulo"
  headerActions={<Button>Acción</Button>}
  padding="none | sm | md | lg"
  hover={boolean}
>
  <ContenidoDeLaTarjeta />
</Card>
```

---

## 📄 PÁGINAS IMPLEMENTADAS

### 1. Dashboard (`/`)
**Funcionalidad:**
- Estadísticas generales del inventario
- Total de productos, productos activos, stock total
- Valor total del inventario
- Tabla de productos recientes

**Endpoints usados:**
- `GET /api/v1/productos`

---

### 2. Productos (`/productos`)
**Funcionalidad:**
- Listado completo de productos (RF3)
- Registro de nuevos productos (RF1)
- Edición de productos existentes (RF2)
- Eliminación de productos
- Filtro por productos activos

**Endpoints usados:**
- `GET /api/v1/productos`
- `POST /api/v1/productos`
- `PUT /api/v1/productos/{id}`
- `DELETE /api/v1/productos/{id}`

**Características:**
- ✅ Modal para crear productos
- ✅ Modal para editar productos
- ✅ Confirmación antes de eliminar
- ✅ Validación de formularios
- ✅ Indicadores de stock bajo
- ✅ Formateo de precios y fechas

---

### 3. Inventario (`/inventario`)
**Funcionalidad:**
- Registro de entradas de productos (RF4)
- Registro de salidas de productos (RF5)
- Tabs para cambiar entre entrada/salida
- Validación de stock disponible
- Información del producto seleccionado

**Endpoints usados:**
- `GET /api/v1/productos` (para listar productos)
- `POST /api/v1/inventario/entrada`
- `POST /api/v1/inventario/salida`

**Características:**
- ✅ Formulario de entrada con proveedor y lote
- ✅ Formulario de salida con motivo
- ✅ Validación de stock disponible antes de salida
- ✅ Información en tiempo real del producto
- ✅ Mensajes de éxito/error

---

### 4. Movimientos (`/movimientos`)
**Funcionalidad:**
- Historial completo de movimientos (RF8)
- Estadísticas de entradas y salidas totales
- Tabla ordenada por fecha descendente
- Identificación visual de tipo de movimiento

**Endpoints usados:**
- `GET /api/v1/inventario/movimientos`

**Características:**
- ✅ Estadísticas de entradas/salidas
- ✅ Badges visuales para tipo de movimiento
- ✅ Formato de fecha completo
- ✅ Información de lote, bodega, proveedor

---

## 🔐 BUENAS PRÁCTICAS IMPLEMENTADAS

### ✅ Arquitectura Limpia

1. **Separación de Responsabilidades**
   - API layer: Solo comunicación HTTP
   - Components: Solo presentación
   - Pages: Orquestación de componentes

2. **DTOs Tipados**
   - Todos los tipos coinciden con el backend
   - No hay `any` en el código
   - Interfaces claras y documentadas

3. **Sin Datos Quemados**
   - Todo viene del backend vía API
   - Variables de entorno para configuración
   - Endpoints centralizados

### ✅ TypeScript

```typescript
// Tipado fuerte en todo el proyecto
interface ProductoCreateDTO {
  sku: string;
  nombre: string;
  tipo_licor: string;
  // ...
}

// Servicios con tipos explícitos
async obtenerTodos(soloActivos: boolean = false): Promise<ProductoResponseDTO[]>

// Props de componentes tipadas
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // ...
}
```

### ✅ Manejo de Errores

```typescript
try {
  const data = await productosService.obtenerTodos();
  setProductos(data);
} catch (err) {
  const apiError = err as ApiError;
  setError(apiError.detail || 'Error al cargar datos');
  console.error('Error:', err);
}
```

### ✅ Validación de Formularios

- Validación client-side antes de enviar
- Mensajes de error específicos por campo
- Validación de reglas de negocio (precio venta > precio compra, stock disponible, etc.)

---

## 🚀 CÓMO EJECUTAR

### Desarrollo

```bash
# Asegurarse que el backend esté corriendo en http://localhost:8000
cd frontend_arquitectura
npm install
npm run dev
```

### Producción

```bash
npm run build
npm run preview
```

---

## 📊 ENDPOINTS INTEGRADOS

| Endpoint | Método | Descripción | Página |
|----------|--------|-------------|---------|
| `/api/v1/productos` | GET | Listar productos | Dashboard, Productos, Inventario |
| `/api/v1/productos` | POST | Crear producto | Productos |
| `/api/v1/productos/{id}` | PUT | Actualizar producto | Productos |
| `/api/v1/productos/{id}` | DELETE | Eliminar producto | Productos |
| `/api/v1/inventario/entrada` | POST | Registrar entrada | Inventario |
| `/api/v1/inventario/salida` | POST | Registrar salida | Inventario |
| `/api/v1/inventario/movimientos` | GET | Historial | Movimientos |

---

## ✅ CHECKLIST DE COMPLETITUD

### Componentes Base
- [x] Layout completo (Header + Sidebar)
- [x] Button con variantes
- [x] Input con validación
- [x] Select/Dropdown
- [x] Modal reutilizable
- [x] Card contenedora

### Páginas
- [x] Dashboard con estadísticas
- [x] Productos (CRUD completo)
- [x] Inventario (Entradas y Salidas)
- [x] Movimientos (Historial)

### Funcionalidades
- [x] RF1: Registrar producto
- [x] RF2: Actualizar producto
- [x] RF3: Consultar inventario
- [x] RF4: Registrar entrada
- [x] RF5: Registrar salida
- [x] RF8: Historial de movimientos

### Integraciones
- [x] Axios configurado con interceptors
- [x] DTOs tipados
- [x] Servicios HTTP encapsulados
- [x] Manejo de errores global
- [x] Variables de entorno

---

## 🎯 PRÓXIMAS MEJORAS SUGERIDAS

1. **Notificaciones Toast**: Sistema de notificaciones elegante
2. **Paginación**: Para tablas con muchos registros
3. **Búsqueda**: Filtros avanzados en tablas
4. **Exportar**: Excel/PDF de reportes
5. **Gráficos**: Charts con estadísticas visuales
6. **Dark Mode**: Tema oscuro
7. **Autenticación**: Login y roles de usuario

---

**Versión:** 1.0.0
**Estado:** ✅ Completo y funcional
**Última actualización:** 2025-11-06
