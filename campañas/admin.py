from django.contrib import admin
from .models import Campaña
# Register your models here.

class CampañaAdmin(admin.ModelAdmin):
    list_display = ['id','nombre','precio','descripcion']

admin.site.register(Campaña, CampañaAdmin)
