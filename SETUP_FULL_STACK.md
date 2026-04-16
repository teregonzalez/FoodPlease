# 🚀 Ejecutar Proyecto FoodPlease (Django + React)

Esta guía explica cómo ejecutar **Django backend** + **React frontend** juntos.

---

## 📋 Requisitos

- Python 3.9+
- Node.js 16+ y npm
- Git

---

## 🔧 Instalación

### 1. Backend (Django)

```bash
# Entrar en raíz del proyecto
cd django-crud-sqlite3

# Crear entorno virtual
python -m venv .venv

# Activar entorno
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Instalar dependencias
pip install django djangorestframework django-cors-headers

# Aplicar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Verificar que todo está bien
python manage.py check
```

### 2. Frontend (React)

```bash
# Entrar en la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Verificar que todo está bien
npm run type-check
```

---

## 🎯 Ejecutar en Desarrollo

### Terminal 1: Django Backend

```bash
cd django-crud-sqlite3
source .venv/bin/activate  # o .venv\Scripts\activate en Windows

# Ejecutar servidor
python manage.py runserver

# Salida esperada:
# Watching for file changes with StatReloader
# Quit the server with CONTROL-C.
# Starting development server at http://127.0.0.1:8000/
# ...
```

### Terminal 2: React Frontend

```bash
cd frontend

# Ejecutar dev server
npm run dev

# Salida esperada:
#   VITE v5.0.8  ready in 145 ms
#   ➜  Local:   http://localhost:5173/
#   ➜  press h to show help
```

### 3. Acceder a la aplicación

- **Frontend React:** http://localhost:5173
- **Backend Django Admin:** http://127.0.0.1:8000/admin/
- **OK Backend API:** http://127.0.0.1:8000/api/v1/

---

## 📊 Flujo de Comunicación

```
Cliente abre browser
http://localhost:5173
        ↓
React App carga en navegador
        ↓
React hace requests a http://127.0.0.1:8000/api/v1/
        ↓
Django backend responde con JSON
        ↓
React actualiza UI
        ↓
✅ Funciona!
```

---

## ⚠️ Posibles Errores y Soluciones

### Error: "CORS error"

```
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/...'
from origin 'http://localhost:5173' has been blocked...
```

**Solución:**
- Verificar que `django-cors-headers` está instalado:
  ```bash
  pip install django-cors-headers
  ```
- Verificar que está en `INSTALLED_APPS` en `config/settings.py`
- Verificar que puerto 5173 está en `CORS_ALLOWED_ORIGINS`

### Error: "Cannot GET /api/v1/restaurantes/"

**Solución:**
- Verificar que Django está corriendo en otra terminal
- Verificar que las migraciones se aplicaron: `python manage.py migrate`

### Error: "Cannot find module" en frontend

```bash
# Limpiar cache
rm -rf node_modules
npm install

# O reconstruir
npm run build
```

### Error: "Port already in use"

```bash
# Django (cambiar puerto)
python manage.py runserver 8001

# React (Vite automáticamente usa 5174+)
npm run dev
```

---

## 🏗️ Estructura del Proyecto

```
django-crud-sqlite3/
├── Aplicaciones/
│   └── Restaurantes/
│       ├── models.py              (BD)
│       ├── views.py               (Vistas template)
│       ├── api_views.py           (ViewSets REST API)
│       ├── serializers.py         (Serialización JSON)
│       ├── urls.py                (Rutas template)
│       ├── urls_api.py            (Rutas API)
│       └── ...
├── config/
│   ├── settings.py                (Configuración Django)
│   ├── urls.py                    (Rutas principales)
│   └── ...
├── frontend/                       ← NUEVO
│   ├── src/
│   │   ├── components/            (Componentes React)
│   │   ├── services/              (API Services)
│   │   ├── hooks/                 (Custom Hooks)
│   │   ├── types/                 (TypeScript types)
│   │   ├── App.tsx                (App principal)
│   │   └── main.tsx               (Entrada)
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── manage.py
├── foodplease.db
├── README.md
└── ...
```

---

## 🔍 Debug y Logging

