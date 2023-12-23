from django.urls import path, include
from clientes import views


urlpatterns = [

    path('agregar/', views.ClienteView.as_view({'post': 'create'}), name='cliente-agregar'),

    path('consultar/', views.ClienteView.as_view({'get': 'consultar'}), name='cliente-consultar'),

    path('loguearse/', views.ClienteView.as_view({'post': 'login'}), name='cliente-login'),
]