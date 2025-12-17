from django.core.management.base import BaseCommand
from cars.models import Car, Location
from decimal import Decimal

class Command(BaseCommand):
    help = 'Populates the database with sample cars and high-quality images'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating data...')

        # Create Locations
        loc1, _ = Location.objects.get_or_create(
            name="Bole Airport",
            address="Terminal 2 Arrivals",
            city="Addis Ababa"
        )
        loc2, _ = Location.objects.get_or_create(
            name="Piassa Office",
            address="Churchill Road",
            city="Addis Ababa"
        )

        cars_data = [
            {
                "make": "Toyota",
                "model": "Land Cruiser V8",
                "year": 2023,
                "car_type": "SUV",
                # Removed non-existent fields: total_runs, status
                "transmission": "AUTOMATIC",
                "fuel_type": "DIESEL",
                "seats": 7,
                # Increased Price
                "daily_rate": 15000.00,
                "is_available": True,
                # New Reliable Land Cruiser Image
                "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
                "description": "The ultimate luxury SUV for Ethiopian roads. Features leather seats, sunroof, and advanced 4WD system.",
                "location": loc1
            },
            {
                "make": "Mercedes-Benz",
                "model": "S-Class",
                "year": 2022,
                "car_type": "LUXURY",
                # Removed non-existent fields
                "transmission": "AUTOMATIC",
                "fuel_type": "PETROL",
                "seats": 5,
                "daily_rate": 25000.00,
                "is_available": True,
                # Reliable Mercedes Image
                "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop",
                "description": "Experience executive comfort with the Mercedes S-Class. Perfect for weddings, VIP transport, and business meetings.",
                "location": loc1
            },
            {
                "make": "Tesla",
                "model": "Model Y",
                "year": 2023,
                "car_type": "ELECTRIC",
                "transmission": "AUTOMATIC",
                "fuel_type": "ELECTRIC",
                "seats": 5,
                "daily_rate": 20000.00,
                "is_available": True,
                # Reliable Tesla Image
                "image": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
                "description": "Drive the future with this fully electric Tesla Model Y. Autopilot enabled, premium interior, and zero emissions.",
                "location": loc2
            },
            {
                "make": "Toyota",
                "model": "Corolla",
                "year": 2020,
                "car_type": "SEDAN",
                "transmission": "AUTOMATIC",
                "fuel_type": "PETROL",
                "seats": 5,
                "daily_rate": 4500.00,
                "is_available": True,
                # Reliable Sedan Image
                "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop",
                "description": "Reliable and fuel-efficient Toyota Corolla. The smart choice for city driving and daily commutes.",
                "location": loc2
            },
            {
                "make": "Range Rover",
                "model": "Sport",
                "year": 2021,
                "car_type": "LUXURY",
                "transmission": "AUTOMATIC",
                "fuel_type": "DIESEL",
                "seats": 5,
                "daily_rate": 18000.00,
                "is_available": True,
                # Reliable Range Rover Image
                "image": "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1000&auto=format&fit=crop",
                "description": "Dynamic performance meets luxury. The Range Rover Sport delivers an exceptional driving experience.",
                "location": loc1
            },
            {
                "make": "Hyundai",
                "model": "Tucson",
                "year": 2022,
                "car_type": "SUV",
                "transmission": "AUTOMATIC",
                "fuel_type": "PETROL",
                "seats": 5,
                "daily_rate": 8500.00,
                "is_available": True,
                # New Reliable SUV Image (using a generic SUV/Crossover shot if specific one failed)
                "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
                "description": "Stylish and spacious compact SUV. Great for small families and weekend getaways.",
                "location": loc2
            }
        ]

        for car_data in cars_data:
            car, created = Car.objects.update_or_create(
                make=car_data["make"],
                model=car_data["model"],
                year=car_data["year"],
                defaults=car_data
            )
            if not created:
                 self.stdout.write(f'Updated {car}')
            else:
                 self.stdout.write(f'Created {car}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample cars!'))
