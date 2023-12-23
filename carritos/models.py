from django.db import models
from clientes.models import Cliente
from campañas.models import Campaña

class Carrito(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    abierto = models.BooleanField()
    fecha_ultima_actividad = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Carrito {self.id} - Cliente: {self.cliente_id}'
    
class CarritoCampaña(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    campaña = models.ForeignKey(Campaña, on_delete=models.CASCADE)
    campaña_nombre = models.CharField(max_length=255)
    campaña_precio = models.DecimalField(max_digits=10, decimal_places=2)
    campaña_cantidad_elegida= models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Campaña en Carrito {self.carrito_id} - Campaña: {self.campaña_id}'
    