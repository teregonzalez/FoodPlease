# Arquitectura del CRUD - Análisis Técnico para FoodPlease

## 🏛️ Arquitectura General (MVC - Django)

```
=================================================================================
                          CLIENTE (Navegador)
                              HTTP/HTTPS
=================================================================================
                            |
                            v
                    DJANGO URLS ROUTER
                        (urls.py)
                            |
        -------|------------|-------------|--------
        |      |            |            |
        v      v            v            v
    HOME   REGISTRAR   EDICION    ELIMINAR
     /      /registrar  /edicion/ /eliminar/
        |      |            |
        |      |            |
        v      v            v
    ===========================================
           VISTAS (views.py)
    - home()
    - registrar_restaurante()
    - edicion_restaurante()
    - editar_restaurante()
    - eliminar_restaurante()
    - detalles_platos()
    - registrar_plato()
    - edicion_plato()
    - editar_plato()
    - eliminar_plato()
    ===========================================
             |
             v
    ===========================================
        MODELOS (models.py)
    - Restaurante
    - Plato (con FK a Restaurante)
    ===========================================
             |
             v
    ===========================================
      BASE DE DATOS (SQLite3)
    - Tabla: Restaurantes
    - Tabla: Platos
    ===========================================
```

## 📑 Flujo Detallado de una Operación CRUD

### 1️⃣ CREATE - Registrar Restaurante

```
USUARIO                           SISTEMA DJANGO
   |                                   |
   |-- Accede a / ------------------>  Django Router
   |                                   |
   |                            ---- HOME VIEW
   |                           |  Consulta BD
   |                           |  SELECT * FROM Restaurantes
   |                            ---- Renderiza HTML
   |<-- Recibe formulario -------|
   |
   |-- Completa formulario
   |-- Click "Registrar" ------>  View: registrar_restaurante()
   |                              |
   |                              |- Valida datos:
   |                              |  • Campos requeridos
   |                              |  • Formato email
   |                              |  • Duplicidad ID
   |                              |
   |                              |- INSERT INTO Restaurantes
   |                              |- Commit BD
   |                              |
   |                              |- messages.success()
   |                              |- redirect('/')
   |<-- Redirige a home ----------|
   |                              Recargar con mensaje
```

**Código Ejecutado:**
```python
def registrar_restaurante(request):
    # 1. POST request recibido
    # 2. Extraer datos del formulario
    id_restaurante = request.POST['txtIdRestaurante']
    nombre = request.POST['txtNombre']
    
    # 3. Crear objeto en memoria
    restaurante = Restaurante(
        id_restaurante=id_restaurante,
        nombre=nombre,
        ...
    )
    
    # 4. Guardar en BD (SQL: INSERT)
    restaurante.save()
    
    # 5. Notificar usuario
    messages.success(request, '¡Restaurante registrado!')
    
    # 6. Redirigir
    return redirect('/')
```

### 2️⃣ READ - Listar Restaurantes

```
BD: SELECT * FROM Restaurantes;
        |
        v
[REST001, REST002, REST003,...]
        |
        v
View pasa datos al template: {"restaurantes": queryset}
        |
        v
Template renderiza tabla HTML con Jinja2:
{% for r in restaurantes %}
    <tr>
        <td>{{ r.nombre }}</td>
        <td>{{ r.direccion }}</td>
        ...
    </tr>
{% endfor %}
        |
        v
Navegador renderiza tabla
```

### 3️⃣ UPDATE - Editar Restaurante

```
PASO 1: Usuario hace click en "Editar"
    /edicion/REST001
        |
        v
    View: edicion_restaurante()
    restaurante = Restaurante.objects.get(id_restaurante='REST001')
    return render(template, {"restaurante": restaurante})
        |
        v
    Template renderiza con valores actuales (value="{{ restaurante.nombre }}")

PASO 2: Usuario modifica datos y hace submit
    POST /editar/
        |
        v
    View: editar_restaurante()
    restaurante = Restaurante.objects.get(id_restaurante=id)
    restaurante.nombre = request.POST['txtNombre']  # Cambio
    restaurante.save()  # SQL: UPDATE
        |
        v
    Redirige a home con mensaje de éxito
```

