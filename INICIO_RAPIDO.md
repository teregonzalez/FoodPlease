# 🚀 INICIO RÁPIDO - FoodPlease CRUD

**Tiempo estimado: 5 minutos**

## 1️⃣ Instalar Django

```bash
pip install django
```

## 2️⃣ Crear Migraciones

```bash
python manage.py makemigrations Aplicaciones.Restaurantes
python manage.py migrate
```

## 3️⃣ Crear Admin

```bash
python manage.py createsuperuser
```
Ingresa credenciales (ej: usuario: `admin`, contraseña: `admin123`)

## 4️⃣ Ejecutar Servidor

```bash
python manage.py runserver
```

## 5️⃣ Abrir en Navegador

- **Panel de Restaurantes:** http://127.0.0.1:8000
- **Admin Django:** http://127.0.0.1:8000/admin (usa credenciales del paso 3)

---

## 📝 Prueba Rápida

1. Ve a http://127.0.0.1:8000
2. Llena el formulario para crear un restaurante:
   - ID: `REST001`
   - Nombre: `Mi Restaurante`
   - Dirección: `Calle Principal 123`
   - Teléfono: `+56912345678`
   - Email: `contacto@mirestaurante.cl`
   - Tiempo: `30` minutos

3. Haz clic en "Registrar Restaurante"
4. Deberías ver tu restaurante en la tabla
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
