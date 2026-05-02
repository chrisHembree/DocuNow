from django.http import JsonResponse

from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status

from .models import Document
from .serializers import DocumentSerializer

from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework import generics




def test_view(request):
    return JsonResponse({
        "message": "Hello from Django!"
    })


class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


    