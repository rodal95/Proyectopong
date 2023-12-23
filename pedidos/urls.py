from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from pedidos import views

"un cambio para que detecte la rama"
urlpatterns = [
    path('pedidosId/', views.PedidoViews.as_view({'get': 'pedidos'})),
    path('finalizarPedido/', views.PedidoViews.as_view({'get': 'finalizarPedido'})),

]