### 4️⃣ DELETE - Eliminar Restaurante

```
Usuario clic en "Eliminar"
    |
    v
JavaScript: confirm('¿Seguro?')
    |
    Si cancela ---> No hace nada
    |
    Si confirma
    v
    GET /eliminar/REST001
    |
    v
    View: eliminar_restaurante()
    restaurante = Restaurante.objects.get(id_restaurante='REST001')
    restaurante.delete()  # SQL: DELETE + CASCADE
    |
    v
    Redirige a home
```

---

## 🔀 Relaciones entre Tablas

### One-to-Many (1:N)

```
RESTAURANTES                    PLATOS
┌─────────────────┐      ┌──────────────────┐
│ id_restaurante  │◄──┬──│ id_plato         │
│ (PK)            │   │  │ (PK)             │
│                 │   │  │                  │
│ nombre          │   │  │ nombre           │
│ direccion       │   │  │ precio           │
│ email           │   │  │ restaurante (FK)◄┘
│                 │   │  │                  │
└─────────────────┘   │  └──────────────────┘
                      │
              FOREIGN KEY
         (Restricción de Integridad)
```

**Implicaciones:**
- Un restaurante puede tener 0, 1, o N platos
- Todo plato debe asociarse a un restaurante
- Si se elimina restaurante, se eliminan sus platos (ON DELETE CASCADE)

**Query de ejemplo:**
```sql
-- Obtener todos los platos de un restaurante
SELECT * FROM Platos 
WHERE restaurante_id = 'REST001';

-- Obtener restaurante con sus platos
SELECT r.nombre, p.nombre, p.precio
FROM Restaurantes r
JOIN Platos p ON r.id_restaurante = p.restaurante_id
WHERE r.id_restaurante = 'REST001';
```

---

## 📱 Flujo de Datos en la Interfaz Web

```
┌────────────────────────────────────────────────────────────┐
│               TEMPLATE: gestionRestaurantes.html            │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐      ┌──────────────────────────┐ │
│  │  PANEL IZQUIERDO    │      │  PANEL DERECHO           │ │
│  │  (Operaciones)      │      │  (Visualización)         │ │
│  │                     │      │                          │ │
│  │ Formulario POST     │      │  SELECT * FROM BD        │ │
│  │ - Registrar resto   │      │  - Mostrar tabla HTML    │ │
│  │ - Agregar plato     │      │  - Links a editar        │ │
│  │ - Validaciones JS   │      │  - Botones eliminar      │ │
│  │                     │      │                          │ │
│  │ Componentes:        │      │  Componentes:            │ │
│  │ • text input        │      │  • HTML table            │ │
│  │ • number input      │      │  • Bootstrap classes     │ │
│  │ • email input       │      │  • Buttons a/link        │ │
│  │ • submit button     │      │                          │ │
│  │                     │      │                          │ │
│  └─────────────────────┘      └──────────────────────────┘ │
│                                                             │
└────────────────────────────────────────────────────────────┘

ESTILOS (CSS):
├── base.html
│   └── Bootstrap 4 CDN + gestionRestaurantes.css
│       ├── Navbar con marca FoodPlease
│       ├── Container y grid system
│       ├── Responsividad (col-md-*, col-lg-*)
│       └── Colores corporativos

INTERACTIVIDAD (JS):
├── gestionRestaurantes.js
│   ├── setupDeleteButtons()  → Confirmación antes eliminar
│   ├── setupFormValidation() → Validar formularios
│   ├── validatePrice()       → Validar números
│   ├── validateEmail()       → Validar emails
│   └── formatCurrency()      → Formatear pesos chilenos
```

