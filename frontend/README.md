# 🚀 FoodPlease Frontend - React con Patrones SOLID

Frontend moderno desarrollado con **React 18**, **TypeScript** y **Vite**, siguiendo principios **SOLID** para arquitectura escalable y mantenible.

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/              # Componentes UI reutilizables
│   │   │   └── index.tsx        # Button, Input, Card, Alert, etc
│   │   ├── restaurants/         # Feature: Gestión de Restaurantes
│   │   │   └── index.tsx        # RestauranteList, RestauranteForm
│   │   └── dishes/              # Feature: Gestión de Platos
│   │       └── index.tsx        # PlatoList, PlatoForm
│   ├── services/
│   │   └── api.ts               # API Client + Services (DIP)
│   ├── hooks/
│   │   └── index.ts             # Custom Hooks (SRP)
│   ├── context/                 # Context API (estado global)
│   ├── types/
│   │   └── index.ts             # Interfaces TypeScript (ISP)
│   ├── utils/
│   │   └── helpers.ts           # Validadores, Formateadores
│   ├── App.tsx                  # Componente principal
│   ├── main.tsx                 # Entrada de la app
│   └── index.css                 # Estilos globales
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Principios SOLID Implementados

### 1️⃣ **Single Responsibility Principle (SRP)**

Cada componente/módulo tiene **una única responsabilidad:**

```typescript
// ✅ BUENO: Componente con una responsabilidad
export const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  // Solo renderiza un botón
};

// ✅ BUENO: Servicio con una responsabilidad
export class RestauranteService implements IRestauranteService {
  // Solo maneja operaciones de Restaurante
}

// ✅ BUENO: Hook con una responsabilidad
export function useForm<T>(...) {
  // Solo maneja estado del formulario
}
```

**Archivos dedicados per responsabilidad:**
- `components/common/` → Componentes UI puros
- `services/api.ts` → API communication
- `hooks/index.ts` → Lógica reutilizable
- `types/index.ts` → Type definitions
- `utils/helpers.ts` → Validación y formateo

---

### 2️⃣ **Open/Closed Principle (OCP)**

Los módulos están **abiertos para extensión, cerrados para modificación:**

```typescript
// ✅ Extendible: Nuevos servicios sin modificar código existente
export interface IRestauranteService { ... }
export class RestauranteService implements IRestauranteService { ... }

// Agregar nuevo servicio:
export class RestauranteAdvancedService implements IRestauranteService { 
  // Nueva implementación sin tocar la original
}

// ✅ Componentes extendibles vía props
export const Button: React.FC<ButtonProps> = ({ variant, size, ... }) => {
  // Nuevas variantes agregables sin modificar
}
```

---

### 3️⃣ **Liskov Substitution Principle (LSP)**

Las subclases pueden **reemplazar la clase base sin romper functionality:**

```typescript
// ✅ Todas las implementaciones de IRestauranteService son intercambiables
const service1: IRestauranteService = new RestauranteService();
const service2: IRestauranteService = new RestauranteAdvancedService();

// Ambas funcionan identicamente en la aplicación
```

---

### 4️⃣ **Interface Segregation Principle (ISP)**

Las interfaces son **pequeñas y específicas:**

```typescript
// ✅ BUENO: Interfaces pequeñas
export interface CreateRestauranteDTO { ... }      // Solo crear
export interface UpdateRestauranteDTO { ... }      // Solo actualizar
export interface IRestauranteService { ... }       // Solo métodos necesarios

// ❌ MALO: Interface grande (monolítica)
export interface ICompleteService {
  // 50 métodos diferentes...
}
```

---

### 5️⃣ **Dependency Inversion Principle (DIP)**

Los módulos dependen de **abstracciones (interfaces), no de concreciones:**

```typescript
// ✅ BUENO: Depende de interfaz (abstracción)
export class RestauranteForm {
  constructor(private service: IRestauranteService) { }
  // Puede recibir cualquier implementación
}

// ✅ BUENO: Factory pattern para inyección
export function getRestauranteService(): IRestauranteService {
  return new RestauranteService();
}

// ✅ BUENO: Custom Hook inyectable
export function useAsync<T>(
  asyncFunction: () => Promise<T>,  // Función inyectada
  ...
) { ... }
```

---

## 🔄 Comunicación Frontend-Backend

### Arquitectura de Capas

```
┌─────────────────────────────────────┐
│      React Components               │
│  (Button, Input, RestauranteList)   │
├─────────────────────────────────────┤
│      Custom Hooks                   │
│   (useAsync, useForm, useList)      │
├─────────────────────────────────────┤
│      API Services                   │
│  (RestauranteService, PlatoService) │
├─────────────────────────────────────┤
│      HTTP Client                    │
│    (Fetch API)                      │
└─────────────────────────────────────┘
         ↓ (REST API)
┌─────────────────────────────────────┐
│       Django Backend                │
│  (ViewSets, Serializers, Models)    │
└─────────────────────────────────────┘
```

### Endpoints API

