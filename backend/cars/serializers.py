from rest_framework import serializers
from .models import Car, Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class CarListSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Car
        fields = ['id', 'make', 'model', 'year', 'car_type', 'transmission', 'fuel_type', 'seats', 'daily_rate', 'location', 'image', 'is_available']
        
    def get_image(self, obj):
        if obj.image:
            # Check if it's an external URL (hacked into the field)
            if str(obj.image).startswith('http'):
                return str(obj.image)
            # Default behavior for real uploaded files
            try:
                request = self.context.get('request')
                url = obj.image.url
                if request:
                    return request.build_absolute_uri(url)
                return url
            except ValueError:
                return None
        return None

class CarDetailSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Car
        fields = '__all__'
        
    def get_image(self, obj):
        if obj.image:
            if str(obj.image).startswith('http'):
                return str(obj.image)
            try:
                request = self.context.get('request')
                url = obj.image.url
                if request:
                    return request.build_absolute_uri(url)
                return url
            except ValueError:
                return None
        return None
