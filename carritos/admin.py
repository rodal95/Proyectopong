from django.contrib import admin
from .models import Carrito, CarritoCampaña

class CarritoAdmin(admin.ModelAdmin):
    list_display = ['id','cliente_id','abierto','fecha_ultima_actividad']

class CarritoCampañaAdmin(admin.ModelAdmin):
    list_display = ['id','carrito_id','campaña_id','campaña_precio','campaña_cantidad_elegida','subtotal']

# Registra los modelos con las clases personalizadas
admin.site.register(Carrito, CarritoAdmin)
admin.site.register(CarritoCampaña, CarritoCampañaAdmin)
