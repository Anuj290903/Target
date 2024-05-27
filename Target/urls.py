"""
URL configuration for Target project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from mainApp.views import login_view, logout_view, register_view, index, courses_view, courses_id, course_upload, upload_id

# router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='user')
# router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('login', login_view, name='login'),
    path('logout', logout_view, name='logout'),
    path('register', register_view, name='register'),
    path('courses', courses_view, name='courses'),
    path('courses/<int:ID>', courses_id, name='courses_id'),
    path('course_upload/<int:ID>', course_upload, name='course_upload'),
    path('upload/<int:ID>', upload_id, name='upload_id'),
    # path('', include(router.urls)),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
