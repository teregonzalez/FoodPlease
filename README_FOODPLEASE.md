# FoodPlease - CRUD Funcional de Gestión de Restaurantes

## 📋 Introducción

Este proyecto es una **guía de implementación funcional** de un **CRUD (Create, Read, Update, Delete)** desarrollado con **Flask** y **SQLite3**, adaptado específicamente para demostrar los conceptos fundamentales de la plataforma **FoodPlease**.

El sistema implementa las operaciones básicas necesarias para gestionar restaurantes y sus menús (platos), sirviendo como prototipo de la capa de administración web que FoodPlease requiere.

---

## 🎯 Objetivos del Proyecto

1. **Demostrar un CRUD funcional** con despliegue local usando Flask
2. **Implementar modelos de datos** relevantes al sector de delivery gastronómico
3. **Crear interfaces web responsivas** con Bootstrap 4
4. **Documentar arquitectura y flujos** aplicables a FoodPlease
5. **Servir como base** para extensiones futuras (autenticación, pagos, notificaciones)

---

## 🏗️ Arquitectura Actual

### 📁 Estructura del Proyecto

```
FoodPlease/
├── app/                               # Backend Flask
│   ├── __init__.py                    # Factory Flask
│   ├── config.py                      # Configuración
│   ├── models/
│   │   └── __init__.py                # Modelos SQLAlchemy
│   ├── routes/
│   │   ├── restaurantes.py            # Endpoints API
│   │   ├── platos.py                  # Endpoints API
│   │   └── __init__.py
│   └── schemas/
│       └── __init__.py                # Validadores
│
├── frontend/                          # Frontend React + Vite
│   ├── src/
│   │   ├── App.tsx                    # Componente principal
│   │   ├── index.css                  # Estilos
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
│
├── run.py                             # Entry point
├── init_db.py                         # Inicialización BD
└── foodplease.db                      # Base de datos SQLite3
```

---

## 📊 Modelos de Datos

### 1. **Modelo Restaurante**

```python
class Restaurante(models.Model):
    id_restaurante    # PK: Identificador único (Ej: REST001)
    nombre            # Nombre comercial
    direccion         # Ubicación física
    telefono          # Número de contacto
    email             # Correo electrónico
    tiempo_promedio_preparacion  # Tiempo en minutos
    activo            # Disponibilidad del restaurante
    fecha_registro    # Timestamp de creación
```

**Relación con FoodPlease:**
- Representa los **locales gastronómicos** participantes en la plataforma
- Almacena información para visualización en la app móvil de clientes
- Gestiona configuración del panel web del restaurante

### 2. **Modelo Plato**

```python
class Plato(models.Model):
    id_plato          # PK: Identificador único del plato
    restaurante       # FK: Relación 1:N con Restaurante
    nombre            # Nombre del plato
    descripcion       # Descripción detallada
    precio            # Precio en pesos chilenos
    tiempo_preparacion # Tiempo estimado en minutos
    ingredientes      # Lista de componentes principales
    disponible        # Control de disponibilidad
    fecha_creacion    # Timestamp de creación
```

**Relación con FoodPlease:**
- Representa el **catálogo/menú** de cada restaurante
- Define el **precio y tiempos** necesarios para cobranza y logística
- Permite a clientes explorar **ofertas gastronómicas disponibles**

**Relación entre modelos (One-to-Many):**
```
Restaurante (1) ←→ (N) Platos
```
Un restaurante puede tener múltiples platos, pero cada plato pertenece a un único restaurante.

---

## ⚙️ Endpoints REST API Implementados

### CREATE (Crear)

#### Crear Restaurante
```
POST /api/restaurantes/
```
**Body JSON:**
```json
{
  "nombre": "El Buen Sabor",
  "direccion": "Calle 123",
  "telefono": "+56912345678",
  "email": "info@sabor.com",
  "tiempo_promedio_preparacion": 30
}
```
**Respuesta:** 201 CREATED con ID auto-generado (REST{8 dígitos})

#### Crear Plato
```
POST /api/platos/
```
**Body JSON:**
```json
{
  "id_restaurante": "REST001",
  "nombre": "Pasta Carbonara",
  "descripcion": "Auténtica receta italiana",
  "precio": 12500,
  "tiempo_preparacion": 15,
  "ingredientes": "Pasta, huevo, panceta, queso"
}
```
**Respuesta:** 201 CREATED con ID auto-generado (PLAT{8 dígitos})

