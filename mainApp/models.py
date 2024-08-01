from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, is_staff=False, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), first_name=first_name, last_name=last_name, is_staff=is_staff)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, is_staff, password):
        user = self.create_user(email, first_name, last_name, is_staff, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'is_staff']

    def get_full_name(self):
        return self.first_name 
        #  + " " + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

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

class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='purchases')
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + "-" + self.course.title