from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from .models import Carrito, CarritoCampaña
from .decorators import token_required
from django.db import connections
# Create your views here.

class CarritoView(viewsets.ViewSet):
    @token_required
    def carritosAbiertos(self, request):
        user_id = request.user_id
        carritos_abiertos = Carrito.objects.filter(cliente_id=user_id, abierto=1)
        campañas = CarritoCampaña.objects.filter(carrito_id=carritos_abiertos.first().id)

        data = []
        for campaña in campañas:
            data.append({'id_producto': campaña.campaña_id,'nombre':campaña.campaña_nombre, 'precio': campaña.campaña_precio,'cantidad':campaña.campaña_cantidad_elegida,'subtotal':campaña.subtotal})
        return JsonResponse(data, safe=False)

    @token_required
    def agregar_o_actualizar_carrito(self,request):
        if request.method == 'POST':
            try:
                user_id = request.user_id
                id_campaña = (request.data.get('id_campaña'))
                cantidad_elegida = (request.data.get('cantidad'))
                query = 'SELECT AgregarOActualizarCarrito(%s,%s,%s)'
                with connections['default'].cursor() as cursor:
                    cursor.execute(query, (user_id, id_campaña, cantidad_elegida))
                return JsonResponse({'message': 'Operación exitosa'})
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)
        else:
            return JsonResponse({'message': 'Método no permitido'}, status=405)

    @token_required
    def limpiar_carrito(self, request):
        user_id = request.user_id
        carritos_abiertos = Carrito.objects.filter(cliente_id=user_id, abierto=1)
        CarritoCampaña.objects.filter(carrito_id=carritos_abiertos.first().id).delete()
        return JsonResponse({'message': True})
