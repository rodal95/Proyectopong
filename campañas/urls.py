from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from campañas import views


urlpatterns = [
    path('all/', views.CampañaView.as_view({'get': 'getAll'})),
    path('getById/<int:id>/', views.CampañaView.as_view({'get': 'getById'})),
]