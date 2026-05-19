# 🍕 FoodPlease - CRUD de Gestión de Restaurantes

**Una guía de implementación funcional de un CRUD web para la plataforma de delivery FoodPlease.**

CRUD completo con **Python, Flask y SQLite3**, usando arquitectura **REST API** con SQLAlchemy ORM, **React** con Tailwind CSS para interfaz moderna y control de estado con TypeScript.

## ✨ Características Principales

- ✅ CRUD completo de Restaurantes y Menú (Platos)
- ✅ Interfaz moderna con React y Tailwind CSS
- ✅ Base de datos relacional (1:N)
- ✅ Validaciones en cliente y servidor
- ✅ API REST con Flask y SQLAlchemy
- ✅ Documentación completa para FoodPlease
- ✅ Lista para extensiones futuras

## 📚 Documentación Disponible

Este proyecto incluye **4 guías completas** para implementación y extensión:

| Documento | Contenido |
|-----------|----------|
| **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** | 🚀 Cómo comenzar en 5 minutos |
| **[README_FOODPLEASE.md](README_FOODPLEASE.md)** | 📖 Análisis CRUD y relación con FoodPlease |
| **[ARQUITECTURA.md](ARQUITECTURA.md)** | 🏗️ Análisis técnico y flujos de datos |
| **[DESPLIEGUE.md](DESPLIEGUE.md)** | 🌍 Despliegue local y producción |

---

## 🚀 Inicio Rápido

```bash
# 1. Crear entorno virtual
python -m venv .venv
.venv\Scripts\activate

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Ejecutar servidor Flask
python run.py
```

Accede a: **http://127.0.0.1:5173** (Frontend) y **http://127.0.0.1:5000** (Backend API)

> 💡 Para instrucciones detalladas, consulta [INICIO_RAPIDO.md](INICIO_RAPIDO.md)

---

## 📊 Estructura del Proyecto

```
FoodPlease/
├── Aplicaciones/
│   └── Restaurantes/        # CRUD de Restaurantes y Platos
│       ├── models.py        # Modelos: Restaurante, Plato
│       ├── views.py         # Vistas CRUD completas
│       ├── urls.py
│       ├── templates/       # HTML responsivo
│       └── static/          # CSS y JS personalizado
├── config/                  # Configuración Django
├── manage.py                # Comando principal
│
├── README_FOODPLEASE.md     # Guía principal de FoodPlease
├── ARQUITECTURA.md          # Análisis técnico detallado
├── DESPLIEGUE.md            # Guía de producción
└── INICIO_RAPIDO.md         # Quick start (5 min)
```

---

## 🎯 Modelos de Datos

### Restaurante
```python
- id_restaurante (PK)
- nombre
- direccion
- telefono
- email
- tiempo_promedio_preparacion
- activo
- fecha_registro
```

### Plato
```python
- id_plato (PK)
- restaurante (FK) ← Relación 1:N
- nombre
- descripcion
- precio
- tiempo_preparacion
- ingredientes
- disponible
- fecha_creacion
```

---

## 🔄 Operaciones CRUD Implementadas

| Operación | Ruta | Método |
|-----------|------|--------|
| **CREATE** | `/registrar/` | POST |
| **READ** | `/` | GET |
| **UPDATE** | `/edicion/<id>` → `/editar/` | GET → POST |
| **DELETE** | `/eliminar/<id>` | GET |

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Backend | Flask |
| BD | SQLite3 |
| Frontend | HTML5 + Bootstrap 4 |
| Estilos | CSS3 Personalizado |
| Interactividad | JavaScript ES6 |

---

## 🎓 Relación con FoodPlease

Este CRUD implementa los siguientes componentes de la propuesta FoodPlease:

| Componente | Estado |
|-----------|--------|
| Panel Web - Restaurante | ✅ 100% |
| Gestión de Menú | ✅ 100% |
| Panel Admin | ✅ Básico |
| Gestión de Pedidos | ⏳ Próximo |
| Autenticación Multi-rol | ⏳ Próximo |
| Notificaciones RT | ⏳ Futuro |
| Pagos | ⏳ Futuro |
| Geolocalización | ⏳ Futuro |

---

## 💡 Próximos Pasos (Hoja de Ruta)

**Fase 1 (Sprint 1):**
- [ ] Agregar modelo `Usuario` con roles
- [ ] Implementar modelo `Pedido`
- [ ] Autenticación personalizada

**Fase 2 (Sprint 2-3):**
- [ ] API REST con Flask REST Framework
- [ ] Agregar modelo `Cliente` y `Repartidor`
- [ ] Integración Google Maps

**Fase 3 (Sprint 4+):**
- [ ] WebSockets para tracking
- [ ] Pagos con Transbank
- [ ] Notificaciones push Firebase

---

## ⚠️ Limitaciones Conocidas

- SQLite3 no escala para producción (usar PostgreSQL)
- Sin autenticación de usuarios actualmente
- No implementa API REST (versión web únicamente)
- Sin pruebas unitarias (tests.py vacío)

---

## 📖 Documentación Original

Proyecto base de: Oscar García

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Oscar_Garcia-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=101010)](https://pe.linkedin.com/in/uskokrum2010)
[![YouTube](https://img.shields.io/badge/YouTube-UskoKruM2010-FF0000?style=for-the-badge&logo=youtube&logoColor=white&labelColor=101010)](https://youtube.com/uskokrum2010)
[![Email](https://img.shields.io/badge/uskokrum2010@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=101010)](mailto:uskokrum2010@gmail.com)

### Adaptado para FoodPlease | 2024
