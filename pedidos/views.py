from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets
from carritos.models import Carrito, CarritoCampaña
from .models import Pedido, PedidoCampaña
from clientes.models import Cliente
from django.db import transaction
from .decorators import token_required

from decouple import config
from django.db.models import Sum
# Create your views here.

class PedidoViews(viewsets.ModelViewSet):
    @token_required
    def pedidos(self, request):
        user_id = request.user_id
        try:
            # Obtener el último pedido del usuario
            ultimo_pedido = Pedido.objects.filter(cliente_id=user_id).last()

            if ultimo_pedido:
                # Filtrar PedidoCampaña por el último pedido
                campañas_ultimo_pedido = PedidoCampaña.objects.filter(pedido_id=ultimo_pedido.id)
                
                # Crear una lista con la información de las campañas del último pedido
                campañas_data = [{
                    'id_campaña': campaña.campaña_id,
                    'nombre': campaña.campaña_nombre,
                    'cantidad': campaña.campaña_cantidad_elegida,
                    'precio': campaña.campaña_precio,
                    'subtotal': campaña.subtotal
                } for campaña in campañas_ultimo_pedido]
                
                # Estructurar la información del último pedido y sus campañas
                ultimo_pedido_data = {
                    'id_pedido': ultimo_pedido.id,
                    'fecha': ultimo_pedido.fecha_pedido,
                    'total': ultimo_pedido.total_pedido,
                    'campañas': campañas_data
                }
                
                return JsonResponse(ultimo_pedido_data)
            else:
                return JsonResponse({'message': 'No se encontraron pedidos para este usuario'}, status=404)
        except Exception as e:
            return JsonResponse({'message': 'Error: ' + str(e)}, status=400)
    
    @token_required
    def finalizarPedido(self, request):
        if request.method == 'GET':
            try:
                user_id = request.user_id

                # Buscar y actualizar el carrito del usuario de abierto a cerrado
                carrito = Carrito.objects.get(cliente_id=user_id, abierto=True)
                if carrito:
                    carrito.abierto = False
                    carrito.save()
                    
                    # Recopilar información de CarritoCampaña antes de borrar
                    carrito_campaña_info = CarritoCampaña.objects.filter(carrito_id=carrito.id)
                    total_pedido = carrito_campaña_info.aggregate(total=Sum('subtotal'))['total'] or 0.0
                    
                    # Crear un nuevo pedido con user_id y el total calculado
                    nuevo_pedido = Pedido.objects.create(cliente_id=user_id, total_pedido=total_pedido)
                    
                    # Crear registros en PedidoCampaña con la información recopilada
                    for cc in carrito_campaña_info:
                        PedidoCampaña.objects.create(
                            pedido_id=nuevo_pedido.id,
                            campaña_id=cc.campaña_id,
                            campaña_nombre=cc.campaña_nombre,
                            campaña_cantidad_elegida=cc.campaña_cantidad_elegida,
                            campaña_precio=cc.campaña_precio,
                            subtotal=cc.subtotal
                        )
                    
                    # Eliminar todas las CarritoCampaña asociadas al carrito
                    carrito_campaña_info.delete()
                    
                    # Crear un nuevo carrito para el usuario
                    nuevo_carrito = Carrito.objects.create(cliente_id=user_id, abierto=True)
                    return JsonResponse({'message': True})
                else:
                    return JsonResponse({'message': 'No se encontró un carrito abierto para el usuario'}, status=404)
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)
        else:
            return JsonResponse({'message': 'Método no permitido'}, status=405)