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




def test_view(request):
    return JsonResponse({
        "message": "Hello from Django!"
    })


class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer






















    
    