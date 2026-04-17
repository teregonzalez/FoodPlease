#!/usr/bin/env python
"""
Script para ejecutar la aplicación Flask de FoodPlease
"""
import os
from app import create_app

# Configurar el entorno
os.environ.setdefault('FLASK_ENV', 'development')
os.environ.setdefault('FLASK_APP', 'run.py')

# Crear la aplicación
app = create_app()

if __name__ == '__main__':
    # Ejecutar el servidor
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
