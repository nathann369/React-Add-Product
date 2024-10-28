from django.urls import path
from .views import get_products, create_product, product_detail

urlpatterns = [
    path('products/', get_products, name='get_products'),
    path('products/create/', create_product, name='create_products'),
    path('products/<int:pk>', product_detail, name='product_detail')
]