---

## 🔐 Capas de Seguridad

### Capa 1: HTML5 Validación (Cliente)

```html
<input type="text" required minlength="4" maxlength="10">
<input type="email">
<input type="number" min="100" max="50000">
<!-- Previene submissions inválidas en cliente -->
```

### Capa 2: JavaScript Validación (Cliente)

```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Evita trampas simples pero no reemplaza servidor
```

### Capa 3: Django Validación (Servidor)

```python
class Restaurante(models.Model):
    email = models.EmailField()  # Django valida email
    telefono = models.CharField(max_length=12)  # Longitud limitada
    precio = models.DecimalField(max_digits=8, decimal_places=2)  # Tipo de dato
    
    # Custom validators si es necesario
    def clean(self):
        if len(self.telefono) < 9:
            raise ValidationError("Teléfono inválido")
```

### Capa 4: CSRF Protection

```html
<!-- Cada formulario incluye -->
{% csrf_token %}

<!-- Django valida que el token sea correcto
     Previene formularios POST no autorizados
-->
```

### Capa 5: SQL Injection Prevention

```python
# ❌ VULNERABLE
query = f"SELECT * FROM Restaurantes WHERE id = {user_input}"

# ✅ SEGURO (Django ORM)
restaurante = Restaurante.objects.get(id_restaurante=user_input)
# Para valores realmente custom: objects.raw(query, [user_input])
```

---

## 🗄️ Schema de Base de Datos

### Diagrama ER (Entity-Relationship)

```
┌────────────────────────────────────────┐
│           RESTAURANTES                 │
├────────────────────────────────────────┤
│ PK │ id_restaurante   VARCHAR(10)      │
│    │ nombre           VARCHAR(100)     │
│    │ direccion        VARCHAR(150)     │
│    │ telefono         VARCHAR(12)      │
│    │ email            VARCHAR +(254)   │
│    │ tiempo_promedio_ SMALLINT (15)    │
│    │ preparacion      DEFAULT 30       │
│    │ activo           BOOLEAN (1)      │
│    │ fecha_registro   DATETIME         │
└────────────────────────────────────────┘
        │
        │ 1 (One)
        │
        │ (id_restaurante)
        │
    1───┼───N
        │
        │ (restaurante_id) FK
        │
        │ N (Many)
        │
┌────────────────────────────────────────┐
│              PLATOS                    │
├────────────────────────────────────────┤
│ PK │ id_plato           VARCHAR(10)    │
│ FK │ restaurante_id     VARCHAR(10)    │
│    │ nombre             VARCHAR(100)   │
│    │ descripcion        TEXT (300)     │
│    │ precio             DECIMAL(8,2)   │
│    │ tiempo_preparacion SMALLINT (15)  │
│    │                    DEFAULT 15     │
│    │ ingredientes       VARCHAR(200)   │
│    │ disponible         BOOLEAN (1)    │
│    │ fecha_creacion     DATETIME       │
│    │ UNIQUE (restaurante_id, nombre)   │
└────────────────────────────────────────┘

Notación:
PK = Primary Key
FK = Foreign Key
```

---

## 🚀 Cómo se Mapea a FoodPlease

### Sistema Actual vs. Propuesta Completa

| Aspecto | CRUD Actual | FoodPlease Completo | Gap |
|---------|-------------|-------------------|-----|
| **Gestión Restaurantes** | ✅ 100% | 100% | Nulo |
| **Gestión Menú** | ✅ 100% | 100% | Nulo |
| **Gestión Pedidos** | ❌ 0% | 100% | Requerida nueva tabla |
| **Gestión Usuarios** | ⚠️ 5% | 100% | Extensión auth |
| **Repartidores** | ❌ 0% | 100% | Modelo nuevo |
| **Clientes** | ❌ 0% | 100% | Modelo nuevo |
| **Notificaciones** | ❌ 0% | 100% | WebSockets/Firebase |
| **Pagos** | ❌ 0% | 100% | Transbank/MercadoPago API |
| **Geolocalización** | ❌ 0% | 100% | Google Maps SDK |
| **Tracking en Tiempo Real** | ❌ 0% | 100% | WebSockets |

