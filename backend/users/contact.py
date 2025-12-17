from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

class ContactMessageView(APIView):
    permission_classes = []

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        subject = request.data.get('subject')
        message = request.data.get('message')

        if not all([name, email, subject, message]):
            return Response(
                {"error": "All fields are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            full_message = f"""
            New Contact Message from Phevon Website:
            ----------------------------------------
            Name: {name}
            Email: {email}
            Subject: {subject}
            
            Message:
            {message}
            """
            
            send_mail(
                subject=f"New Contact: {subject}",
                message=full_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['febengetachew580@gmail.com'],
                fail_silently=False,
            )
            
            return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Email Error: {e}")
            return Response(
                {"error": "Failed to send email"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
