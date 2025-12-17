from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth import get_user_model
from google.oauth2 import id_token
from google.auth.transport import requests
import uuid

User = get_user_model()

class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the token with Google
            # We need the Client ID here.
            client_id = settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), client_id)

            # Get user info'
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            picture = idinfo.get('picture', '')
            
            # Check if user exists, or create
            try:
                user = User.objects.get(email=email)
                # Update existing user info if empty
                if not user.first_name: user.first_name = first_name
                if not user.last_name: user.last_name = last_name
                user.save()
            except User.DoesNotExist:
                # Create user
                username = email.split('@')[0]
                # Ensure username is unique
                if User.objects.filter(username=username).exists():
                    username = f"{username}_{uuid.uuid4().hex[:4]}"
                    
                user = User.objects.create(
                    username=username,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    is_active=True # Google verified emails are active
                )
                user.set_unusable_password()
                user.save()

            # Handle avatar if available and user doesn't have one
            if picture and not user.avatar:
                try:
                    from django.core.files.base import ContentFile
                    import requests
                    response = requests.get(picture)
                    if response.status_code == 200:
                        file_name = f"{user.username}_avatar.jpg"
                        user.avatar.save(file_name, ContentFile(response.content), save=True)
                except Exception as e:
                    print(f"Failed to save Google avatar: {e}")

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            })

        except ValueError as e:
            return Response({'error': f'Invalid token: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Authentication failed: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
