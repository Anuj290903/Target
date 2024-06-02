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

# Add image upload in courses
# Add access control for users and admin
# Implement React Query for making get requests
# Implement Context API for state management
# Add a search bar for courses
# Completely transform and improve the front-end.
# Texts are slightly left shifted and all characters are not visible
# for no courses (in ShowCourse) and no uploads in (ShowUploads)
# Implement Shared Database and Cloud Service
# Add payment gateway
# Add live video and chat functionality in course (WebRTC) 

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
        data = request.POST
        vidFile = request.FILES.get('vidFile', None)
        probSet = request.FILES.get('probSet', None)
        
        upload = Upload(
            title=data.get('title'), 
            description= data.get('description', ""), 
            course=course, 
            vidFile=vidFile, 
            probSet=probSet,
        )
        upload.save()
        return JsonResponse({'Success' : 'Created Successfully'}, status=201) 
    elif request.method == 'GET':
        uploads = Upload.objects.filter(course=course)
        uploads_list = list(uploads.values())
        return JsonResponse({'uploads' : uploads_list})
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def upload(request, ID):
    try:
        upload = Upload.objects.get(id=ID)
    except Upload.DoesNotExist:
        return JsonResponse({'error': 'Upload not found'}, status=404)
    
    if request.method == 'DELETE':
        if upload.vidFile:
            upload.vidFile.delete()
        if upload.probSet:
            upload.probSet.delete()
        upload.delete()
        return JsonResponse({'message': 'Upload deleted successfully'}, status=200)

    elif request.method == 'POST':
        data = request.POST

        for key, value in data.items():
            print(f"POST key: {key}, value: {value}")

        if data.get('title'):
            upload.title = data.get('title')
        if data.get('description'):
            upload.description=data.get('description')
        print(f"Title: {upload.title} Description: {upload.description}")
        vidFile = (request.FILES.get('vidFile'))
        probSet = (request.FILES.get('probSet'))
        if vidFile:
            if upload.vidFile:
                upload.vidFile.delete(save=False)
            upload.vidFile = vidFile
        if probSet:
            if upload.probSet:
                upload.probSet.delete(save=False)
            upload.probSet = probSet

        upload.save()
        return JsonResponse({'message': 'Upload updated successfully'}, status=200)

    elif request.method == 'GET':
        serializer = UploadSerializer(upload)
        return JsonResponse({'upload': serializer.data}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)