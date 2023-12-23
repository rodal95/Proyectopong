from django.contrib import admin
from .models import Pedido, PedidoCampaña

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente_id', 'fecha_pedido', 'total_pedido')

class PedidoCampañaAdmin(admin.ModelAdmin):
    list_display = ('id', 'pedido_id', 'campaña_id', 'campaña_nombre', 'campaña_cantidad_elegida', 'campaña_precio', 'subtotal')

admin.site.register(Pedido, PedidoAdmin)
admin.site.register(PedidoCampaña, PedidoCampañaAdmin)