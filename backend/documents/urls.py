from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='test-view'),
    path('documents/', views.upload_document),
]















