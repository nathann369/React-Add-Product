from django.db import models

# Models.
class Product(models.Model):
    product_name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.product_name