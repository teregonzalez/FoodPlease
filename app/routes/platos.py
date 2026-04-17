"""
Rutas para Platos
"""
from flask import Blueprint, request, jsonify
from app.models import db, Plato, Restaurante
from app.schemas import PlatoSchema

platos_bp = Blueprint('platos', __name__, url_prefix='/api/platos')
platos_bp.strict_slashes = False


@platos_bp.route('/', methods=['GET'])
def listar_platos():
    """Lista todos los platos disponibles"""
    try:
        restaurante_id = request.args.get('restaurante_id')
        
        if restaurante_id:
            platos = Plato.query.filter_by(id_restaurante=restaurante_id, disponible=True).all()
        else:
            platos = Plato.query.filter_by(disponible=True).all()
        
        return jsonify([p.to_dict() for p in platos]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@platos_bp.route('/<id_plato>', methods=['GET'])
def obtener_plato(id_plato):
    """Obtiene un plato específico"""
    try:
        plato = Plato.query.get(id_plato)
        if not plato:
            return jsonify({'error': 'Plato no encontrado'}), 404
        return jsonify(plato.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@platos_bp.route('/', methods=['POST'])
def crear_plato():
    """Crea un nuevo plato"""
    try:
        import uuid
        data = request.get_json()
        
        # Validar datos
        errors = PlatoSchema.validate_plato(data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        # Obtener id_restaurante (puede venir como 'restaurante' o 'id_restaurante')
        id_restaurante = data.get('id_restaurante') or data.get('restaurante')
        if not id_restaurante:
            return jsonify({'error': 'id_restaurante es requerido'}), 400
        
        # Verificar que el restaurante existe
        restaurante = Restaurante.query.get(id_restaurante)
        if not restaurante:
            return jsonify({'error': 'Restaurante no encontrado'}), 404
        
        # Generar ID si no se proporciona
        id_plato = data.get('id_plato')
        if not id_plato:
            id_plato = f"PLAT{str(uuid.uuid4().int)[:8]}"
        
        # Verificar si el plato ya existe
        if Plato.query.get(id_plato):
            return jsonify({'error': 'El ID del plato ya existe'}), 409
        
        # Crear plato
        plato = Plato(
            id_plato=id_plato,
            id_restaurante=id_restaurante,
            nombre=data['nombre'],
            descripcion=data['descripcion'],
            precio=float(data['precio']),
            tiempo_preparacion=int(data.get('tiempo_preparacion', 15)),
            ingredientes=data['ingredientes']
        )
        
        db.session.add(plato)
        db.session.commit()
        
        return jsonify(plato.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@platos_bp.route('/<id_plato>', methods=['PUT'])
@platos_bp.route('/<id_plato>/', methods=['PUT'])
def actualizar_plato(id_plato):
    """Actualiza un plato existente"""
    try:
        plato = Plato.query.get(id_plato)
        if not plato:
            return jsonify({'error': 'Plato no encontrado'}), 404
        
        data = request.get_json()
        
        # Actualizar campos
        if 'nombre' in data:
            plato.nombre = data['nombre']
        if 'descripcion' in data:
            plato.descripcion = data['descripcion']
        if 'precio' in data:
            plato.precio = float(data['precio'])
        if 'tiempo_preparacion' in data:
            plato.tiempo_preparacion = int(data['tiempo_preparacion'])
        if 'ingredientes' in data:
            plato.ingredientes = data['ingredientes']
        if 'disponible' in data:
            plato.disponible = data['disponible']
        
        db.session.commit()
        return jsonify(plato.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@platos_bp.route('/<id_plato>', methods=['DELETE'])
@platos_bp.route('/<id_plato>/', methods=['DELETE'])
def eliminar_plato(id_plato):
    """Elimina un plato (soft delete)"""
    try:
        plato = Plato.query.filter_by(id_plato=id_plato).first()
        if not plato:
            return jsonify({'error': 'Plato no encontrado'}), 404
        
        plato.disponible = False
        db.session.commit()
        return jsonify({'message': 'Plato eliminado exitosamente', 'id': id_plato}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
