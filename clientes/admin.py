from django.contrib import admin
from .models import Cliente


class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id','nombre','apellido','telefono','correo']
    
    
admin.site.register(Cliente, ClienteAdmin)