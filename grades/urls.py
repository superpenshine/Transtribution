from django.urls import path
from grades.views import GradeView

# Create your views here.
app_name = 'grades'
urlpatterns = [
    path('', GradeView.as_view(), name='grades'), 
]
