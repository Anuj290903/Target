from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Course, Upload

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'password')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = '__all__'

    # def validate_vid_file(self, value):
    #     if not value.name.endswith(('.mp4', '.avi', '.mov', '.mkv')):
    #         raise serializers.ValidationError('Invalid file type: only .mp4, .avi, .mov, .mkv files are allowed.')
    #     return value

    # def validate_prob_set(self, value):
    #     if not value.name.endswith('.pdf'):
    #         raise serializers.ValidationError('Invalid file type: only .pdf files are allowed.')
    #     return value        
