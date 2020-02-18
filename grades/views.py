# Non-api view of grades
from django.shortcuts import render
from django.http import HttpResponseForbidden
from django.views import View
from home.models import Student, Grade

from Serializers.GradeSerializer import GradeSerializer
from grades.forms import GradeForm
from home.forms import StudentForm
from django.forms import modelformset_factory

# Grade view V1 using manual session management
# class GradeView(View):

#     # Grades lookup
#     def get(self, request):
#         try:
#             usr = Student.objects.get(id = request.session['usr_id'])
#         except KeyError:
#             # No login records
#             return HttpResponseForbidden()

#         # Both .values() and serializer work
#         grades = list(Grade.objects.filter(name=usr.id).values())
#         # grades = GradeSerializer(Grade.objects.filter(name=usr.id), many=True).data
        
#         # This would also work...
#         # GradeFormset = modelformset_factory(Grade, extra=0, fields='__all__')
#         # grades = GradeFormset(queryset=Grade.objects.filter(name=usr.id)).get_queryset()
#         # import pdb
#         # pdb.set_trace()
#         context = {'name': usr.name, 
#                    'class_name': usr.class_name, 
#                    'student_id': usr.student_id, 
#                    'grades': grades}

#         return render(request, 'grades.html', context)

# V2 getting user from request.user
class GradeView(View):

    # Grades lookup
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            if request.user.is_staff:
              grades = list(Grade.objects.all())
            else:
              grades = list(Grade.objects.filter(name=user).values())
            context = {'name': user.name, 
                       'class_name': user.class_name, 
                       'student_id': user.student_id, 
                       'grades': grades}

            return render(request, 'grades.html', context)

        return HttpResponseForbidden()
