from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from bookings.models import Booking
from .models import Payment
from .services import ChapaService

class InitiatePaymentView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        booking_id = request.data.get('booking_id')
        provider = request.data.get('provider', 'CHAPA')
        
        booking = get_object_or_404(Booking, id=booking_id, user=request.user)
        
        if booking.status not in ['PENDING']:
             return Response({'error': 'Booking is not pending payment'}, status=status.HTTP_400_BAD_REQUEST)

        # Create Payment Record
        payment = Payment.objects.create(
            booking=booking,
            user=request.user,
            amount=booking.total_price,
            currency='ETB', # Simplified
            provider=provider
        )
        
        if provider == 'CHAPA':
            chapa = ChapaService()
            result = chapa.initiate_payment(
                payment, 
                request.user.email, 
                request.user.first_name, 
                request.user.last_name
            )
            
            if result.get('status') == 'success':
                return Response({
                    'payment_url': result['data']['checkout_url'],
                    'tx_ref': payment.transaction_id
                })
            else:
                return Response({'error': 'Failed to initiate Chapa payment', 'details': result}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'error': 'Provider not supported yet'}, status=status.HTTP_400_BAD_REQUEST)

class ChapaVerifyView(views.APIView):
    # This might be called by frontend after return, or we rely on webhook
    permission_classes = [permissions.AllowAny]

    def get(self, request, tx_ref):
        try:
            payment = Payment.objects.get(transaction_id=tx_ref)
        except Payment.DoesNotExist:
             return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
             
        chapa = ChapaService()
        result = chapa.verify_payment(tx_ref)
        
        if result.get('status') == 'success':
            payment.status = 'COMPLETED'
            payment.provider_ref = result['data'].get('reference')
            payment.save()
            
            # Update Booking
            payment.booking.status = 'CONFIRMED'
            payment.booking.save()
            
            return Response({'status': 'verified'})
        
        return Response({'status': 'failed', 'details': result}, status=status.HTTP_400_BAD_REQUEST)
