from rest_framework import serializers

from .models import Document, Category

class DocumentSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name',
        read_only=True
    )

    class Meta:
        model = Document

        fields = [
            'id',
            'title',
            'description',
            'file',
            'created_at',
            'updated_at',
            'category',
            'category_name',
            'uploaded_by',
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category

        fields = [
            'id',
            'name',
        ]



