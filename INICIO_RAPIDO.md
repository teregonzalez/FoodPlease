# 🚀 INICIO RÁPIDO - FoodPlease CRUD

**Tiempo estimado: 2 minutos**

## 1️⃣ Instalar dependencias

```bash
pip install -r requirements_new.txt
```

## 2️⃣ Inicializar Base de Datos

```bash
python init_db.py
```

## 3️⃣ Ejecutar Servidor

```bash
python run.py
```

## 4️⃣ Abrir en Navegador

- **API:** http://127.0.0.1:5000
- **Frontend:** http://localhost:5173 (en otra terminal: `cd frontend && npm run dev`)

---

## 📝 Prueba Rápida

### Backend (Terminal 1)
```bash
python run.py
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install  # Solo la primera vez
npm run dev
```

### Verificar en navegador
1. Ve a http://localhost:5173
2. Deberías ver el panel de administración
3. Prueba las funcionalidades de crear, editar y eliminar restaurantes/platos
5. Haz clic en "Ver Menú" para agregar platos

---

## ⚠️ Problemas Comunes

### ❌ `django not found`
```bash
source venv/bin/activate  # Unix
.\venv\Scripts\Activate.ps1  # Windows
pip install django
```

### ❌ `No such table: Restaurantes`
```bash
python manage.py migrate Aplicaciones.Restaurantes
```

### ❌ `Port 8000 already in use`
```bash
python manage.py runserver 8001
```

---

## 📚 Próximos Pasos

1. Lee [README_FOODPLEASE.md](README_FOODPLEASE.md) para análisis completo
2. Explora [ARQUITECTURA.md](ARQUITECTURA.md) para detalles técnicos
3. Revisa [DESPLIEGUE.md](DESPLIEGUE.md) para producción

---

**¡Listo! Ahora tienes un CRUD funcional para FoodPlease 🎉**
