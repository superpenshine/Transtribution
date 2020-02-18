
from rest_framework.authentication import BaseAuthentication
from home.forms import AuthForm

class APICustomAuthentication(BaseAuthentication):

    def authenticate(self, request, username=None, password=None):
        form = AuthForm(request.POST)
        if form.is_valid():
            try:
                student = Student.objects.get(name=form.cleaned_data['name'], password=form.cleaned_data['pwd'])
                if student:
                    return student, None
                return None
            except Student.DoesNotExist:
                raise exceptions.AuthenticationFailed('No such student')

        else: 
            return HttpResponseBadRequest("Bad request")

    def get_user(self, user_id):
        try:
            return Student.objects.get(id=user_ide)
        except Student.DoesNotExist:
            return None
