from django.urls import path
from .views import InitiatePaymentView, ChapaVerifyView

urlpatterns = [
    path('payments/initiate/', InitiatePaymentView.as_view(), name='payment-initiate'),
    path('payments/chapa/verify/<str:tx_ref>/', ChapaVerifyView.as_view(), name='chapa-verify'),
]
