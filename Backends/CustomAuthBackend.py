from django.contrib.auth.backends import BaseBackend
from django.http import HttpResponseBadRequest
from home.models import Student

class CustomAuthBackend(BaseBackend):

  def authenticate(self, request, username=None, password=None):
      try:
          student = Student.objects.get(name=username, password=password)
          if student:
              return student
            
      except Student.DoesNotExist:
          return None

  def get_user(self, user_id):
      try:
          return Student.objects.get(id=user_id)
      except Student.DoesNotExist:
          return None
