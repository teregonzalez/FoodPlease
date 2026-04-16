# 🎯 MAPA VISUAL DEL PROYECTO - FoodPlease CRUD

## Estructura Final del Proyecto

```
django-crud-sqlite3/ (RAÍZ)
│
├── 📄 README.md .......................... ← Actualizado con FoodPlease
├── 📄 INICIO_RAPIDO.md .................. ← START HERE (5 min)
│
├── 📚 DOCUMENTACIÓN COMPLETA
│   ├── 📖 README_FOODPLEASE.md 
│   │   └─ Análisis CRUD + FoodPlease (500+ líneas)
│   ├── 🏗️ ARQUITECTURA.md
│   │   └─ Análisis técnico profundo (700+ líneas)
│   ├── 🌍 DESPLIEGUE.md
│   │   └─ Guías de producción (600+ líneas)
│   └── 📋 SUMARIO_MODIFICACIONES.md
│       └─ Resumen de cambios realizados
│
├── manage.py ............................ ← Comando principal Django
├── setup.sh ............................ ← Script de setup automatizado
│
└── 📁 APLICACIONES/
    │

    │   ├── models.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations/
    │   ├── templates/
    │   │   ├── base.html
    │   │   ├── gestionCursos.html
    │   │   └── edicionCurso.html
    │   └── static/
    │       ├── css/gestionCursos.css
    │       └── js/gestionCursos.js
    │
    └── 📁 Restaurantes/ ................ ← ⭐ APP NUEVA - CRUD RESTAURANTES
        │
        ├── __init__.py
        ├── apps.py ..................... Configuración
        ├── admin.py .................... Registro en admin Django
        ├── tests.py .................... Tests (para futuro)
        │
        ├── 📊 models.py (60 líneas)
        │   ├── class Restaurante
        │   │   └─ id, nombre, dirección, teléfono, email, 
        │   │      tiempo_preparación, activo, fecha_registro
        │   └── class Plato
        │       └─ id, restaurante (FK), nombre, descripción,
        │          precio, tiempo, ingredientes, disponible
        │
        ├── 🎬 views.py (150 líneas) - 10 VISTAS CRUD
        │   ├── home() → GET / (Listar restaurantes)
        │   ├── registrar_restaurante() → POST /registrar/
        │   ├── edicion_restaurante() → GET /edicion/<id>
        │   ├── editar_restaurante() → POST /editar/
        │   ├── eliminar_restaurante() → GET /eliminar/<id>
        │   ├── detalles_platos() → GET /detalles_platos/<id>/
        │   ├── registrar_plato() → POST /registrar_plato/<id>/
        │   ├── edicion_plato() → GET /edicion_plato/<id>/<id>
        │   ├── editar_plato() → POST /editar_plato/<id>/
        │   └── eliminar_plato() → GET /eliminar_plato/<id>/<id>
        │
        ├── 🛣️ urls.py (15 líneas)
        │   └─ 9 rutas URL mapeadas a vistas
        │
        ├── 📁 migrations/ ................ Historial BD
        │   └── __init__.py
        │
        ├── 📁 templates/ (600 líneas HTML)
        │   ├── base.html ................ Template base con herencia
        │   │   ├─ Navbar FoodPlease
        │   │   ├─ Bootstrap CDN
        │   │   ├─ {% block %}
        │   │   └─ Footer
        │   │
        │   ├── gestionRestaurantes.html .. Página principal
        │   │   ├─ Panel Izq (30%): Formulario CREATE
        │   │   └─ Panel Der (70%): Tabla READ/UPDATE/DELETE
        │   │
        │   ├── edicionRestaurante.html ... Formulario edición
        │   │   ├─ Campo oculto (ID)
        │   │   ├─ Campos pre-poblados
        │   │   ├─ Botón Guardar
        │   │   └─ Botón Cancelar
        │   │
        │   ├── gestionPlatos.html ....... Gestor de menú
        │   │   ├─ Info restaurante
        │   │   ├─ Formulario agregar plato
        │   │   └─ Tabla de platos
        │   │
        │   └── edicionPlato.html ........ Formulario edición plato
        │       └─ Similar a edicionRestaurante
        │
        ├── 📁 static/ (450 líneas de assets)
        │   │
        │   ├── 🎨 css/
        │   │   └── gestionRestaurantes.css (200 líneas)
        │   │       ├─ Variables :root (colores)
        │   │       ├─ Body y layout general
        │   │       ├─ Navbar personalizada
        │   │       ├─ Cards con hover effects
        │   │       ├─ Tablas responsivas
        │   │       ├─ Botones con transiciones
        │   │       ├─ Badges personalizados
        │   │       ├─ Tipografía y espaciado
        │   │       ├─ Media queries (mobile)
        │   │       └─ Validaciones visuales
        │   │
        │   └── ⚙️ js/
        │       └── gestionRestaurantes.js (100 líneas)
        │           ├─ setupDeleteButtons() → Confirmación
        │           ├─ setupFormValidation() → Validación
        │           ├─ validatePrice() → Número
        │           ├─ validateEmail() → Email
        │           ├─ validatePhoneChile() → Teléfono
        │           ├─ showAlert() → Notificaciones
        │           └─ formatCurrency() → Pesos chilenos
        │
        └── 📁 __init__.py ............... Indica que es un paquete Python

│
└── 📁 config/ ......................... Configuración Django
    ├── __init__.py
    ├── settings.py ..................... ✅ MODIFICADO
    │   ├─ INSTALLED_APPS += 'Aplicaciones.Restaurantes'
    │   ├─ LANGUAGE_CODE = 'es-cl'
    │   └─ TIME_ZONE = 'America/Santiago'
    ├── urls.py ......................... ✅ MODIFICADO
    │   ├─ path('', include(Restaurantes))

    ├── asgi.py
    └── wsgi.py
```

