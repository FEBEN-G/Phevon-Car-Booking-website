from django.urls import path
from .views import RegisterView, UserProfileView, VerifyEmailView
from .views import RegisterView, UserProfileView, VerifyEmailView
from . import password_reset, google_auth, contact
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', UserProfileView.as_view(), name='user_profile'),
    path('auth/forgot-password/', password_reset.request_password_reset, name='forgot-password'),
    path('auth/reset-password/', password_reset.reset_password_confirm, name='reset-password'),
    path('auth/contact/', contact.ContactMessageView.as_view(), name='contact-message'),
    path('auth/google/', google_auth.GoogleAuthView.as_view(), name='google-login'),
]
