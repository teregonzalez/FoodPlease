#!/usr/bin/env python
"""
Script para inicializar la base de datos de FoodPlease con datos de ejemplo
"""
import os
import sys
from app import create_app
from app.models import db, Restaurante, Plato

def init_db():
    """Inicializa la base de datos con datos de ejemplo"""
    app = create_app('development')
    
    with app.app_context():
        # Eliminar todas las tablas (cuidado en producción)
        print('[*] Eliminando tablas existentes...')
        db.drop_all()
        
        # Crear todas las tablas
        print('[*] Creando tablas...')
        db.create_all()
        
        # Datos de ejemplo
        print('[+] Insertando datos de ejemplo...')
        
        # Crear restaurantes
        restaurantes = [
            Restaurante(
                id_restaurante='REST001',
                nombre='El Buen Sabor',
                direccion='Calle Principal 123',
                telefono='+56912345678',
                email='contacto@buensabor.cl',
                tiempo_promedio_preparacion=30
            ),
            Restaurante(
                id_restaurante='REST002',
                nombre='La Parrilla Criolla',
                direccion='Av. Libertad 456',
                telefono='+56987654321',
                email='info@parilla.cl',
                tiempo_promedio_preparacion=25
            ),
            Restaurante(
                id_restaurante='REST003',
                nombre='Pizza & Pasta',
                direccion='Pasaje Comercial 789',
                telefono='+56934567890',
                email='reservas@pizzapasta.cl',
                tiempo_promedio_preparacion=20
            ),
        ]
        
        for r in restaurantes:
            db.session.add(r)
        
        db.session.commit()
        print(f'[OK] Se crearon {len(restaurantes)} restaurantes')
        
        # Crear platos
        platos = [
            # Platos El Buen Sabor
            Plato(
                id_plato='PLAT001',
                id_restaurante='REST001',
                nombre='Lomo a la Pimienta',
                descripcion='Exquisito lomo con salsa de pimienta, acompañado de puré y ensalada',
                precio=15.99,
                tiempo_preparacion=25,
                ingredientes='Lomo, pimienta negra, crema, papas, lechuga'
            ),
            Plato(
                id_plato='PLAT002',
                id_restaurante='REST001',
                nombre='Salmon a la Mantequilla',
                descripcion='Filete de salmón fresco a la mantequilla con limón',
                precio=18.50,
                tiempo_preparacion=20,
                ingredientes='Salmón, mantequilla, limón, espárragos'
            ),
            # Platos La Parrilla Criolla
            Plato(
                id_plato='PLAT003',
                id_restaurante='REST002',
                nombre='Costilla Asada',
                descripcion='Costilla a la parrilla con especias criollas',
                precio=14.99,
                tiempo_preparacion=30,
                ingredientes='Costilla de vacuno, ajo, comino, oregano'
            ),
            Plato(
                id_plato='PLAT004',
                id_restaurante='REST002',
                nombre='Choripán Casero',
                descripcion='Chorizo artesanal en pan tostado con salsa criolla',
                precio=8.99,
                tiempo_preparacion=10,
                ingredientes='Chorizo, pan, cebolla, tomate, cilantro'
            ),
            # Platos Pizza & Pasta
            Plato(
                id_plato='PLAT005',
                id_restaurante='REST003',
                nombre='Pizza Margherita',
                descripcion='Pizza tradicional con tomate, mozzarella y albahaca',
                precio=12.50,
                tiempo_preparacion=15,
                ingredientes='Harina, tomate, mozzarella, albahaca, aceite'
            ),
            Plato(
                id_plato='PLAT006',
                id_restaurante='REST003',
                nombre='Pasta Carbonara',
                descripcion='Pasta con salsa cremosa de huevo, tocino y queso parmesano',
                precio=11.99,
                tiempo_preparacion=12,
                ingredientes='Pasta, huevo, panceta, queso parmesano, pimienta'
            ),
        ]
        
        for p in platos:
            db.session.add(p)
        
        db.session.commit()
        print(f'[OK] Se crearon {len(platos)} platos')
        
        print('\n[SUCCESS] Base de datos inicializada correctamente!')
        print('\nPuedes acceder a la API en: http://127.0.0.1:5000')
        print('  - GET  /api/restaurantes         - Listar restaurantes')
        print('  - GET  /api/platos               - Listar platos')
        print('  - POST /api/restaurantes         - Crear restaurante')
        print('  - POST /api/platos               - Crear plato')


if __name__ == '__main__':
    try:
        init_db()
    except Exception as e:
        print(f'\n[ERROR] Error inicializando la base de datos: {e}')
        sys.exit(1)
