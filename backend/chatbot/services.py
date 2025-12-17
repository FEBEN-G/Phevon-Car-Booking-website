import google.generativeai as genai
from django.conf import settings
from cars.models import Car

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-flash-latest')

    def get_response(self, user_message: str, user_context: dict = None) -> str:
        """
        Get AI response with context about available cars
        """
        # Build context
        context = self._build_context(user_context)
        
        # Create prompt
        prompt = f"""You are a helpful car rental assistant for Phevon Car Booking.

Context:
{context}

User Question: {user_message}

Please provide a helpful, friendly response. If the user asks about cars, provide specific recommendations based on the available inventory. Keep responses concise and actionable."""

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"I apologize, but I'm having trouble processing your request right now. Please try again later. Error: {str(e)}"

    def _build_context(self, user_context: dict = None) -> str:
        """Build context string with car inventory and user info"""
        context_parts = []
        
        # Add car inventory summary
        cars = Car.objects.filter(is_available=True)[:10]  # Limit to avoid token limits
        if cars.exists():
            context_parts.append("Available Cars:")
            for car in cars:
                context_parts.append(
                    f"- {car.make} {car.model} ({car.year}): {car.car_type}, "
                    f"{car.daily_rate} ETB/day, {car.seats} seats, "
                    f"{car.transmission}, {car.fuel_type}, Location: {car.location.city}"
                )
        
        # Add user context if provided
        if user_context:
            if user_context.get('username'):
                context_parts.append(f"\nUser: {user_context['username']}")
            if user_context.get('previous_bookings'):
                context_parts.append(f"Previous bookings: {user_context['previous_bookings']}")
        
        return "\n".join(context_parts)
