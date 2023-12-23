from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .serializer import CampañaSerializer
from .models import Campaña
# Create your views here.
class CampañaView(viewsets.ModelViewSet):
    serializer_class = CampañaSerializer

    def getAll(self,request):
        campañas = Campaña.objects.all()
        data = [{'id_campaña': c.id, 'nombre': c.nombre, 'precio': c.precio, 'descripcion':c.descripcion} for c in campañas]
        return JsonResponse(data, safe=False)
    def getById(self,request,id):
        campaña = Campaña.objects.get(id=id)
        data = {'id_campaña': campaña.id, 'nombre': campaña.nombre, 'precio': campaña.precio, 'descripcion':campaña.descripcion}
        return JsonResponse(data, safe=False)