
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from carritos import views


urlpatterns = [
    path('carritosId/', views.CarritoView.as_view({'get': 'carritosAbiertos'})),
    path('agregarCarrito/', views.CarritoView.as_view({'post':'agregar_carrito'})),
    path('actualizarCarrito/<int:id>', views.CarritoView.as_view({'put':'actualizar_carrito'})),
    path('eliminarCampana/<int:id>',views.CarritoView.as_view({'delete':'eliminar_campaña'})),
    path('eliminarCarrito/',views.CarritoView.as_view({'delete':'limpiar_carrito'}))
]
