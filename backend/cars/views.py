from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Car, Location
from .serializers import CarListSerializer, CarDetailSerializer, LocationSerializer

class CarListView(generics.ListAPIView):
    queryset = Car.objects.filter(is_available=True)
    serializer_class = CarListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_fields = {
        'make': ['exact', 'icontains'],
        'car_type': ['exact'],
        'transmission': ['exact'],
        'fuel_type': ['exact'],
        'seats': ['gte'],
        'daily_rate': ['lte', 'gte'],
        'location__city': ['exact'],
    }
    search_fields = ['make', 'model', 'location__city']
    ordering_fields = ['daily_rate', 'year']

class CarDetailView(generics.RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarDetailSerializer
    lookup_field = 'id'

class LocationListView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
