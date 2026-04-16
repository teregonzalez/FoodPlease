from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import RestauranteViewSet, PlatoViewSet

"""
Rutas API REST para React Frontend
SOLID: SRP - Archivo dedicado solo a rutas API
"""

# Router automático para ViewSets
router = DefaultRouter()
router.register(r'restaurantes', RestauranteViewSet, basename='restaurante')
router.register(r'platos', PlatoViewSet, basename='plato')

urlpatterns = [
    # API REST v1
    path('api/v1/', include(router.urls)),
]
