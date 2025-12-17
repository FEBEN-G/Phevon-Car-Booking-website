import requests
from django.conf import settings
import uuid

class ChapaService:
    def __init__(self):
        self.secret_key = settings.CHAPA_SECRET_KEY
        self.base_url = "https://api.chapa.co/v1"

    def initiate_payment(self, payment, email, first_name, last_name):
        headers = {
            'Authorization': f'Bearer {self.secret_key}',
            'Content-Type': 'application/json'
        }
        
        tx_ref = f"PHEVON-{payment.id}-{uuid.uuid4().hex[:6]}"
        payment.transaction_id = tx_ref
        payment.save()
        
        payload = {
            'amount': str(payment.amount),
            'currency': payment.currency,
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'tx_ref': tx_ref,
            'callback_url': f"{settings.BACKEND_URL}/api/payments/chapa/callback/",
            'return_url': f"{settings.FRONTEND_URL}/payment/success",
            "customization[title]": "Car Booking Payment",
            "customization[description]": "Payment for car booking on Phevon"
        }
        
        try:
            response = requests.post(f"{self.base_url}/transaction/initialize", json=payload, headers=headers)
            return response.json()
        except Exception as e:
            return {'status': 'failed', 'message': str(e)}

    def verify_payment(self, tx_ref):
        headers = {
            'Authorization': f'Bearer {self.secret_key}',
        }
        try:
            response = requests.get(f"{self.base_url}/transaction/verify/{tx_ref}", headers=headers)
            return response.json()
        except Exception as e:
            return {'status': 'failed', 'message': str(e)}
