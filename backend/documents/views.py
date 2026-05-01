from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Document
from .serializers import DocumentSerializer





def test_view(request):
    return JsonResponse({
        "message": "Hello from Django!"
    })



@api_view(['GET', 'POST'])
def upload_document(request):

    if request.method == 'GET':
        documents = Document.objects.all()
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DocumentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



