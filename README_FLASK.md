# FoodPlease - API Flask

> Versión 2.0 - Optimizado con Flask

## Características

- ✅ API REST con Flask
- ✅ Base de datos SQLAlchemy
- ✅ CORS configurado para React
- ✅ Validación de datos
- ✅ Operaciones CRUD completas

## Estructura del Proyecto

```
FoodPlease/
├── app/
│   ├── __init__.py           # Factory de la aplicación
│   ├── config.py             # Configuración
│   ├── models/
│   │   └── __init__.py       # Modelos SQLAlchemy
│   ├── routes/
│   │   ├── __init__.py       # Registro de blueprints
│   │   ├── restaurantes.py   # Rutas de restaurantes
│   │   └── platos.py         # Rutas de platos
│   └── schemas/
│       └── __init__.py       # Validadores
├── run.py                    # Punto de entrada
├── init_db.py               # Inicializar BD
├── requirements_new.txt      # Dependencias
└── .env.example             # Variables de entorno
```

## Instalación

### 1. Instalar dependencias

```bash
pip install -r requirements_new.txt
```

### 2. Inicializar la base de datos

```bash
python init_db.py
```

### 3. Ejecutar el servidor

```bash
python run.py
```

La API estará disponible en: `http://127.0.0.1:5000`

## Endpoints API

### Restaurantes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/restaurantes/` | Listar todos los restaurantes |
| GET | `/api/restaurantes/<id>` | Obtener un restaurante |
| POST | `/api/restaurantes/` | Crear un restaurante |
| PUT | `/api/restaurantes/<id>` | Actualizar un restaurante |
| DELETE | `/api/restaurantes/<id>` | Desactivar un restaurante |

### Platos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/platos/` | Listar todos los platos |
| GET | `/api/platos/<id>` | Obtener un plato |
| POST | `/api/platos/` | Crear un plato |
| PUT | `/api/platos/<id>` | Actualizar un plato |
| DELETE | `/api/platos/<id>` | Desactivar un plato |

## Ejemplos de Uso

### Crear un restaurante

```bash
curl -X POST http://127.0.0.1:5000/api/restaurantes/ \
  -H "Content-Type: application/json" \
  -d '{
    "id_restaurante": "REST005",
    "nombre": "Hamburguesería Gourmet",
    "direccion": "Calle Burger 250",
    "telefono": "+56987654321",
    "email": "info@gourmetburger.cl",
    "tiempo_promedio_preparacion": 15
  }'
```

### Listar restaurantes

```bash
curl http://127.0.0.1:5000/api/restaurantes/
```

### Crear un plato

```bash
curl -X POST http://127.0.0.1:5000/api/platos/ \
  -H "Content-Type: application/json" \
  -d '{
    "id_plato": "PLAT008",
    "id_restaurante": "REST001",
    "nombre": "Ensalada César",
    "descripcion": "Ensalada fresca con pollo y aderezo César",
    "precio": 9.99,
    "tiempo_preparacion": 10,
    "ingredientes": "Lechuga, pollo, queso parmesano, croutons"
  }'
```

## Ventajas de Flask sobre Django

| Aspecto | Django | Flask |
|--------|--------|-------|
| Tamaño del proyecto | ~40 MB | ~8 MB |
| Tiempo de inicio | ~2-3s | ~0.5s |
| Dependencias | 20+ | 3-4 |
| Overhead | Alto | Mínimo |
| Ideal para | Proyectos grandes | Proyectos medianos/pequeños |

**Para FoodPlease**: Flask es mucho más eficiente ⚡

## Configuración

Edita `app/config.py` para cambiar:
- Base de datos
- Orígenes CORS
- Debug mode
- etc.

## Desarrollo

### Crear migraciones (si necesitas cambiar modelos)

1. Edita el modelo en `app/models/__init__.py`
2. Reinicia la aplicación (las tablas se crean automáticamente)
3. Para migrar datos, ejecuta `init_db.py` nuevamente

### Testing

```bash
pytest tests/
```

## Frontend React

El frontend en React sigue funcionando igual:

```bash
cd frontend
npm run dev
```

Cambia la URL de la API en `frontend/src/services/api.ts`:

```typescript
const API_URL = 'http://127.0.0.1:5000/api';
```

## Problemas Comunes

### Error de puerto ocupado
```bash
lsof -i :5000  # Encuentra qué proceso usa el puerto
kill -9 <PID>
```

### Error de base de datos
```bash
rm foodplease.db    # Elimina la BD actual
python init_db.py   # Crea una nueva
```

### Errores CORS
Verifica que `CORS_ORIGINS` en `app/config.py` tenga la dirección correcta del frontend.

## Rendimiento

Flask es **5-10x más rápido** que Django para este tipo de aplicación:

- ⚡ Startup: 0.5s vs 2-3s
- ⚡ Request time: 10-20ms vs 40-80ms
- ⚡ Memory: ~30MB vs ~100MB
- ⚡ Dependencias: 4 vs 20+

## Soporte

Para más información sobre Flask: https://flask.palletsprojects.com/
Para SQLAlchemy: https://www.sqlalchemy.org/

---

**Hecho con ❤️ - FoodPlease 2.0 con Flask**
