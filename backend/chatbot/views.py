from rest_framework import views, status, permissions
from rest_framework.response import Response
from .models import ChatMessage
from .services import GeminiService

class ChatView(views.APIView):
    permission_classes = [permissions.AllowAny]  # Allow both authenticated and anonymous

    def post(self, request):
        message = request.data.get('message')
        if not message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Build user context
        user_context = {}
        if request.user.is_authenticated:
            user_context['username'] = request.user.username
            # Could add booking history here
        
        # Get AI response
        gemini = GeminiService()
        ai_response = gemini.get_response(message, user_context)
        
        # Save to database
        chat_message = ChatMessage.objects.create(
            user=request.user if request.user.is_authenticated else None,
            session_id=request.data.get('session_id'),  # Frontend can generate a session ID
            message=message,
            response=ai_response
        )
        
        return Response({
            'id': chat_message.id,
            'message': message,
            'response': ai_response,
            'timestamp': chat_message.timestamp
        })

class ChatHistoryView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        messages = ChatMessage.objects.filter(user=request.user)[:20]
        data = [{
            'id': msg.id,
            'message': msg.message,
            'response': msg.response,
            'timestamp': msg.timestamp
        } for msg in messages]
        
        return Response(data)
