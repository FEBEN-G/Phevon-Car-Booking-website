from django.db import models
from django.conf import settings
from bookings.models import Booking

class Payment(models.Model):
    PROVIDER_CHOICES = [
        ('CHAPA', 'Chapa'),
        ('PAYPAL', 'PayPal'),
    ]
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]

    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='ETB')
    
    provider = models.CharField(max_length=10, choices=PROVIDER_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    
    transaction_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    provider_ref = models.CharField(max_length=100, null=True, blank=True) # ID from Chapa/PayPal
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.provider} Payment - {self.booking.id} - {self.status}"