### READ (Leer)

#### Listar Restaurantes
```
GET /api/restaurantes/
```
**Respuesta:** Array JSON con todos los restaurantes activos
```json
[
  {
    "id_restaurante": "REST001",
    "nombre": "El Buen Sabor",
    "direccion": "Calle 123",
    "activo": true
  }
]
```

#### Obtener Restaurante Específico
```
GET /api/restaurantes/<id_restaurante>/
```
- Retorna información detallada de un restaurante
- 404 si no existe

#### Listar Platos
```
GET /api/platos/
```
- Retorna array de todos los platos disponibles

#### Obtener Platos de un Restaurante
```
GET /api/platos/?id_restaurante=REST001
```
- Filtra platos por restaurante

### UPDATE (Actualizar)

#### Actualizar Restaurante
```
PUT /api/restaurantes/<id_restaurante>/
```
**Body JSON:** Los campos a actualizar
```json
{
  "nombre": "Nuevo Nombre",
  "telefono": "+56987654321"
}
```
**Respuesta:** 200 OK con registro actualizado

#### Actualizar Plato
```
PUT /api/platos/<id_plato>/
```
**Body JSON:** Los campos a actualizar
**Respuesta:** 200 OK con registro actualizado

### DELETE (Eliminar - Soft Delete)

#### Eliminar Restaurante
```
DELETE /api/restaurantes/<id_restaurante>/
```
- Marca el restaurante como inactivo (activo = False)
- No elimina el registro, lo desactiva
- **Respuesta:** 200 OK

#### Eliminar Plato
```
DELETE /api/platos/<id_plato>/
```
- Marca el plato como no disponible (disponible = False)
- No elimina el registro, lo desactiva
- **Respuesta:** 200 OK

---

## 🚀 Cómo Iniciar el Proyecto

### Requisitos Previos
- Python 3.7+
- pip (gestor de paquetes)

### Paso 1: Instalar Dependencias
```bash
pip install -r requirements_new.txt
```

### Paso 2: Inicializar Base de Datos
```bash
python init_db.py
```

Esto crea y popula la base de datos `foodplease.db`

### Paso 3: Ejecutar Servidor Flask
```bash
python run.py
```

El servidor estará disponible en: **http://127.0.0.1:5000**

### Paso 4: Ejecutar Frontend React
En otra terminal:
```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### Acceso a Interfaces
- **API Flask:** `http://127.0.0.1:5000/`
- **Frontend React:** `http://localhost:5173`

---

## 📱 Interfaces Disponibles

### 1. Gestión de Restaurantes (`/`)

**Descripción:** Página principal con listado de restaurantes y formulario de registro.

**Elementos principales:**
- **Panel Izquierdo (30%):**
  - Formulario de registro con validaciones
  - Campos: ID, Nombre, Dirección, Teléfono, Email, Tiempo
  - Botón "Registrar Restaurante"

- **Panel Derecho (70%):**
  - Tabla responsiva con restaurantes registrados
  - Columnas: #, ID, Nombre, Dirección, Teléfono, Tiempo, Opciones
  - Botones: "Ver Menú", "Editar", "Eliminar"

### 2. Gestión de Platos (`/detalles_platos/<id>/`)

**Descripción:** Visor y gestor del menú de un restaurante específico.

**Elementos principales:**
- Información del restaurante seleccionado
- Formulario para agregar nuevo plato
- Tabla de platos con opciones de edición/eliminación

### 3. Edición de Restaurante (`/edicion/<id>`)

**Descripción:** Formulario para modificar datos del restaurante.

### 4. Edición de Plato (`/edicion_plato/<id_rest>/<id_plato>`)

**Descripción:** Formulario para modificar datos del plato.

---

## 🔄 Flujo de Datos

```
Usuario accede a http://localhost:5173
  ↓
React carga App.tsx (componente principal)
  ↓
React efectúa GET /api/restaurantes/
  ↓
Flask procesa petición en app/routes/restaurantes.py
  ↓
Consulta DB: SELECT * FROM Restaurantes WHERE activo=True
  ↓
SQLAlchemy convierte resultados a JSON
  ↓
Flask retorna respuesta JSON con array de restaurantes
  ↓
React actualiza estado (useState)
  ↓
React re-renderiza componentes con nuevos datos
  ↓
Navegador muestra tabla de restaurantes
  ↓
Usuario interactúa (formulario, botones)
  ↓
React efectúa POST/PUT/DELETE a /api/restaurantes/
  ↓
Flask procesa, actualiza base de datos
  ↓
Modifica BD si es necesario
  ↓
Redirige o renderiza nuevamente
```

