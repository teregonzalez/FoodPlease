"""
Factory para crear la aplicación Flask
"""
import os
from flask import Flask, request
from flask_cors import CORS
from app.config import config
from app.models import db
from app.routes import register_routes


def create_app(config_name=None):
    """
    Factory para crear y configurar la aplicación Flask
    
    Args:
        config_name: Nombre de la configuración (development, production, testing)
    """
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    
    # Cargar configuración
    app.config.from_object(config.get(config_name, config['default']))
    
    # Inicializar base de datos
    db.init_app(app)
    
    # Configurar CORS con handlers
    allowed_origins = [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ]
    
    @app.before_request
    def handle_preflight():
        """Maneja preflight OPTIONS requests"""
        if request.method == 'OPTIONS':
            response = app.make_default_options_response()
            origin = request.headers.get('Origin')
            if origin in allowed_origins:
                response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
            response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
            response.headers['Access-Control-Max-Age'] = '3600'
            return response, 200
    
    @app.after_request
    def after_request(response):
        """Añade CORS headers a todas las respuestas"""
        origin = request.headers.get('Origin')
        if origin in allowed_origins:
            response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
        response.headers['Access-Control-Max-Age'] = '3600'
        return response
    
    # Registrar rutas
    register_routes(app)
    
    # Crear contexto de aplicación y tablas
    with app.app_context():
        db.create_all()
    
    # Rutas básicas
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Verifica el estado de la API"""
        return {'status': 'ok', 'message': 'FoodPlease API is running'}, 200
    
    @app.route('/', methods=['GET'])
    def index():
        """Ruta raíz"""
        return {
            'name': 'FoodPlease API',
            'version': '2.0',
            'framework': 'Flask',
            'endpoints': {
                'restaurantes': '/api/restaurantes',
                'platos': '/api/platos',
                'health': '/api/health'
            }
        }, 200
    
    return app
