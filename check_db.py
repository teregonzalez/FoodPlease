#!/usr/bin/env python
"""Script para verificar los restaurantes en la BD"""
from app import create_app
from app.models import Restaurante

app = create_app()

with app.app_context():
    restaurantes = Restaurante.query.all()
    print(f"\nTotal de restaurantes: {len(restaurantes)}\n")
    for r in restaurantes:
        print(f"ID: '{r.id_restaurante}' | Nombre: '{r.nombre}' | Activo: {r.activo}")