### Frontend

```bash
# Ejecutar con logs
npm run dev

# En el navegador: Abrir DevTools (F12)
# Pestaña Console para ver logs
```

### Backend

```bash
# Logs de Django
# Se muestran automáticamente en la terminal

# Ver todas las requests
# Agregar middleware en settings.py si es necesario
```

---

## 📡 API Reference

### Restaurantes

```bash
# GET todos
curl http://127.0.0.1:8000/api/v1/restaurantes/

# POST crear
curl -X POST http://127.0.0.1:8000/api/v1/restaurantes/ \
  -H "Content-Type: application/json" \
  -d '{
    "id_restaurante": "REST001",
    "nombre": "Mi Restaurante",
    "direccion": "Av Principal 123",
    "telefono": "+56912345678",
    "email": "info@restaurant.cl",
    "tiempo_promedio_preparacion": 30
  }'

# GET uno
curl http://127.0.0.1:8000/api/v1/restaurantes/REST001/

# PUT actualizar
curl -X PUT http://127.0.0.1:8000/api/v1/restaurantes/REST001/ \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Nuevo nombre"}'

# DELETE eliminar
curl -X DELETE http://127.0.0.1:8000/api/v1/restaurantes/REST001/
```

### Platos

```bash
# GET todos
curl http://127.0.0.1:8000/api/v1/platos/

# Filtrar por restaurante
curl http://127.0.0.1:8000/api/v1/platos/?restaurante_id=REST001

# POST crear
curl -X POST http://127.0.0.1:8000/api/v1/platos/ \
  -H "Content-Type: application/json" \
  -d '{
    "restaurante": "REST001",
    "nombre": "Pizza Margherita",
    "descripcion": "Pizza clásica",
    "precio": 12.99,
    "tiempo_preparacion": 15,
    "ingredientes": "tomate, queso, albahaca"
  }'
```

---

## 📦 Build para Producción

### Frontend Build

```bash
cd frontend
npm run build
# Genera carpeta 'dist/' lista para deploy
```

### Django Collectstatic

```bash
python manage.py collectstatic --noinput
```

---

## 🚀 Deploy

### Opción 1: Misma máquina

```bash
# Django (Gunicorn)
pip install gunicorn
gunicorn config.wsgi --bind 0.0.0.0:8000

# React (Nginx)
npm run build
# Servir dist/ con Nginx
```

### Opción 2: Servidores separados

- **Backend:** Deploy Django en Heroku/AWS/DigitalOcean
- **Frontend:** Deploy React en Vercel/Netlify
- Configurar CORS en Django para el dominio del frontend

---

## ✅ Checklist de Verificación

- [ ] Python 3.9+ instalado: `python --version`
- [ ] Node 16+ instalado: `node --version`
- [ ] Dependencias instaladas: `pip list` y `npm list`
- [ ] Base de datos migrada: `python manage.py showmigrations`
- [ ] Django levantado: `python manage.py runserver`
- [ ] React levantado: `npm run dev`
- [ ] Frontend accesible: http://localhost:5173
- [ ] API accesible: http://127.0.0.1:8000/api/v1/restaurantes/
- [ ] CORS funcionando (sin errores en console)
- [ ] Crear restaurante funciona
- [ ] Listar restaurantes funciona

---

## 📚 Documentación

- **Backend:** Ver [config/settings.py](config/settings.py) y [Aplicaciones/Restaurantes/README.md](Aplicaciones/Restaurantes/README.md)
- **Frontend:** Ver [frontend/README.md](frontend/README.md)
- **API:** Ver docstring en [Aplicaciones/Restaurantes/api_views.py](Aplicaciones/Restaurantes/api_views.py)

---

## 🆘 Soporte

Si hay problemas:

1. Verificar que ambos servidores están corriendo
2. Ver logs en ambas terminales
3. Abrir DevTools en el navegador (F12)
4. Verificar CORS en `config/settings.py`
5. Reiniciar ambos servidores

---

**Versión:** 1.0.0
**Actualizado:** Abril 15, 2026
**Status:** ✅ Funcional
