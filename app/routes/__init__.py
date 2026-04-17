"""
Registra los blueprints de rutas
"""
from app.routes.restaurantes import restaurantes_bp
from app.routes.platos import platos_bp


def register_routes(app):
    """Registra todos los blueprints en la aplicación"""
    app.register_blueprint(restaurantes_bp)
    app.register_blueprint(platos_bp)
