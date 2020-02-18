from django import forms
from home.models import Student
from django.contrib.auth.forms import AuthenticationForm

class AuthForm(AuthenticationForm):
    username = forms.CharField(max_length=32)
    password = forms.CharField(max_length=18)

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'

