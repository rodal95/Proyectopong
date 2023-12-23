from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from rest_framework import viewsets
from .serializer import ClienteSerializer
from .models import Cliente
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from datetime import datetime, timedelta
from .decorators import token_required
from decouple import config
class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()

    def create(self, request, *args, **kwargs):
    # Obtén los datos del cliente desde la solicitud
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @token_required
    def consultar(self, request):
        user_id = request.user_id
        try:
            user = Cliente.objects.get(id=user_id)
            return JsonResponse({'message': 'Información del usuario', 'id': user.id,"nombre":user.nombre,'apellido':user.apellido,'telefono':user.telefono, 'correo': user.correo})
        except Cliente.DoesNotExist:
            return JsonResponse({'message': 'Usuario no encontrado'}, status=404)

    def login(self, request):
        email = request.data.get('correo')
        password = request.data.get('contraseña')
        try:
            user = Cliente.objects.get(correo=email)
            if check_password(password, user.contraseña):
                response = HttpResponse()
                token_payload = {'user_id': user.id, 'username': user.correo,'exp': datetime.utcnow() + timedelta(hours=1) }
                token = jwt.encode(token_payload, settings.SECRET_KEY, algorithm='HS256')
                token_str = token
                return JsonResponse({'token': token_str.decode('utf-8'), 'message': 'Inicio de sesión exitoso'})
        except Cliente.DoesNotExist:
            pass 

        return JsonResponse({'message': 'Login fallido'}, status=401)