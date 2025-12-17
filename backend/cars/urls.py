from django.urls import path
from .views import CarListView, CarDetailView, LocationListView

urlpatterns = [
    path('cars/', CarListView.as_view(), name='car-list'),
    path('cars/<int:id>/', CarDetailView.as_view(), name='car-detail'),
    path('locations/', LocationListView.as_view(), name='location-list'),
]
