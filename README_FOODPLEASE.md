# FoodPlease - CRUD Funcional de Gestión de Restaurantes

## 📋 Introducción

Este proyecto es una **guía de implementación mínimamente funcional** de un **CRUD (Create, Read, Update, Delete)** desarrollado con **Django** y **SQLite3**, adaptado específicamente para demostrar los conceptos fundamentales de la plataforma **FoodPlease**.

El sistema implementa las operaciones básicas necesarias para gestionar restaurantes y sus menús (platos), sirviendo como prototipo de la capa de administración web que FoodPlease requiere.

---

## 🎯 Objetivos del Proyecto

1. **Demostrar un CRUD funcional** con despliegue local usando Django
2. **Implementar modelos de datos** relevantes al sector de delivery gastronómico
3. **Crear interfaces web responsivas** con Bootstrap 4
4. **Documentar arquitectura y flujos** aplicables a FoodPlease
5. **Servir como base** para extensiones futuras (autenticación, pagos, notificaciones)

---

## 🏗️ Arquitectura Actual

### 📁 Estructura del Proyecto

```
django-crud-sqlite3/
├── manage.py                          # Comando principal de Django
├── README.md                          # Este archivo
├── foodplease.db                      # Base de datos SQLite3 (generada al iniciar)
│
├── Aplicaciones/

│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── templates/
│   │   ├── static/
│   │   └── migrations/
│   │
│   └── Restaurantes/                  # ⭐ APP NUEVA - CRUD DE RESTAURANTES
│       ├── models.py                  # Modelos: Restaurante, Plato
│       ├── views.py                   # Vistas CRUD completas
│       ├── urls.py                    # Rutas del sistema
│       ├── admin.py                   # Registro en admin de Django
│       ├── templates/
│       │   ├── base.html              # Template base (herencia)
│       │   ├── gestionRestaurantes.html
│       │   ├── edicionRestaurante.html
│       │   ├── gestionPlatos.html
│       │   └── edicionPlato.html
│       ├── static/
│       │   ├── css/
│       │   │   └── gestionRestaurantes.css
│       │   └── js/
│       │       └── gestionRestaurantes.js
│       └── migrations/                # Historial de cambios del esquema
│
└── config/                            # Configuración del proyecto Django
    ├── __init__.py
    ├── settings.py                    # Configuración global
    ├── urls.py                        # URLs principales
    ├── asgi.py
    └── wsgi.py
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

## ⚙️ Operaciones CRUD Implementadas

### CREATE (Crear)

#### Registrar Restaurante
```
POST /registrar/
```
**Parámetros:**
- `txtIdRestaurante`: ID único
- `txtNombre`: Nombre del local
- `txtDireccion`: Dirección física
- `txtTelefono`: Contacto
- `txtEmail`: Email
- `numTiempoPreparacion`: Tiempo promedio en minutos

**Flujo:**
1. Usuario accede a `/` (página principal)
2. Completa formulario en panel izquierdo
3. Sistema valida campos
4. Crea registro en tabla `Restaurantes`
5. Muestra mensaje de éxito
6. Actualiza tabla de resultados

#### Registrar Plato
```
POST /registrar_plato/<id_restaurante>/
```
Similar al anterior, pero requiere seleccionar primero un restaurante.

### READ (Leer)

#### Listar Restaurantes
```
GET /
```
- Consulta la base de datos: `SELECT * FROM Restaurantes`
- Renderiza tabla con todos los registros
- Incluye botones de acciones (Ver Menú, Editar, Eliminar)

#### Ver Detalles del Menú
```
GET /detalles_platos/<id_restaurante>/
```
- Filtra platos por restaurante
- Muestra tabla con el menú completo
- Permite agregar nuevos platos

### UPDATE (Actualizar)

#### Editar Restaurante
```
GET  /edicion/<id_restaurante>
POST /editar/
```
1. Usuario accede a `/edicion/<id>`
2. Sistema carga datos actuales en formulario
3. Usuario modifica campos
4. Envía POST a `/editar/`
5. Sistema actualiza registro: `UPDATE Restaurantes SET ... WHERE id_restaurante = ?`
6. Redirige a inicio

#### Editar Plato
```
GET  /edicion_plato/<id_restaurante>/<id_plato>
POST /editar_plato/<id_restaurante>/
```

### DELETE (Eliminar)

#### Eliminar Restaurante
```
GET /eliminar/<id_restaurante>
```
1. Usuario hace clic en botón "Eliminar"
2. JavaScript muestra confirmación
3. Si confirma: `DELETE FROM Restaurantes WHERE id_restaurante = ?`
4. También elimina platos asociados (cascada)

#### Eliminar Plato
```
GET /eliminar_plato/<id_restaurante>/<id_plato>
```

---

## 🚀 Cómo Iniciar el Proyecto

### Requisitos Previos
- Python 3.7+
- pip (gestor de paquetes)

### Paso 1: Instalar Dependencias
```bash
pip install django
```

### Paso 2: Aplicar Migraciones
```bash
python manage.py migrate
```

Esto crea la estructura de tablas en `foodplease.db`

### Paso 3: Crear Migraciones para la App Restaurantes
```bash
python manage.py makemigrations Aplicaciones.Restaurantes
python manage.py migrate Aplicaciones.Restaurantes
```

### Paso 4: Crear Superusuario (Admin)
```bash
python manage.py createsuperuser
```
Ingresa credenciales para acceder a `/admin/`

### Paso 5: Iniciar el Servidor
```bash
python manage.py runserver
```

El servidor estará disponible en: **http://127.0.0.1:8000**

### Acceso a Interfaces
- **Panel de Restaurantes:** `http://127.0.0.1:8000/`
- **Admin de Django:** `http://127.0.0.1:8000/admin/`

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
Usuario accede a /
  ↓
