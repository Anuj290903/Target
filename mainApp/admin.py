from django.contrib import admin
from .models import User, Course, Upload, Purchase
# Register your models here.

admin.site.register(User)
admin.site.register(Course)
admin.site.register(Upload)
admin.site.register(Purchase)