from rest_framework import generics, permissions
from .models import Booking
from .serializers import BookingSerializer, BookingDetailSerializer

class BookingListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookingSerializer
        return BookingDetailSerializer

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookingDetailSerializer
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
