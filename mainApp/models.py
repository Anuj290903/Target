from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    published = models.BooleanField(default=False)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.title
