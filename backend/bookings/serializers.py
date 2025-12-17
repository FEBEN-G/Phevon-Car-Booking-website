from rest_framework import serializers
from .models import Booking
from cars.serializers import CarListSerializer

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('user', 'total_price', 'status', 'created_at', 'updated_at')

    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError("End date must be after start date.")
        
        # Check availability
        car = data['car']
        overlapping_bookings = Booking.objects.filter(
            car=car,
            status__in=['PENDING', 'CONFIRMED'],
            start_date__lt=data['end_date'],
            end_date__gt=data['start_date']
        )
        
        if overlapping_bookings.exists():
            raise serializers.ValidationError("This car is not available for the selected dates.")
        
        return data

    def create(self, validated_data):
        # Calculate total price automatically
        car = validated_data['car']
        days = (validated_data['end_date'] - validated_data['start_date']).days
        validated_data['total_price'] = car.daily_rate * days
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class BookingDetailSerializer(serializers.ModelSerializer):
    car = CarListSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
