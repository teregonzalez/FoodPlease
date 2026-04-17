"""
Esquemas de validación para la API
"""


class RestauranteSchema:
    """Esquema para validar datos de Restaurante"""
    
    @staticmethod
    def validate_restaurante(data):
        """Valida los datos de un restaurante"""
        errors = {}
        
        # id_restaurante es opcional - se genera automáticamente si no se proporciona
        if not data.get('nombre'):
            errors['nombre'] = 'Campo requerido'
        if not data.get('direccion'):
            errors['direccion'] = 'Campo requerido'
        if not data.get('telefono'):
            errors['telefono'] = 'Campo requerido'
        if not data.get('email'):
            errors['email'] = 'Campo requerido'
        elif '@' not in data.get('email', ''):
            errors['email'] = 'Email inválido'
        
        try:
            tiempo = int(data.get('tiempo_promedio_preparacion', 30))
            if tiempo < 0:
                errors['tiempo_promedio_preparacion'] = 'Debe ser positivo'
        except (ValueError, TypeError):
            errors['tiempo_promedio_preparacion'] = 'Debe ser un número'
        
        return errors


class PlatoSchema:
    """Esquema para validar datos de Plato"""
    
    @staticmethod
    def validate_plato(data):
        """Valida los datos de un plato"""
        errors = {}
        
        # id_plato es opcional - se genera automáticamente si no se proporciona
        if not data.get('nombre'):
            errors['nombre'] = 'Campo requerido'
        if not data.get('descripcion'):
            errors['descripcion'] = 'Campo requerido'
        if not data.get('precio'):
            errors['precio'] = 'Campo requerido'
        else:
            try:
                precio = float(data.get('precio', 0))
                if precio < 0:
                    errors['precio'] = 'Debe ser positivo'
            except (ValueError, TypeError):
                errors['precio'] = 'Debe ser un número'
        
        if not data.get('ingredientes'):
            errors['ingredientes'] = 'Campo requerido'
        
        try:
            tiempo = int(data.get('tiempo_preparacion', 15))
            if tiempo < 0:
                errors['tiempo_preparacion'] = 'Debe ser positivo'
        except (ValueError, TypeError):
            errors['tiempo_preparacion'] = 'Debe ser un número'
        
        return errors
