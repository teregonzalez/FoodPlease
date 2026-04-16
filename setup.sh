{"python3"}
# Script de Setup Inicial para FoodPlease CRUD

echo "================================"
echo "FoodPlease - Configuración Inicial"
echo "================================"

# Paso 1: Instalar Django
echo "📦 Instalando Django..."
pip install django

# Paso 2: Verificar instalación
echo "✅ Verificando instalación..."
python -m django --version

# Paso 3: Aplicar migraciones de Django
echo "🗄️  Aplicando migraciones de Django..."
python manage.py migrate

# Paso 4: Crear migraciones para Restaurantes
echo "📝 Creando migraciones para app Restaurantes..."
python manage.py makemigrations Aplicaciones.Restaurantes

# Paso 5: Aplicar migraciones de Restaurantes
echo "🔄 Aplicando migraciones de Restaurantes..."
python manage.py migrate Aplicaciones.Restaurantes

# Paso 6: Crear superusuario
echo "👤 Creando superuser (admin)..."
python manage.py createsuperuser

# Paso 7: Verificar setup
echo "🔍 Verificando base de datos..."
python manage.py dbshell

# Paso 8: Iniciar servidor
echo ""
echo "🚀 Iniciando servidor Django..."
echo "Acceder a: http://127.0.0.1:8000"
echo ""
python manage.py runserver

