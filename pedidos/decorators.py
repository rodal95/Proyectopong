import jwt
from django.conf import settings
from django.http import JsonResponse
from functools import wraps

def token_required(func):
    def wrapper(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION', "").split(' ')[1]
        try:
            decoded_payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_payload.get('user_id', None)

            if user_id is not None:
                request.user_id = user_id
                return func(self, request, *args, **kwargs)
            else:
                return JsonResponse({'message': 'Token no válido'}, status=401)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'message': 'Token ha expirado'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'message': 'Token no válido'}, status=401)

    return wrapper