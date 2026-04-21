from django.contrib import admin
from .models import Document, Category, Tag


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'uploaded_by', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('category', 'tags', 'created_at')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)



    