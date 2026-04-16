from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Restaurante, Plato
from .serializers import RestauranteSerializer, PlatoSerializer, PlatoDetailSerializer
from django.shortcuts import get_object_or_404


class RestauranteViewSet(viewsets.ModelViewSet):
    """
    API ViewSet para Restaurantes
    SOLID Principles:
    - SRP: Solo responsable de operaciones CRUD de restaurantes
    - OCP: Extendible con @action decorators sin modificar código base
    - DIP: Usa serializers inyectados para transformar datos
    """
    queryset = Restaurante.objects.all()
    serializer_class = RestauranteSerializer
    lookup_field = 'id_restaurante'

    def get_object(self):
        """
        Override para usar id_restaurante en lugar de pk
        """
        queryset = self.get_queryset()
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = get_object_or_404(queryset, **filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj

    @action(detail=False, methods=['get'])
    def activos(self, request):
        """
        Get solo restaurantes activos
        SOLID: OCP - Extiende funcionalidad sin modificar métodos base
        """
        restaurantes = Restaurante.objects.filter(activo=True)
        serializer = self.get_serializer(restaurantes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def platos(self, request, id_restaurante=None):
        """
        Get todos los platos de un restaurante
        SOLID: SRP - Responsabilidad separada para platos
        """
        restaurante = self.get_object()
        platos = restaurante.plato_set.all()
        serializer = PlatoDetailSerializer(platos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def activar(self, request, id_restaurante=None):
        """
        Activar/desactivar restaurante
        """
        restaurante = self.get_object()
        restaurante.activo = request.data.get('activo', True)
        restaurante.save()
        serializer = self.get_serializer(restaurante)
        return Response(serializer.data)


class PlatoViewSet(viewsets.ModelViewSet):
    """
    API ViewSet para Platos
    SOLID Principles:
    - SRP: Solo responsable de operaciones CRUD de platos
    - OCP: Extendible sin modificar código base
    """
    queryset = Plato.objects.all()
    serializer_class = PlatoSerializer
    lookup_field = 'id_plato'

    def get_queryset(self):
        """
        Filtrar por restaurante si se proporciona en query params
        SOLID: DIP - Inyección de dependencia a través de query params
        """
        queryset = super().get_queryset()
        restaurante_id = self.request.query_params.get('restaurante_id', None)
        if restaurante_id:
            queryset = queryset.filter(restaurante__id_restaurante=restaurante_id)
        return queryset

    def get_object(self):
        """
        Override para usar id_plato en lugar de pk
        """
        queryset = self.get_queryset()
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = get_object_or_404(queryset, **filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """
        Get solo platos disponibles
        SOLID: OCP - Extiende sin modificar base
        """
        platos = Plato.objects.filter(disponible=True)
        serializer = self.get_serializer(platos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def validar(self, request, id_plato=None):
        """
        Validar disponibilidad de plato
        SOLID: SRP - Validación separada
        """
        plato = self.get_object()
        return Response({
            'id': plato.id_plato,
            'nombre': plato.nombre,
            'disponible': plato.disponible,
            'precio': plato.precio
        })
