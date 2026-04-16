"""
FoodPlease - Restaurantes URL Configuration

Rutas principales de la aplicación de gestión de restaurantes
SOLID: SRP - Solo responsable del enrutamiento principal
"""
from django.urls import path, include

urlpatterns = [
    # Frontend HTML (legado)
    path('', include('Aplicaciones.Restaurantes.urls')),
    
    # API REST para React
    path('', include('Aplicaciones.Restaurantes.urls_api')),
]
