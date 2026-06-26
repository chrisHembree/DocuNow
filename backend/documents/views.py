from django.http import JsonResponse

from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status

from .models import Document, Category
from .serializers import (
    DocumentSerializer,
    CategorySerializer,
)

from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework import generics
from django.contrib.auth import authenticate

from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters

from rest_framework.permissions import IsAuthenticated
from .permissions import (
    CanViewDocuments,
    CanUploadDocuments,
    CanModifyDocuments,
)





def test_view(request):
    return JsonResponse({
        "message": "Hello from Django!"
    })


class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    filter_backends = [filters.SearchFilter]

    search_fields = [
    'title',
    'description',
    'tags',
    'category__name',
]

class DocumentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [
                IsAuthenticated(),
                CanViewDocuments(),
            ]

        return [
            IsAuthenticated(),
            CanModifyDocuments(),
        ]

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {'error': 'Invalid credentials'},
                status=400
            )

        token, created = Token.objects.get_or_create(
            user=user
        )

        return Response({
            'token': token.key,
            'username': user.username,
        })




















    
    