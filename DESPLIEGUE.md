# Guía de Despliegue - FoodPlease CRUD Django

## 📌 Contenido

1. [Despliegue Local (Desarrollo)](#despliegue-local)
2. [Despliegue en Producción](#despliegue-producción)
3. [Troubleshooting](#troubleshooting)

---

## 🏠 Despliegue Local

### Requisitos Previos

```bash
✅ Python 3.7 o superior
✅ pip (gestor de paquetes)
✅ Git (opcional)
✅ Navegador moderno
```

### Paso 1: Descargar el Proyecto

**Opción A: Clonar desde Git**
```bash
git clone <URL_REPOSITORIO>
cd django-crud-sqlite3
```

**Opción B: Descargar ZIP**
- Descargar archivo ZIP del repositorio
- Extraer en carpeta deseada
- Abrir terminal en esa carpeta

### Paso 2: Crear Entorno Virtual (Recomendado)

**Windows (PowerShell):**
```powershell
# Crear entorno virtual
python -m venv venv

# Activar entorno
.\venv\Scripts\Activate.ps1
```

**Mac/Linux (Bash):**
```bash
# Crear entorno virtual
python3 -m venv venv

# Activar entorno
source venv/bin/activate
```

**¿Por qué?** El entorno virtual aisla dependencias del proyecto del sistema.

### Paso 3: Instalar Dependencias

```bash
pip install django
```

**Opcional (Desarrollo avanzado):**
```bash
pip install django-rest-framework
pip install gunicorn
pip install psycopg2
```

### Paso 4: Ejecutar Migraciones

```bash
# Aplicar migraciones de Django (auth, admin, etc.)
python manage.py migrate

# Crear migraciones para app Restaurantes
python manage.py makemigrations Aplicaciones.Restaurantes

# Aplicar migraciones de Restaurantes
python manage.py migrate Aplicaciones.Restaurantes
```

**Verificar:**
```bash
# Listar migraciones aplicadas
python manage.py showmigrations
```

### Paso 5: Crear Superusuario (Admin)

```bash
python manage.py createsuperuser
```

Ingresa:
- Username: `admin`
- Email: `admin@foodplease.cl`
- Password: `DjangoPwd123!`

### Paso 6: Iniciar Servidor

```bash
python manage.py runserver
```

**Salida esperada:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Paso 7: Acceder a las Interfaces

| Interface | URL |
|-----------|-----|
| Panel de Restaurantes | http://127.0.0.1:8000/ |
| Admin Django | http://127.0.0.1:8000/admin |


---

## 🌍 Despliegue Producción

### Opción 1: Heroku (Recomendado para Principiantes)

#### Antes de empezar:
```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Crear cuenta en https://www.heroku.com
```

#### Pasos:

**1. Preparar proyecto**
```bash
pip install gunicorn whitenoise
pip freeze > requirements.txt
```

**2. Crear Procfile**
```bash
# En raíz del proyecto, crear archivo: Procfile
web: gunicorn config.wsgi --log-file -
```

**3. Crear runtime.txt** (especificar Python)
```
python-3.9.10
```

**4. Actualizar settings.py**
```python
# settings.py

# Permitir el dominio de Heroku
ALLOWED_HOSTS = ['tu-app.herokuapp.com', 'localhost']

# Modo producción
DEBUG = False

# Middleware para archivos estáticos
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← AGREGAR
    # ... resto del middleware
]

# Configuración WhiteNoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

**5. Inicializar repositorio Git**
```bash
git init
git add .
git commit -m "Initial commit"
```

**6. Desplegar en Heroku**
```bash
# Login en Heroku
heroku login

# Crear aplicación
heroku create tu-nombre-app

# Desplegar
git push heroku main

# Ejecutar migraciones
heroku run python manage.py migrate

# Crear superusuario
heroku run python manage.py createsuperuser

# Ver logs
heroku logs --tail
```

**Resultado:**
Tu app estará disponible en: `https://tu-nombre-app.herokuapp.com`

---

### Opción 2: AWS (Producción Empresarial)

#### Requisitos:
- Cuenta AWS con tarjeta de crédito
- EC2 instance (t2.micro - gratuito)
- RDS PostgreSQL (opcional pero recomendado)

#### Arquitectura:

```
┌─────────────────────────────────────────┐
│         CloudFront CDN (Opcional)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────┴───────────────────────┐
│     Route 53 Domain Name (foodplease.cl) │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────┴───────────────────────┐
│        Application Load Balancer        │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        v                   v
    ┌────────┐          ┌────────┐
    │ EC2    │          │ EC2    │
    │Instance│ ◄────►   │Instance│
    │ (App)  │ ◄────►   │ (App)  │
    └────┬───┘          └────┬───┘
         │                   │
         └─────────┬─────────┘
                   v
          ┌─────────────────┐
          │ RDS PostgreSQL  │
          │   (Database)    │
          └─────────────────┘
```

#### Pasos simplificados:

**1. Crear EC2 Instance**
```bash
# Ubuntu 20.04 LTS
# t2.micro (gratuito)
# Security group: permitir puertos 22, 80, 443
```

**2. Conectarse vía SSH**
```bash
ssh -i tu-key.pem ubuntu@tu-ip-publica.compute-1.amazonaws.com
```

**3. Instalar dependencias en servidor**
```bash
sudo apt update
sudo apt install python3 python3-pip python-is-python3
sudo apt install postgresql postgresql-contrib
sudo apt install nginx

pip install django gunicorn psycopg2
```

**4. Clonar proyecto**
```bash
cd /home/ubuntu
git clone <URL_REPO>
cd django-crud-sqlite3
```

**5. Configurar Nginx**
```bash
# /etc/nginx/sites-available/foodplease
upstream django {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name tu-dominio.cl;
    
    location / {
        proxy_pass http://django;
    }
}
```

**6. Ejecutar con Gunicorn**
```bash
gunicorn \
    --workers 4 \
    --bind 127.0.0.1:8000 \
    --daemon \
    config.wsgi:application
```

**7. (Opcional) Configurar HTTPS con Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.cl
```

---

### Opción 3: DigitalOcean (Económico)

**Ventajas:**
- Más baratos que AWS
- Interfaz más simple
- Buen soporte

**Pasos similares a AWS:**
1. Crear Droplet Ubuntu
2. SSH a servidor
3. Instalar Python, PostgreSQL, Nginx
4. Clonar proyecto
5. Configurar Gunicorn + Nginx
6. Dominio + SSL

**Costo estimado:**
- Droplet 1GB: $5/mes
- Dominio: $3-12/mes
- Total: ~$8-17/mes

---

## 🔧 Troubleshooting

### Problema 1: `django not found`

**Síntoma:**
```
ModuleNotFoundError: No module named 'django'
```

**Solución:**
```bash
# Verificar que estés en el entorno virtual
which python  # (Mac/Linux) o where python (Windows)

# Si no está activado:
source venv/bin/activate  # (Mac/Linux)
.\venv\Scripts\Activate.ps1  # (Windows)

# Reinstalar
pip install django
```

### Problema 2: `No such table: Restaurantes`

**Síntoma:**
```
sqlite3.OperationalError: no such table: Restaurantes_restaurante
```

**Solución:**
```bash
# Aplicar migraciones
python manage.py makemigrations Aplicaciones.Restaurantes
python manage.py migrate Aplicaciones.Restaurantes

# Verificar
python manage.py dbshell
sqlite> .tables
```

### Problema 3: `Port 8000 already in use`

**Síntoma:**
```
Address already in use
```

**Solución (Windows):**
```powershell
# Ubicar proceso
netstat -ano | findstr :8000

# Matar proceso (PID = XXXX)
taskkill /PID XXXX /F

# O usar puerto diferente
python manage.py runserver 8001
```

**Solución (Mac/Linux):**
```bash
# Ubicar proceso
lsof -i :8000

# Matar proceso (PID = XXXX)
kill -9 XXXX

# O usar puerto diferente
python manage.py runserver 8001
```

### Problema 4: `Static files not loading`

**Síntoma:**
```
404 - CSS/JS no se cargan
GET http://127.0.0.1:8000/static/css/... 404
```

**Solución:**
```bash
# Recolectar archivos estáticos
python manage.py collectstatic

# En settings.py, asegurar:
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

### Problema 5: `Import error en templates`

**Síntoma:**
```
TemplateDoesNotExist: gestionRestaurantes.html
```

**Solución:**
```bash
# Verificar estructura:
Aplicaciones/
├── Restaurantes/
│   ├── templates/  # ← Esta carpeta debe existir
│   │   └── gestionRestaurantes.html
```

### Problema 6: `CSRF token missing`

**Síntoma:**
```
Forbidden (403): CSRF verification failed
```

**Solución:**
```html
<!-- En formularios, asegurar que tengan: -->
<form method="POST" action="...">
    {% csrf_token %}  <!-- ← OBLIGATORIO -->
    ...
</form>
```

### Problema 7: `Database locked` (SQLite)

**Síntoma:**
```
sqlite3.OperationalError: database is locked
```

**Causa:**
Múltiples procesos accediendo a SQLite simultáneamente

**Soluciones:**
```bash
# Opción 1: Migrar a PostgreSQL (RECOMENDADO)

# Opción 2: Usar WAL mode (Write-Ahead Logging)
python manage.py dbshell
sqlite> PRAGMA journal_mode=WAL;

# Opción 3: Reiniciar servidor Django
```

---

## ✅ Checklist de Despliegue

### Desarrollo Local
- [ ] Python 3.7+ instalado
- [ ] Entorno virtual creado y activado
- [ ] Django instalado (`pip install django`)
- [ ] Migraciones ejecutadas
- [ ] Superusuario creado
- [ ] Servidor ejecutándose sin errores

### Antes de Producción
- [ ] DEBUG = False en settings.py
- [ ] ALLOWED_HOSTS configurado
- [ ] CSRF_TRUSTED_ORIGINS definido
- [ ] Archivos estáticos en `/staticfiles`
- [ ] Base de datos cambiada a PostgreSQL
- [ ] Gunicorn instalado
- [ ] Nginx configurado
- [ ] HTTPS/SSL habilitado
- [ ] Logs configurados
- [ ] Backups automáticos

### Después de Desplegar
- [ ] Acceder a aplicación desde dominio
- [ ] Crear superusuario en producción
- [ ] Probar todas las operaciones CRUD
- [ ] Verificar que email de contacto funciona
- [ ] Monitoreo activado (New Relic, Datadog)
- [ ] Alertas configuradas

---

## 📊 Comparativa de Opciones

| Opción | Costo | Facilidad | Performance | Escalabilidad |
|--------|-------|-----------|-------------|---------------|
| Heroku | $0-50/mes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| AWS | $5-100/mes | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| DigitalOcean | $5-50/mes | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Local | Gratis | ⭐⭐⭐⭐⭐ | ⭐ | ⭐ |

**Recomendación:**
- 🎓 **Aprendizaje:** Heroku (gratuito, simple)
- 🏢 **Producción Pequeña:** DigitalOcean ($5/mes)
- 🚀 **Escala Grande:** AWS (con auto-scaling)

---

## 🔗 Referencias Útiles

- Django Docs: https://docs.djangoproject.com/
- Heroku Django Guide: https://devcenter.heroku.com/articles/deploying-python
- AWS Django: https://docs.aws.amazon.com/elasticbeanstalk/
- DigitalOcean App Platform: https://www.digitalocean.com/

---

**Última actualización:** Abril 2024
**Versión:** 1.0