## 🔄 Flujo de Datos

```
USUARIO EN NAVEGADOR
    │
    ├─→ GET http://127.0.0.1:8000/
    │       │
    │       ├─→ Django URL Router
    │       ├─→ views.home()
    │       ├─→ Restaurante.objects.all()
    │       ├─→ Render template
    │       └─→ HTML renderizado en navegador
    │
    ├─→ COMPLETA FORMULARIO
    │   Ej: Nombre: "El Buen Comer"
    │
    ├─→ POST http://127.0.0.1:8000/registrar/
    │       │
    │       ├─→ views.registrar_restaurante()
    │       ├─→ Extrae datos: request.POST
    │       ├─→ Valida campos
    │       ├─→ Restaurante.objects.create()
    │       ├─→ BD: INSERT INTO Restaurantes...
    │       ├─→ Crea mensaje de éxito
    │       └─→ redirect('/')
    │
    └─→ redirect GET http://127.0.0.1:8000/
            └─→ Página actualizada con nuevo restaurante ✅
```

## 🗄️ Base de Datos

```
foodplease.db (SQLite3)

┌─────────────────────────────────────────┐
│         TABLA: Restaurantes             │
├──────────────┬──────────────────────────┤
│ id_resto...  │ PK VARCHAR(10)           │
│ nombre       │ VARCHAR(100)             │
│ direccion    │ VARCHAR(150)             │
│ telefono     │ VARCHAR(12)              │
│ email        │ VARCHAR(254)             │
│ tiempo_prep  │ SMALLINT DEFAULT 30      │
│ activo       │ BOOLEAN DEFAULT TRUE     │
│ fecha_reg    │ DATETIME AUTO_NOW_ADD    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         TABLA: Platos                   │
├──────────────┬──────────────────────────┤
│ id_plato     │ PK VARCHAR(10)           │
│ restaurante  │ FK → Restaurantes        │
│ nombre       │ VARCHAR(100)             │
│ descripcion  │ TEXT(300)                │
│ precio       │ DECIMAL(8,2)             │
│ tiempo_prep  │ SMALLINT DEFAULT 15      │
│ ingredientes │ VARCHAR(200)             │
│ disponible   │ BOOLEAN DEFAULT TRUE     │
│ fecha_crear  │ DATETIME AUTO_NOW_ADD    │
└─────────────────────────────────────────┘
```

## 🎯 Operaciones CRUD por Ruta

```
CREATE (Crear)
├─ POST /registrar/
│   └─ form → Restaurante.create() → BD
└─ POST /registrar_plato/<id>/
    └─ form → Plato.create() → BD

READ (Leer)
├─ GET /
│   └─ BD: SELECT * FROM Restaurantes → HTML
└─ GET /detalles_platos/<id>/
    └─ BD: SELECT FROM Platos WHERE restaurante_id → HTML

UPDATE (Actualizar)
├─ GET /edicion/<id>
│   └─ BD: SELECT * FROM Restaurantes WHERE id → form precargado
├─ POST /editar/
│   └─ form → Restaurante.save() → BD UPDATE
├─ GET /edicion_plato/<id>/<id>
│   └─ BD: SELECT * FROM Platos → form precargado
└─ POST /editar_plato/<id>/
    └─ form → Plato.save() → BD UPDATE

DELETE (Eliminar)
├─ GET /eliminar/<id>
│   └─ confirmation? → Restaurante.delete() → BD + CASCADE
└─ GET /eliminar_plato/<id>/<id>
    └─ confirmation? → Plato.delete() → BD
```

## 📱 Interfaces Disponibles

```
http://127.0.0.1:8000/
    └─ Panel Restaurantes (Página principal)
       ├─ Formulario CREATE restaurante (left 30%)
       ├─ Tabla READ restaurantes (right 70%)
       ├─ Buttons UPDATE restaurante
       └─ Buttons DELETE restaurante

http://127.0.0.1:8000/detalles_platos/REST001/
    └─ Gestor de Menú
       ├─ Formulario CREATE plato
       ├─ Tabla READ platos
       ├─ Buttons UPDATE plato
       └─ Buttons DELETE plato

http://127.0.0.1:8000/admin/
    └─ Django Admin Panel
       ├─ Gestión de Restaurantes (CRUD admin)
       └─ Gestión de Platos (CRUD admin)
```

## 🚀 Para Iniciar

```bash
# 1. Instalar
pip install django

# 2. Preparar BD
python manage.py migrate
python manage.py makemigrations Aplicaciones.Restaurantes
python manage.py migrate Aplicaciones.Restaurantes

# 3. Admin
python manage.py createsuperuser

# 4. Ejecutar
python manage.py runserver

# 5. Acceder
Navegador: http://127.0.0.1:8000/
```

---

**Estado:** ✅ COMPLETO Y FUNCIONAL
**Documentación:** ✅ COMPLETA Y DETALLADA
**Listo para:** Evaluación, extensión, productivización

