"""
Configuración de la aplicación Flask
"""
import os
from datetime import timedelta


class Config:
    """Configuración base"""
    SQLALCHEMY_DATABASE_URI = 'sqlite:///foodplease.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS = False
    JSONIFY_PRETTYPRINT_REGULAR = True
    
    # CORS
    CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]
    
    # Session
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)


class DevelopmentConfig(Config):
    """Configuración de desarrollo"""
    DEBUG = True
    TESTING = False


class ProductionConfig(Config):
    """Configuración de producción"""
    DEBUG = False
    TESTING = False


class TestingConfig(Config):
    """Configuración de testing"""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
