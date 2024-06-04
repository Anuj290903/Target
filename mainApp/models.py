from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_delete
from django.dispatch import receiver

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

def validate_image_file(file):
    if not file.name.endswith(('.jpg', '.jpeg', '.png', '.gif')):
        raise ValidationError('Invalid file type: only .jpg, .jpeg, .png, .gif files are allowed.')

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    published = models.BooleanField(default=False)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    image = models.FileField(blank=True, null=True, upload_to='image/', validators=[validate_image_file])

    def __str__(self):
        return self.title

def validate_video_file(file):
    if not file.name.endswith(('.mp4', '.avi', '.mov', '.mkv')):
        raise ValidationError('Invalid file type: only .mp4, .avi, .mov, .mkv files are allowed.')

def validate_pdf_file(file):
    if not file.name.endswith('.pdf'):
        raise ValidationError('Invalid file type: only .pdf files are allowed.')

class Upload(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    vidFile = models.FileField(blank=True, null=True, upload_to='video/', validators=[validate_video_file])
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='uploads')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    probSet = models.FileField(blank=True, null=True, upload_to='pdf/', validators=[validate_pdf_file])

    def __str__(self):
        return self.title
