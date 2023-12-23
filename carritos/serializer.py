from rest_framework import serializers
from .models import Carrito, CarritoCampaña

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = '__all__'

class CarritoCampañaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarritoCampaña
        fields = '__all__'
