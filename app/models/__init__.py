"""
Modelos SQLAlchemy para FoodPlease
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Restaurante(db.Model):
    """
    Modelo Restaurante - Representa a los restaurantes participantes en la plataforma FoodPlease
    Campos clave para el sector gastronómico
    """
    __tablename__ = 'Restaurantes'
    
    id_restaurante = db.Column(db.String(10), primary_key=True, nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(150), nullable=False)
    telefono = db.Column(db.String(12), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    tiempo_promedio_preparacion = db.Column(db.Integer, default=30, nullable=False)
    activo = db.Column(db.Boolean, default=True, nullable=False)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    # Relación con Platos
    platos = db.relationship('Plato', backref='restaurante', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convierte el modelo a diccionario"""
        return {
            'id_restaurante': self.id_restaurante,
            'nombre': self.nombre,
            'direccion': self.direccion,
            'telefono': self.telefono,
            'email': self.email,
            'tiempo_promedio_preparacion': self.tiempo_promedio_preparacion,
            'activo': self.activo,
            'fecha_registro': self.fecha_registro.isoformat() if self.fecha_registro else None
        }
    
    def __repr__(self):
        return f'<Restaurante {self.nombre}>'


class Plato(db.Model):
    """
    Modelo Plato - Representa los platos/menú disponibles en cada restaurante
    Permite gestionar el catálogo de ofertas de cada local
    """
    __tablename__ = 'Platos'
    
    id_plato = db.Column(db.String(10), primary_key=True, nullable=False)
    id_restaurante = db.Column(db.String(10), db.ForeignKey('Restaurantes.id_restaurante'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(300), nullable=False)
    precio = db.Column(db.Numeric(8, 2), nullable=False)
    tiempo_preparacion = db.Column(db.Integer, default=15, nullable=False)
    ingredientes = db.Column(db.String(200), nullable=False)
    disponible = db.Column(db.Boolean, default=True, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def to_dict(self):
        """Convierte el modelo a diccionario"""
        return {
            'id_plato': self.id_plato,
            'id_restaurante': self.id_restaurante,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': float(self.precio),
            'tiempo_preparacion': self.tiempo_preparacion,
            'ingredientes': self.ingredientes,
            'disponible': self.disponible,
            'fecha_creacion': self.fecha_creacion.isoformat() if self.fecha_creacion else None
        }
    
    def __repr__(self):
        return f'<Plato {self.nombre}>'