---

## 🔐 Seguridad Implementada

### 1. **CORS (Cross-Origin Resource Sharing)**
```python
# Flask app/config.py
CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]
```
Controla qué orígenes pueden acceder a la API.

### 2. **Validación de Entrada**
- **Frontend (React):** Validaciones en formularios antes de enviar
- **Backend (Flask):** Validaciones en modelos SQLAlchemy
- **Database:** Constraints en tipos y campos requeridos

### 3. **Confirmación de Eliminación**
```typescript
// React: Solicita confirmación antes de eliminar
const handleDelete = (id: string) => {
  if (window.confirm('¿Estás seguro?')) {
    deleteRestaurant(id);
  }
};
    window.location.href = enlace_delete;
}
```

### 4. **Encriptación de Base de Datos**
- Se recomendará usar en fase de producción
- Configurar `HTTPS` y certificados SSL

---

## 💾 Base de Datos (SQLite3)

### Esquema Generado

**Tabla: Restaurantes**
```sql
CREATE TABLE Restaurantes (
    id_restaurante VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(150),
    telefono VARCHAR(12),
    email VARCHAR(254),
    tiempo_promedio_preparacion SMALLINT DEFAULT 30,
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP AUTO_NOW_ADD
);
```

**Tabla: Platos**
```sql
CREATE TABLE Platos (
    id_plato VARCHAR(10) PRIMARY KEY,
    restaurante_id VARCHAR(10) FOREIGN KEY REFERENCES Restaurantes(id_restaurante),
    nombre VARCHAR(100),
    descripcion TEXT(300),
    precio DECIMAL(8,2),
    tiempo_preparacion SMALLINT DEFAULT 15,
    ingredientes VARCHAR(200),
    disponible BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP AUTO_NOW_ADD,
    UNIQUE (restaurante_id, nombre)
);
```

### Gestión a través de Frontend React

El panel web (`http://localhost:5173`) permite:
- ✅ Ver todas las tablas de restaurantes y platos
- ✅ Crear registros a través de formularios
- ✅ Editar datos directamente
- ✅ Aplicar filtros y búsquedas
- ✅ Soft delete (marcar como inactivo)
- ✅ Interfaz responsiva y moderna

---

## 🎓 Relación con FoodPlease

### ¿Cómo este CRUD espeja el sistema completo?

| Componente FoodPlease | Implementado en CRUD | Observaciones |
|---|---|---|
| **Panel Web - Restaurante** | ✅ Sí | Permite gestionar menú y disponibilidad |
| **Panel Web - Admin** | ✅ Sí | React frontend cubre administración de restaurantes |
| **Gestión de Pedidos** | ❌ No | Requiere modelo Pedido adicional |
| **Gestión de Repartidores** | ❌ No | Requiere modelo Repartidor y GPS |
| **Notificaciones en Tiempo Real** | ❌ No | Requiere WebSockets/Firebase |
| **Pagos** | ❌ No | Requiere integración Transbank/MercadoPago |
| **Autenticación Multi-rol** | ⚠️ Básica | Requiere JWT/Bearer Tokens |

### Qué Agregar Progresivamente

**Fase 1 (Próximo):**
- Modelo `Usuario` con roles (Restaurante, Admin, Repartidor, Cliente)
- Sistema de autenticación personalizado
- Modelo `Pedido` con estados (pendiente, confirmado, en preparación, etc.)

**Fase 2:**
- Integración de Google Maps API
- WebSockets para actualizaciones en tiempo real
- Notificaciones push con Firebase

**Fase 3:**
- Integración de pagos (Transbank SDK)
- Geolocalización de repartidores
- Analytics y dashboards

**Fase 4:**
- Escalado a producción (AWS/Azure)
- Certificados SSL/TLS
- Backups automáticos
- Monitoreo y logging

---

## 📝 Ejemplos de Uso

### 1. Crear un Restaurante

```bash
# Acceder a http://127.0.0.1:8000/
# Llenar formulario:
ID: REST001
Nombre: El Buen Comer
Dirección: Av. Principal 123, Santiago
Teléfono: +56 9 8765 4321
Email: contacto@elbuencomer.cl
Tiempo Preparación: 25 minutos

# Click en "Registrar Restaurante"
# Se agregará a la tabla y a la BD
```

