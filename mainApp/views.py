import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Course, Upload
from .serializers import CourseSerializer, UploadSerializer
from django.core import serializers
from django.conf import settings
from .forms import UploadForm

# Add website icon 
# Add access control for users and admin
# Recieve course id in upload function and implement video & file input
# Add video uploadability and extend on the course model  

def index(request):
    return render(request, "index.html")

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('username')
            password = data.get('password')

            # Check if email or password is missing
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)

            # Perform authentication
            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful'})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})

def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('username')
            password = data.get('password')

            # Check if email or password is missing
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)

            # Create user
            user = User.objects.create_user(email=email, password=password, username=email)
            user.save()

            return JsonResponse({'message': 'User created successfully'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def courses_view(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        courses_list = list(courses.values())
        return JsonResponse({'courses' : courses_list})
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            teacher = User.objects.get(username="Siddhant")
            course = Course(title=data.get('title'), description=data.get('description'), price=data.get('price'), published=data.get('published'), instructor=teacher)
            course.save()

            return JsonResponse({'Success': 'Saved Successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)  


@csrf_exempt
def courses_id(request, ID):
    try:
        course = Course.objects.get(id=ID)
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found'}, status=404)
    
    if request.method == 'DELETE':
        course.delete()
        return JsonResponse({'message': 'Course deleted successfully'}, status=200)

    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            course.title = data.get('title', course.title)
            course.description = data.get('description', course.description)
            course.price = data.get('price', course.price)
            course.published = data.get('published', course.published)
            # course.instructor = data.get('instructor', course.instructor)
            course.save()
            return JsonResponse({'message': 'Course updated successfully'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    elif request.method == 'GET':
        serializer = CourseSerializer(course)
        return JsonResponse({'course': serializer.data}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

def course_upload(request, ID):
    course = Course.objects.get(id=ID)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            upload = Upload(
                title=data.get('title'), 
                description=data.get('description', None),
                vidFile=data.get('vidFile', None),
                course=course,
                probSet=data.get('probSet', None)
            )
            upload.save()
            return JsonResponse({'Success': 'Uploaded Successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)  
    elif request.method == 'GET':
        uploads = Upload.objects.filter(course=course)
        uploads_list = list(uploads.values())
        return JsonResponse({'uploads' : uploads_list})
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def upload_id(request, ID):
    try:
        upload = Upload.objects.get(id=ID)
    except Upload.DoesNotExist:
        return JsonResponse({'error': 'Upload not found'}, status=404)
    
    if request.method == 'DELETE':
        upload.delete()
        return JsonResponse({'message': 'Upload deleted successfully'}, status=200)

    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            upload.title = data.get('title', upload.title)
            upload.description = data.get('description', upload.description)
            upload.vidFile = data.get('vidFile', upload.vidFile)
            # upload.course = data.get('course', upload.course)
            upload.probSet = data.get('probSet', upload.probSet)
            upload.save()
            return JsonResponse({'message': 'Upload updated successfully'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    elif request.method == 'GET':
        serializer = UploadSerializer(upload)
        return JsonResponse({'upload': serializer.data}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)