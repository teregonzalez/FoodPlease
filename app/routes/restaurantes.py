"""
Rutas para Restaurantes
"""
from flask import Blueprint, request, jsonify
from app.models import db, Restaurante
from app.schemas import RestauranteSchema

restaurantes_bp = Blueprint('restaurantes', __name__, url_prefix='/api/restaurantes')
restaurantes_bp.strict_slashes = False


@restaurantes_bp.route('/', methods=['GET'])
def listar_restaurantes():
    """Lista todos los restaurantes activos"""
    try:
        restaurantes = Restaurante.query.filter_by(activo=True).all()
        return jsonify([r.to_dict() for r in restaurantes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@restaurantes_bp.route('/<id_restaurante>', methods=['GET'])
def obtener_restaurante(id_restaurante):
    """Obtiene un restaurante específico"""
    try:
        restaurante = Restaurante.query.get(id_restaurante)
        if not restaurante:
            return jsonify({'error': 'Restaurante no encontrado'}), 404
        return jsonify(restaurante.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@restaurantes_bp.route('/', methods=['POST'])
def crear_restaurante():
    """Crea un nuevo restaurante"""
    try:
        import uuid
        data = request.get_json()
        
        # Validar datos
        errors = RestauranteSchema.validate_restaurante(data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        # Generar ID si no se proporciona
        id_restaurante = data.get('id_restaurante')
        if not id_restaurante:
            id_restaurante = f"REST{str(uuid.uuid4().int)[:8]}"
        
        # Verificar si ya existe
        if Restaurante.query.get(id_restaurante):
            return jsonify({'error': 'El ID del restaurante ya existe'}), 409
        
        # Crear restaurante
        restaurante = Restaurante(
            id_restaurante=id_restaurante,
            nombre=data['nombre'],
            direccion=data['direccion'],
            telefono=data['telefono'],
            email=data['email'],
            tiempo_promedio_preparacion=int(data.get('tiempo_promedio_preparacion', 30))
        )
        
        db.session.add(restaurante)
        db.session.commit()
        
        return jsonify(restaurante.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@restaurantes_bp.route('/<id_restaurante>', methods=['PUT'])
@restaurantes_bp.route('/<id_restaurante>/', methods=['PUT'])
def actualizar_restaurante(id_restaurante):
    """Actualiza un restaurante existente"""
    try:
        restaurante = Restaurante.query.get(id_restaurante)
        if not restaurante:
            return jsonify({'error': 'Restaurante no encontrado'}), 404
        
        data = request.get_json()
        
        # Actualizar campos
        if 'nombre' in data:
            restaurante.nombre = data['nombre']
        if 'direccion' in data:
            restaurante.direccion = data['direccion']
        if 'telefono' in data:
            restaurante.telefono = data['telefono']
        if 'email' in data:
            restaurante.email = data['email']
        if 'tiempo_promedio_preparacion' in data:
            restaurante.tiempo_promedio_preparacion = int(data['tiempo_promedio_preparacion'])
        if 'activo' in data:
            restaurante.activo = data['activo']
        
        db.session.commit()
        return jsonify(restaurante.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@restaurantes_bp.route('/<id_restaurante>', methods=['DELETE'])
@restaurantes_bp.route('/<id_restaurante>/', methods=['DELETE'])
def eliminar_restaurante(id_restaurante):
    """Elimina un restaurante (soft delete)"""
    try:
        restaurante = Restaurante.query.filter_by(id_restaurante=id_restaurante).first()
        if not restaurante:
            return jsonify({'error': 'Restaurante no encontrado'}), 404
        
        # Soft delete: marcar como inactivo
        restaurante.activo = False
        db.session.commit()
        return jsonify({'message': 'Restaurante eliminado exitosamente', 'id': id_restaurante}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
