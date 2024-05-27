from django.forms import ModelForm
from .models import User, Course, Upload
from django import forms

class UploadForm(forms.ModelForm):
    class Meta:
        model = Upload
        fields = '__all__'

    def clean_vid_file(self):
        vid_file = self.cleaned_data.get('vid_file', False)
        if vid_file:
            if not vid_file.name.endswith(('.mp4', '.avi', '.mov', '.mkv')):
                raise forms.ValidationError('Invalid file type: only .mp4, .avi, .mov, .mkv files are allowed.')
        return vid_file

    def clean_prob_set(self):
        prob_set = self.cleaned_data.get('prob_set', False)
        if prob_set:
            if not prob_set.name.endswith('.pdf'):
                raise forms.ValidationError('Invalid file type: only .pdf files are allowed.')
        return prob_set