```
GET    /api/v1/restaurantes/              # Listar todos
POST   /api/v1/restaurantes/              # Crear
GET    /api/v1/restaurantes/:id/          # Obtener uno
PUT    /api/v1/restaurantes/:id/          # Actualizar
DELETE /api/v1/restaurantes/:id/          # Eliminar
GET    /api/v1/restaurantes/activos/      # Solo activos
GET    /api/v1/restaurantes/:id/platos/   # Platos del restaurante

GET    /api/v1/platos/                    # Listar todos
POST   /api/v1/platos/                    # Crear
GET    /api/v1/platos/:id/                # Obtener uno
PUT    /api/v1/platos/:id/                # Actualizar
DELETE /api/v1/platos/:id/                # Eliminar
GET    /api/v1/platos/disponibles/        # Solo disponibles
```

---

## 📦 Inicio Rápido

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Variables de entorno

```bash
# .env (opcional, por defecto apunta a http://localhost:8000/api/v1)
VITE_API_URL=http://localhost:8000/api/v1
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
# Acceder a http://localhost:5173
```

### 4. Build para producción

```bash
npm run build
npm run preview
```

---

## 🎨 Componentes Disponibles

### Componentes Comunes (`components/common/`)

```typescript
// Button con variantes
<Button variant="primary" size="lg">Crear</Button>
<Button variant="danger" size="sm">Eliminar</Button>

// Input con validación
<Input label="Email" type="email" error={errors.email} />

// Alertas
<Alert type="success" message="Saved!" />
<Alert type="error" message="Error!" onClose={() => {}} />

// Card contenedor
<Card title="Información">
  {children}
</Card>

// Estados de carga
<Spinner />
<EmptyState message="No data" action={<Button>Create</Button>} />
```

### Componentes de Features

```typescript
// Restaurantes
<RestauranteList onEdit={...} onDelete={...} />
<RestauranteForm initialData={...} onSuccess={...} />

// Platos
<PlatoList restauranteId="REST001" onEdit={...} />
<PlatoForm restauranteId="REST001" onSuccess={...} />
```

---

## 🪝 Custom Hooks

```typescript
// Manejo de datos asíncrónos
const { status, data, error, refetch } = useAsync(fetchFunction);

// Validación de formularios
const { values, handleChange, handleSubmit, errors } = useForm(initialValues, onSubmit);

// Filtrado y búsqueda en listas
const { items, search, setSearch } = useList(dataArray);
```

---

## 📊 Ejemplo de Flujo Completo

```
Usuario clickea "Crear Restaurante"
    ↓
RestauranteForm renderiza
    ↓
Usuario completa formulario + envía
    ↓
useForm captura valores
    ↓
onSubmit llama a RestauranteService.create()
    ↓
RestauranteService usa ApiClient.post()
    ↓
Fetch a POST /api/v1/restaurantes/
    ↓
Django recibe (ViewSet) → Serializer → Model.save()
    ↓
Response 201 Created
    ↓
Front actualiza UI + resetea form
    ↓
✅ Restaurante creado
```

---

## 🛠️ Desarrollo

### Agregar nuevo componente

```typescript
// 1. Crear archivo en components/[feature]/
export const MyComponent: React.FC<MyComponentProps> = ({ prop1 }) => {
  // SRP: Una responsabilidad
  return <div>{prop1}</div>;
};

// 2. Usar en App.tsx
<MyComponent prop1="value" />
```

### Agregar nuevo servicio

```typescript
// 1. Definir interfaz (ISP)
export interface IMyService {
  method1(): Promise<T>;
}

// 2. Implementar (SRP)
export class MyService implements IMyService {
  // Una responsabilidad
}

// 3. Exportar factory (DIP)
export function getMyService(): IMyService {
  return new MyService();
}
```

### Agregar nuevo hook

```typescript
// Custom hook (SRP)
export function useMyLogic<T>(dependency: T) {
  const [state, setState] = useState<T>(dependency);
  
  useEffect(() => {
    // Lógica reutilizable
  }, [dependency]);
  
  return { state };
}
```

---

## ✅ Testing (Próximo)

```bash
npm install --save-dev vitest @testing-library/react
```

Ejemplo de test con SOLID:

```typescript
// Mock del servicio (DIP)
const mockService: IRestauranteService = {
  getAll: vi.fn().mockResolvedValue([...]),
  create: vi.fn(),
};

// Test del componente
it('renders list', async () => {
  render(<RestauranteList service={mockService} />);
  // Assertions...
});
```

---

## 🚀 Despliegue

### Build optimizado

```bash
npm run build
# Genera ./dist/ para producción
```

### En Django (servir como static files)

```bash
# Build React
npm run build

# Copiar dist/ a Django static
cp -r dist/* ../Aplicaciones/Restaurantes/static/
```

### Deploy Vercel/Netlify

```bash
# Configurar deploy automático desde GitHub
# Branch: main
# Build command: npm run build
# Publish directory: dist
```

---

## 📚 Recursos

- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Django REST Framework](https://www.django-rest-framework.org)

---

## 📝 Licencia

MIT © FoodPlease 2024

---

**Versión:** 1.0.0  
**Estado:** Production Ready  
**Última actualización:** Abril 15, 2026
