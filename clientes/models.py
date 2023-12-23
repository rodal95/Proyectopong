# Create your models here.
from django.db import models
from django.contrib.auth.hashers import make_password 

# Create your models here.
class Cliente(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    dni = models.CharField(max_length=10, unique=True)
    telefono = models.CharField(max_length=15)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=500)
    
    def __str__(self):
        return self.nombre
    
    def save(self, *args, **kwargs):
        # Hashea la contraseña antes de guardarla
        self.contraseña = make_password(self.contraseña)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre