from django.db import models

# Create your models here.

class Restaurante(models.Model):
    """
    Modelo Restaurante - Representa a los restaurantes participantes en la plataforma FoodPlease
    Campos clave para el sector gastronómico
    """
    id_restaurante = models.CharField(primary_key=True, max_length=10, help_text="ID único del restaurante")
    nombre = models.CharField(max_length=100, help_text="Nombre del restaurante")
    direccion = models.CharField(max_length=150, help_text="Dirección del local")
    telefono = models.CharField(max_length=12, help_text="Teléfono de contacto")
    email = models.EmailField(help_text="Email de contacto")
    tiempo_promedio_preparacion = models.PositiveSmallIntegerField(default=30, help_text="Tiempo en minutos")
    activo = models.BooleanField(default=True, help_text="Si el restaurante está disponible")
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Restaurante"
        verbose_name_plural = "Restaurantes"

    def __str__(self):
        return "{0} - {1}".format(self.nombre, self.direccion)


class Plato(models.Model):
    """
    Modelo Plato - Representa los platos/menú disponibles en cada restaurante
    Permite gestionar el catálogo de ofertas de cada local
    """
    id_plato = models.CharField(primary_key=True, max_length=10, help_text="ID único del plato")
    restaurante = models.ForeignKey(Restaurante, on_delete=models.CASCADE, related_name='platos')
    nombre = models.CharField(max_length=100, help_text="Nombre del plato")
    descripcion = models.CharField(max_length=300, help_text="Descripción detallada del plato")
    precio = models.DecimalField(max_digits=8, decimal_places=2, help_text="Precio en pesos chilenos")
    tiempo_preparacion = models.PositiveSmallIntegerField(default=15, help_text="Tiempo en minutos")
    ingredientes = models.CharField(max_length=200, help_text="Ingredientes principales (separados por coma)")
    disponible = models.BooleanField(default=True, help_text="Si el plato está disponible")
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Plato"
        verbose_name_plural = "Platos"
        unique_together = ('restaurante', 'nombre')

    def __str__(self):
        return "{0} - ${1}".format(self.nombre, self.precio)