### 2. Agregar un Plato

```bash
# Click en "Ver Menú" del restaurante creado
# Llenar formulario:
ID del Plato: PLT001
Nombre: Pastel de Choclo
Descripción: Plato tradicional chileno con choclo, pollo y aceituna
Precio: 8500
Tiempo Preparación: 20 minutos
Ingredientes: Choclo, pollo, cebolla, aceituna, máscarpone

# Click en "Registrar Plato"
```

### 3. Editar Información

```bash
# Hacer clic en "Editar" en la tabla
# Cambiar datos
# Guardar cambios
# Sistema actualiza BD automáticamente
```

### 4. Eliminar Registro

```bash
# Hacer clic en "Eliminar"
# Confirmar en pop-up de JavaScript
# Sistema elimina de BD
# Si es restaurante, también elimina platos asociados (cascada)
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| **Backend** | Flask | 2.3+ |
| **ORM** | SQLAlchemy | 2.0+ |
| **Base de Datos** | SQLite3 | Built-in |
| **Frontend** | React.js | 18+ |
| **Build Tool** | Vite | 4+ |
| **Estilos** | Tailwind CSS | 3+ |
| **TypeScript** | TypeScript | 5+ |
| **Server** | Flask Development | Built-in |

**Alternativas para Producción:**
- Servidor: Gunicorn + Nginx
- BD: PostgreSQL (recomendado)
- Hosting: AWS, Google Cloud, DigitalOcean
- Containerización: Docker

---

## 📊 Análisis de Funcionalidad

### Puntos Fuertes del CRUD

✅ **Implementación completa de CRUD** (4 operaciones fundamentales)
✅ **Interfaz moderna** con React y Tailwind CSS
✅ **API REST** completamente funcional
✅ **Validación en cliente y servidor**
✅ **CORS** para comunicación frontend-backend
✅ **Relaciones de modelos** (1:N) con SQLAlchemy
✅ **Soft delete** implementado (activo/disponible)
✅ **Soft delete** implementado (activo/disponible)
✅ **Auto-generación de IDs** (REST{8}, PLAT{8})

### Limitaciones y Mejoras Futuras

❌ Falta **autenticación de usuarios** con JWT
❌ No hay **roles o permisos** granulares
❌ Sin **auditoría** de cambios
❌ Faltan **búsqueda y filtrado avanzado**
❌ Sin **paginación** en tablas grandes
❌ Sin **tests unitarios** (test.py vacío)
❌ Sin **deploy** a producción

### Recomendaciones de Mejora

```python
# 1. Agregar autenticación con JWT
from flask_jwt_extended import JWTManager, create_access_token

# 2. Implementar roles y permisos
from functools import wraps

# 3. Agregar tests
import pytest
from flask.testing import FlaskClient

# 4. Implementar búsqueda avanzada
from sqlalchemy import or_

# 5. Agregar paginación
from flask_sqlalchemy import Pagination

# 6. Implementar auditoría
# Registrar cambios en tabla de histórico
```

---

## 🎯 Checklist de Validación

Este CRUD cumple con los requisitos para ser una **guía de implementación funcional**:

- ✅ Arquitectura moderna (Flask + React + SQLAlchemy)
- ✅ CRUD completo funcional (Create, Read, Update, Delete)
- ✅ Despliegue local (Flask dev server)
- ✅ Base de datos relacional (SQLite3)
- ✅ Interfaz web responsiva
- ✅ Validaciones básicas de entrada
- ✅ Documentación completa
- ✅ Adaptación a propuesta FoodPlease

---

## 📞 Soporte y Contacto

Para mejoras o preguntas sobre este CRUD, considere:
1. Revisar la documentación oficial de Flask: https://flask.palletsprojects.com/
2. Explorar el frontend en `http://localhost:5173` para ver toda la funcionalidad
3. Consultar la API en `http://127.0.0.1:5000/api` usando herramientas como Postman o Insomnia
4. Extender modelos según necesidades específicas
5. Revisar la documentación de SQLAlchemy: https://www.sqlalchemy.org/

---

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT. Libre para usar, modificar y distribuir.

---

**Última actualización:** Abril 2024
**Versión:** 1.0 - Implementación Base
**Estado:** ✅ Funcional | Lista para extensión

