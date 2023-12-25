from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clientes/', include('clientes.urls')),
    path('api/campañas/', include('campañas.urls')),
    path('api/carritos/', include('carritos.urls')),
    path('api/pedidos/', include('pedidos.urls')),
    
]
