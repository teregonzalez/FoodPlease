from rest_framework import serializers
from .models import Restaurante, Plato


class RestauranteSerializer(serializers.ModelSerializer):
    """
    Serializador para Restaurante
    SOLID: SRP - Solo responsable de convertir Restaurante a JSON
    """
    class Meta:
        model = Restaurante
        fields = [
            'id_restaurante',
            'nombre',
            'direccion',
            'telefono',
            'email',
            'tiempo_promedio_preparacion',
            'activo',
            'fecha_registro'
        ]
        read_only_fields = ['fecha_registro']


class PlatoSerializer(serializers.ModelSerializer):
    """
    Serializador para Plato
    SOLID: SRP - Solo responsable de convertir Plato a JSON
    """
    class Meta:
        model = Plato
        fields = [
            'id_plato',
            'restaurante',
            'nombre',
            'descripcion',
            'precio',
            'tiempo_preparacion',
            'ingredientes',
            'disponible',
            'fecha_creacion'
        ]
        read_only_fields = ['fecha_creacion']


class PlatoDetailSerializer(serializers.ModelSerializer):
    """
    Serializador Plato con detalles del restaurante
    SOLID: OCP - Extiende PlatoSerializer sin modificarlo
    """
    restaurante_nombre = serializers.CharField(
        source='restaurante.nombre',
        read_only=True
    )

    class Meta(PlatoSerializer.Meta):
        fields = PlatoSerializer.Meta.fields + ['restaurante_nombre']
