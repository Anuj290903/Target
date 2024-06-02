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
from django.urls import path, include, re_path
from mainApp.views import login_view, logout_view, register_view, index, courses_view, courses_id, course_upload, upload
from django.conf import settings
from django.conf.urls.static import static
# router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='user')
# router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('login_api', login_view, name='login_api'),
    path('logout_api', logout_view, name='logout_api'),
    path('register_api', register_view, name='register_api'),
    path('courses_api', courses_view, name='courses_api'),
    path('courses_api/<int:ID>', courses_id, name='courses_id_api'),
    path('course_upload_api/<int:ID>', course_upload, name='course_upload_api'),
    path('upload_api/<int:ID>', upload, name='upload_api'),
    # path('', include(router.urls)),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*$', index)]    