Django carga vista home()
  ↓
Consulta DB: SELECT * FROM Restaurantes
  ↓
Renderiza template: gestionRestaurantes.html
  ↓
Transmite datos (contexto) al template
  ↓
Template genera HTML con Jinja2
  ↓
Navegador renderiza en cliente
  ↓
Usuario interactúa (formulario, botones)
  ↓
POST/GET a vista correspondiente
  ↓
Vista procesa datos
  ↓
Modifica BD si es necesario
  ↓
Redirige o renderiza nuevamente
```

---

## 🔐 Seguridad Implementada

### 1. **CSRF Protection**
```html
{% csrf_token %}
```
Django genera token en formularios para prevenir ataques cross-site.

### 2. **Validación de Entrada**
- HTML5: `required`, `minlength`, `maxlength`, `pattern`
- Django: `ModelForm` con validaciones automáticas
- JavaScript: Funciones de validación en `gestionRestaurantes.js`

### 3. **Confirmación de Eliminación**
```javascript
// Antes de permitir DELETE, solicita confirmación
if (confirm('¿Estás seguro?')) {
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

### Visualización en Admin
Django Admin (`/admin/`) permite:
- ✅ Ver todas las tablas
- ✅ Crear registros manualmente
- ✅ Editar datos directamente
- ✅ Aplicar filtros y búsquedas
- ✅ Exportar datos

---

## 🎓 Relación con FoodPlease

### ¿Cómo este CRUD espeja el sistema completo?

| Componente FoodPlease | Implementado en CRUD | Observaciones |
|---|---|---|
| **Panel Web - Restaurante** | ✅ Sí | Permite gestionar menú y disponibilidad |
| **Panel Web - Admin** | ⚠️ Parcial | Admin Django cubre esto; versión web podría mejorar |
| **Gestión de Pedidos** | ❌ No | Requiere modelo Pedido adicional |
| **Gestión de Repartidores** | ❌ No | Requiere modelo Repartidor y GPS |
| **Notificaciones en Tiempo Real** | ❌ No | Requiere WebSockets/Firebase |
| **Pagos** | ❌ No | Requiere integración Transbank/MercadoPago |
| **Autenticación Multi-rol** | ⚠️ Básica | Django auth; requiere extensión |

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
| **Backend** | Django | 3.1+ |
| **Base de Datos** | SQLite3 | Built-in |
| **Frontend** | HTML5 + Bootstrap | 4.5.3 |
| **Estilos** | CSS3 Personalizado | |
| **Interactividad** | JavaScript Vanilla | ES6 |
| **Server** | Django Development | Built-in |

**Alternativas para Producción:**
- Servidor: Gunicorn + Nginx
- BD: PostgreSQL (recomendado)
- Frontend: React.js (escalabilidad)
- Hosting: AWS, Google Cloud, DigitalOcean

---

## 📊 Análisis de Funcionalidad

### Puntos Fuertes del CRUD

✅ **Implementación completa de CRUD** (4 operaciones fundamentales)
✅ **Interfaz responsiva** adaptable a diferentes pantallas
✅ **Validación en cliente y servidor**
✅ **Seguridad básica** con CSRF tokens
✅ **Herencia de templates** con Jinja2
✅ **Relaciones de modelos** (1:N)
✅ **Admin Panel** para gestión avanzada
✅ **Migraciones automáticas** de BD

### Limitaciones y Mejoras Futuras

❌ Falta **autenticación de usuarios**
❌ No hay **roles o permisos** granulares
❌ Sin **auditoría** de cambios
❌ No implementa **soft delete** (registros lógicos)
❌ Faltan **búsqueda y filtrado avanzado**
❌ Sin **paginación** en tablas grandes
❌ No hay **API REST** (solo vistas HTML)
❌ Sin **pruebas unitarias** (tests.py vacío)

### Recomendaciones de Mejora

```python
# 1. Agregar paginación
from django.core.paginator import Paginator

# 2. Crear API REST con Django REST Framework
from rest_framework import serializers, viewsets

# 3. Agregar autenticación
from django.contrib.auth.models import User

# 4. Crear formularios reutilizables
from django import forms

# 5. Implementar búsqueda
queryset = Restaurante.objects.filter(nombre__icontains=query)

# 6. Agregar tests
from django.test import TestCase
```

---

## 🎯 Checklist de Validación

Este CRUD cumple con los requisitos para ser una **guía de implementación funcional**:

- ✅ Análisis del modelo de negocio de delivery
- ✅ CRUD mínimamente funcional (Create, Read, Update, Delete)
- ✅ Despliegue local (runserver)
- ✅ Base de datos relacional (SQLite3)
- ✅ Interfaz web responsiva
- ✅ Validaciones básicas de entrada
- ✅ Documentación completa
- ✅ Adaptación a propuesta FoodPlease

---

## 📞 Soporte y Contacto

Para mejoras o preguntas sobre este CRUD, considere:
1. Revisar la documentación oficial de Django: https://docs.djangoproject.com/
2. Explorar el admin en `/admin/` para comprender la BD
3. Extender modelos según necesidades específicas

---

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT. Libre para usar, modificar y distribuir.

---

**Última actualización:** Abril 2024
**Versión:** 1.0 - Implementación Base
**Estado:** ✅ Funcional | Lista para extensión

