from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from .models import Carrito, CarritoCampaña
from campañas.models import Campaña
from .decorators import token_required
from django.db import connections
# Create your views here.

class CarritoView(viewsets.ViewSet):
    @token_required
    def carritosAbiertos(self, request):
        user_id = request.user_id
        carritos_abiertos = Carrito.objects.get(cliente_id=user_id, abierto=1)
        campañas = CarritoCampaña.objects.filter(carrito_id=carritos_abiertos)

        data = []
        for campaña in campañas:
            data.append({'id_campaña': campaña.campaña_id,'nombre':campaña.campaña_nombre, 'precio': campaña.campaña_precio,'cantidad':campaña.campaña_cantidad_elegida,'subtotal':campaña.subtotal})
        return JsonResponse(data, safe=False)

    @token_required
    def agregar_carrito(self,request):
        if request.method == 'POST':
            try:
                user_id = request.user_id

                id_campaña = request.data.get('id_campaña')
                cantidad_elegida = int(request.data.get('cantidad'))
                campaña = Campaña.objects.get(id=id_campaña)
                carrito = Carrito.objects.filter(cliente_id=user_id, abierto=1).first()
                print(carrito)
                carrito_existente = CarritoCampaña.objects.filter(carrito_id=carrito.id, campaña_id=id_campaña).first()

                if carrito_existente:
                    # Si la campaña existe, actualiza la cantidad elegida
                    carrito_existente.campaña_cantidad_elegida += cantidad_elegida
                    carrito_existente.subtotal = (carrito_existente.campaña_precio * carrito_existente.campaña_cantidad_elegida)
                    carrito_existente.save()
                else:

                    nueva_campaña_carrito = CarritoCampaña.objects.create(
                        carrito_id=carrito.id,
                        campaña_id=id_campaña,
                        campaña_nombre=campaña.nombre,
                        campaña_precio=campaña.precio,
                        campaña_cantidad_elegida=cantidad_elegida,
                        subtotal=cantidad_elegida * campaña.precio,
                    )
                    nueva_campaña_carrito.save()
                return JsonResponse({'message': 'Operación exitosa'})
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)
        else:
            return JsonResponse({'message': 'Método no permitido'}, status=405)
        
    @token_required
    def actualizar_carrito(self, request, id):
        if request.method == 'PUT':
            try:
                user_id = request.user_id
                nueva_cantidad = int(request.data.get('nueva_cantidad'))

                carrito = Carrito.objects.filter(cliente_id=user_id, abierto=1).first()
                if not carrito:
                    return JsonResponse({'message': 'No se encontró un carrito abierto para el usuario'}, status=400)

                carrito_campaña = CarritoCampaña.objects.filter(carrito=carrito, campaña_id=id).first()
                if not carrito_campaña:
                    return JsonResponse({'message': 'No se encontró la campaña en el carrito'}, status=400)

                if nueva_cantidad < 1:
                    return JsonResponse({'message': 'La cantidad mínima permitida es 1'}, status=400)

                carrito_campaña.campaña_cantidad_elegida = nueva_cantidad
                carrito_campaña.subtotal = (carrito_campaña.campaña_precio * carrito_campaña.campaña_cantidad_elegida)
                carrito_campaña.save()

                return JsonResponse({'message': 'Operación exitosa'})
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)

            
    @token_required
    def eliminar_campaña(self, request, id):
        if request.method == 'DELETE':
            try:
                user_id = request.user_id

                carrito = Carrito.objects.filter(cliente_id=user_id, abierto=1).first()
                if not carrito:
                    return JsonResponse({'message': 'No se encontró un carrito abierto para el usuario'}, status=400)

                carrito_campaña = CarritoCampaña.objects.filter(carrito=carrito, campaña_id=id).first()
                if not carrito_campaña:
                    return JsonResponse({'message': 'No se encontró la campaña en el carrito'}, status=400)

                carrito_campaña.delete()

                return JsonResponse({'message': 'Operación exitosa'})
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)


    @token_required
    def limpiar_carrito(self, request):
        if request.method == 'DELETE':
            try:
                user_id = request.user_id
                carritos_abiertos = Carrito.objects.filter(cliente_id=user_id, abierto=1)
                CarritoCampaña.objects.filter(carrito_id=carritos_abiertos.first().id).delete()
                return JsonResponse({'message': True})
            except Exception as e:
                return JsonResponse({'message': 'Error: ' + str(e)}, status=400)
