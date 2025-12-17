from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
import uuid

User = get_user_model()

# In-memory store for reset tokens (Use DB/Redis in prod)
reset_tokens = {}

@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        token = str(uuid.uuid4())
        reset_tokens[token] = email
        
        reset_link = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        send_mail(
            'Reset your Phevon Password',
            f'Click here to reset your password: {reset_link}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        return Response({'message': 'Password reset link sent'})
    except User.DoesNotExist:
        # Don't reveal user existence
        return Response({'message': 'Password reset link sent'})

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_confirm(request):
    token = request.data.get('token')
    new_password = request.data.get('password')
    
    email = reset_tokens.get(token)
    if not email:
        return Response({'error': 'Invalid or expired token'}, status=400)
        
    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        del reset_tokens[token]
        return Response({'message': 'Password reset successful'})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
