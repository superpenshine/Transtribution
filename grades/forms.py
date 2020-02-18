from django import forms
from home.models import Grade

class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = '__all__'

