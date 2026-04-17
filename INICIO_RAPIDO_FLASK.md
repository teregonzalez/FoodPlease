# 🚀 INICIO RÁPIDO - FoodPlease CRUD con Flask

**Tiempo estimado: 2 minutos**

## 1️⃣ Activar entorno virtual

### Windows (PowerShell)
```bash
.venv\Scripts\Activate
```

### Linux/Mac
```bash
source .venv/bin/activate
```

## 2️⃣ Instalar dependencias

```bash
pip install -r requirements_new.txt
```

## 3️⃣ Inicializar Base de Datos

```bash
python init_db.py
```

Deberías ver:
```
[*] Eliminando tablas existentes...
[*] Creando tablas...
[+] Insertando datos de ejemplo...
[OK] Se crearon 3 restaurantes
[OK] Se crearon 6 platos
[SUCCESS] Base de datos inicializada correctamente!
```

## 4️⃣ Ejecutar Servidor Flask

```bash
python run.py
```

Deberías ver:
```
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

## 5️⃣ Probar la API

### En otra terminal (con el venv activado):

**Listar restaurantes:**
```bash
curl http://127.0.0.1:5000/api/restaurantes/
```

**Obtener un restaurante:**
```bash
curl http://127.0.0.1:5000/api/restaurantes/REST001
```

**Crear un restaurante:**
```bash
curl -X POST http://127.0.0.1:5000/api/restaurantes/ \
  -H "Content-Type: application/json" \
  -d '{
    "id_restaurante": "REST099",
    "nombre": "Mi Nuevo Restaurante",
    "direccion": "Calle Test 999",
    "telefono": "+56999999999",
    "email": "test@restaurant.cl",
    "tiempo_promedio_preparacion": 25
  }'
```

## 6️⃣ Ejecutar Frontend React

En otra terminal (carpeta `frontend`):

```bash
npm run dev
```

Abre: http://localhost:5173

## 📊 Endpoints Disponibles

### Base
- `GET /` - Info de la API
- `GET /api/health` - Health check

### Restaurantes
- `GET /api/restaurantes/` - Listar todos
- `GET /api/restaurantes/<id>` - Obtener uno
- `POST /api/restaurantes/` - Crear
- `PUT /api/restaurantes/<id>` - Actualizar
- `DELETE /api/restaurantes/<id>` - Eliminar

### Platos
- `GET /api/platos/` - Listar todos
- `GET /api/platos/<id>` - Obtener uno
- `POST /api/platos/` - Crear
- `PUT /api/platos/<id>` - Actualizar
- `DELETE /api/platos/<id>` - Eliminar

## ✨ Características

✅ API REST completa  
✅ CRUD de Restaurantes y Platos  
✅ Base de datos SQLite integrada  
✅ CORS configurado para React  
✅ Validación de datos  
✅ Health check endpoint  
✅ Respuestas JSON estructuradas  

## 🔧 Troubleshooting

### Puerto 5000 ocupado
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### Error de base de datos
```bash
rm foodplease.db
python init_db.py
```

### CORS error en React
Verifica que `CORS_ORIGINS` incluya `http://localhost:5173`

## 📚 Diferencias con Django

| Aspecto | Django | Flask |
|---------|--------|-------|
| Tiempo inicio | 2-3s | 0.5s |
| Líneas código | ~300 | ~200 |
| Dependencias | 20+ | 4 |
| Memory | ~100MB | ~30MB |
| Velocidad | Normal | ⚡ Rápido |

**Flask es más eficiente para proyectos pequeños/medianos.**

## 🎯 Próximos Pasos

1. ✅ API funcionando
2. ✅ Base de datos inicializada
3. 📝 Personaliza según tus necesidades
4. 🚀 Despliega en producción

## 📖 Documentación Completa

Ver: `README_FLASK.md`

---

**¿Necesitas ayuda?**  
Revisa la documentación de Flask: https://flask.palletsprojects.com/
