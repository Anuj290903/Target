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
from django.core.exceptions import ValidationError
from collections import defaultdict
from django.db.models import Q
import Levenshtein

# Implement editability for admin in front-end
# Implement custom hooks to improve reusability
# Add access control for users and admin
# Implement React Query for making get requests
# Implement Context API for state management
# Imporve the search bar fuzzy accuracy and relevance ranking
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
        data = request.POST
        files = request.FILES
        teacher = User.objects.get(username="Siddhant")
        published_value = data.get('published')
        pubVal = False
        if published_value.lower() in ['true', '1']:
            pubVal = True
        elif published_value.lower() in ['false', '0']:
            pubVal = False
        else:
            raise ValidationError("Invalid value for published field")
        course = Course(title=data.get('title'), description=data.get('description', ""), price=data.get('price'), published=pubVal, instructor=teacher, image=files.get('image'))
        course.save()
        return JsonResponse({'Success': 'Saved Successfully'}) 

@csrf_exempt
def courses_id(request, ID):
    try:
        course = Course.objects.get(id=ID)
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found'}, status=404)
    
    if request.method == 'DELETE':
        if course.image:
            course.image.delete()
        course.delete()
        return JsonResponse({'message': 'Course deleted successfully'}, status=200)

    elif request.method == 'POST':
        try:
            data = request.POST
            files = request.FILES
            course.title = data.get('title', course.title)
            course.description = data.get('description', course.description)
            course.price = data.get('price', course.price)
            published_value = data.get('published')
            if published_value.lower() in ['true', '1']:
                course.published = True
            elif published_value.lower() in ['false', '0']:
                course.published = False
            else:
                raise ValidationError("Invalid value for published field")
            course.image = files.get('image', course.image)
            # course.instructor = data.get('instructor', course.instructor)
            course.save()
            return JsonResponse({'message': 'Course updated successfully'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    elif request.method == 'GET':
        serializer = CourseSerializer(course)
        return JsonResponse({'course': serializer.data}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

THRESHOLD = 2

def tokenize_string(string):
    return set(string.lower().split())

def calculate_similarity(string1, string2):
    if not string1 or not string2:
        return 100
    return Levenshtein.distance(string1.lower(), string2.lower()) 

def fuzzy_match(tokens, upload_ids_seen):
    upload_entities = Upload.objects.all()
    fuzzy_results = []

    for token in tokens:
        for upload in upload_entities:
            similarity = 100
            similarity = min(calculate_similarity(upload.title, token), similarity)
            if similarity <= THRESHOLD and upload.id not in upload_ids_seen:
                fuzzy_results.append({
                    'id': upload.id,
                    'title': upload.title,
                    'description': upload.description,
                    'course_id': upload.course,
                    'uploaded_at': upload.uploaded_at,
                    'vidFile': upload.vidFile,
                    'probSet': upload.probSet,
                })
                upload_ids_seen.add(upload.id)

    # Sort fuzzy_results by similarity (Levenshtein distance) in ascending order
    # fuzzy_results.sort(key=lambda x: x[1])

    return fuzzy_results[:50]

def search_view(request, query):
    tokens = query.split()
    upload_query = Q()
    upload_ids_seen = set()
    for token in tokens:
        upload_query |= Q(**{f'title__istartswith': token})

    upload_results = Upload.objects.filter(upload_query)[:50]
    for upload in upload_results:
        upload_ids_seen.add(upload.id)
    upload_results = list(upload_results.values())
    if len(upload_results) < 50:    
        fuzzy_results = fuzzy_match(tokens, upload_ids_seen) 
        upload_results = upload_results + fuzzy_results
    print("Size of upload_results:", len(upload_results))
    print(upload_results)
    return JsonResponse({'results': upload_results})

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