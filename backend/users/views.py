from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer, UserProfileSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    permission_classes = [permissions.AllowAny]

class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
             return Response({'error': 'Email is required'}, status=400)
             
        try:
            user = User.objects.get(email=email)
            user.is_active = True
            user.save()
            return Response({'message': 'Account activated successfully. You can now login.'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