### Extensiones Sugeridas (Orden de Prioridad)

**CORTO PLAZO (1-2 sprints):**
1. Agregar modelo `Usuario` con roles
2. Implementar `Pedido` con estados
3. Crear autenticación multi-rol

**MEDIANO PLAZO (2-3 sprints):**
4. API REST con Django REST Framework
5. Agregar modelo `Cliente`
6. Integración Google Maps API

**LARGO PLAZO (3+ sprints):**
7. Agregar modelo `Repartidor`
8. WebSockets para tracking
9. Integración de pagos
10. Deploy a producción

---

## 📊 Métricas de Complejidad

| Métrica | Valor | Interpretación |
|---------|-------|-----------------|
| Número de Modelos | 2 | ✅ Muy simple |
| Relaciones | 1 (1:N) | ✅ Unitaria |
| Vistas | 10 | ✅ Manejable |
| Templates | 5 | ✅ No repetitivos |
| Líneas de código | ~1000 | ✅ CRUD básico |
| Cobertura de pruebas | 0% | ❌ Inexistente |
| Complejidad ciclomática | Baja | ✅ Lógica lineal |

---

## 🔍 Análisis de Escalabilidad

### Base de Datos

**Problema:** SQLite3 no escala bien con concurrencia

```
Registros: 1-1000      → ✅ Excelente
Registros: 1k-10k      → ✅ Muy bien
Registros: 10k-100k    → ⚠️ Bueno (con índices)
Registros: 100k-1M     → ❌ Lento
Registros: >1M         → ❌ Crítico
```

**Recomendación para Producción:**
```python
# Cambiar en settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'foodplease_db',
        'USER': 'foodplease_user',
        'PASSWORD': '****',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Servidor Web

**Limitaciones de `python manage.py runserver`:**
- Máximo 1 proceso único
- No maneja bien concurrencia
- NO usar en producción

**Para Producción:**
```bash
# Instalar Gunicorn
pip install gunicorn

# Ejecutar con múltiples workers
gunicorn config.wsgi:application \
    --workers 4 \
    --bind 0.0.0.0:8000
```

### Frontend

**CDN vs. Local:**
- Bootstrap CDN: Rápido pero depende de internet
- jQuery CDN: Similar
- Para offline: descargar y servir localmente

---

## 🧪 Testing y Validación

### Tests Unitarios Necesarios

```python
from django.test import TestCase

class RestauranteTestCase(TestCase):
    def setUp(self):
        self.restaurante = Restaurante.objects.create(
            id_restaurante='REST001',
            nombre='El Buen Comer'
        )
    
    def test_crear_restaurante(self):
        self.assertEqual(self.restaurante.id_restaurante, 'REST001')
    
    def test_eliminar_platos_con_restaurante(self):
        # Al eliminar restaurante, se eliminan platos
        Plato.objects.create(
            id_plato='PLT001',
            restaurante=self.restaurante,
            nombre='Pastel de Choclo'
        )
        self.restaurante.delete()
        # Verificar que platos se eliminaron
```

### Tests de Integración

```python
from django.test import Client

class ViewTestCase(TestCase):
    def test_home_page(self):
        client = Client()
        response = client.get('/')
        self.assertEqual(response.status_code, 200)
    
    def test_crear_restaurante_post(self):
        client = Client()
        response = client.post('/registrar/', {
            'txtIdRestaurante': 'REST001',
            'txtNombre': 'Test Restaurant'
        })
        self.assertEqual(response.status_code, 302)  # Redirect
```

---

**Fin del Análisis Técnico**

Documento preparado para ser guía de implementación y extensión del CRUD hacia FoodPlease completo.

