from django.db import models
from campañas.models import Campaña
from clientes.models import Cliente
# Create your models here.
class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha_pedido = models.DateTimeField(auto_now=True)
    total_pedido = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Pedido {self.id} - Cliente: {self.cliente_id}'
    
    
class PedidoCampaña(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    campaña = models.ForeignKey(Campaña, on_delete=models.CASCADE)
    campaña_nombre =models.CharField(max_length=255)
    campaña_precio = models.DecimalField(max_digits=10, decimal_places=2)
    campaña_cantidad_elegida = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f'Campaña en Pedido {self.pedido_id} - Campaña: {self.producto_id}'