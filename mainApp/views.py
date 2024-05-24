from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
# from .forms import User
from .models import User
from django.conf import settings

# Improve feature : Correct image upload

def index(request):
    return render(request, "index.html")

def login_view(request):
    pass

def logout_view(request):
    pass

def register_view(request):
    pass