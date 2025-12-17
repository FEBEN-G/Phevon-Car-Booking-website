from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name}, {self.city}"

class Car(models.Model):
    TRANSMISSION_CHOICES = [
        ('MANUAL', 'Manual'),
        ('AUTOMATIC', 'Automatic'),
    ]
    
    FUEL_CHOICES = [
        ('PETROL', 'Petrol'),
        ('DIESEL', 'Diesel'),
        ('ELECTRIC', 'Electric'),
        ('HYBRID', 'Hybrid'),
    ]
    
    TYPE_CHOICES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('LUXURY', 'Luxury'),
        ('HATCHBACK', 'Hatchback'),
        ('VAN', 'Van'),
    ]

    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=30, blank=True)
    
    car_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    transmission = models.CharField(max_length=10, choices=TRANSMISSION_CHOICES)
    fuel_type = models.CharField(max_length=10, choices=FUEL_CHOICES)
    
    seats = models.IntegerField()
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)
    
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='cars')
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='cars/', blank=True, null=True, max_length=500)
    
    description = models.TextField(blank=True)
    features = models.JSONField(default=list, blank=True) # e.g. ["AC", "Bluetooth"]
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"
