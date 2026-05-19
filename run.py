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
    # Render asigna un puerto dinámico mediante la variable de entorno PORT.
    # Si no la encuentra (como en tu PC local), usará el 5000.
    port = int(os.environ.get('PORT', 5000))
    
    # host='0.0.0.0' es obligatorio para que funcione en la nube
    app.run(host='0.0.0.0', port=port)
