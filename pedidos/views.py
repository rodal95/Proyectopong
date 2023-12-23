from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets
from .models import Pedido, PedidoCampaña
from clientes.models import Cliente

from .decorators import token_required
from django.db import connections
from decouple import config
from django.core.mail import send_mail
# Create your views here.

class PedidoViews(viewsets.ModelViewSet):
    @token_required
    def pedidos(self, request):
        user_id = request.user_id
        pedidosUser = Pedido.objects.filter(cliente_id=user_id)
        data = []
        for pedido in pedidosUser:
            # Filtrar PedidoProducto por pedido_id
            campañas = PedidoCampaña.objects.filter(pedido_id=pedido.id)
            cammpañas_data = [{'id_producto': campaña.producto_id, 'nombre':campaña.producto_nombre, 'cantidad': campaña.cantidad_elegida_producto,'precio':campaña.precio_producto,'subtotal':campaña.subtotal} for campaña in campañas]
            data.append({'id_pedido': pedido.id, 'fecha': pedido.fecha_pedido, 'total': pedido.total_pedido, 'productos': cammpañas_data})
        return JsonResponse(data, safe=False)
    @token_required
    def finalizarPedido(self, request):
        if request.method == 'GET':
            try:
                user_id = request.user_id
                query = 'SELECT finalizar_pedido(%s)'
                with connections['default'].cursor() as cursor:
                    cursor.execute(query, (user_id,))
                cliente = Cliente.objects.get(id=user_id)
                print(cliente)
                
                self.enviar_correo(cliente)
                return JsonResponse({'message': True})
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)
        else:
            return JsonResponse({'message': 'Método no permitido'}, status=405)