# Api view of grades
from home.models import Grade
from Serializers.GradeSerializer import GradeSerializer
from api.services import handelFileSubmit

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser

class GradeAPIView(viewsets.ModelViewSet):
    serializer_class = GradeSerializer

    def get_queryset(self):
        user = self.request.user
        # If not logged in request.user is anonymous and is_staff=false
        if user.is_staff:
            grades = Grade.objects.all()
        else:
            grades = Grade.objects.filter(name=self.request.user)

        return grades

    def list(self, request, *args, **kwargs):
        user = request.user
        grades = self.get_queryset()
        return Response({"grades": self.get_serializer(grades, many=True).data, 
                         "user": user.name, 
                         "className": user.class_name, 
                         'studentId': user.student_id, 
                         'isStaff': user.is_staff})

    def delete(self, request, *args, **kwargs):
        pass

    @action(methods=['post'], detail=False, permission_classes=[IsAdminUser])
    def createOrUpdate(self, request, *args, **kwargs):

        errors = handelFileSubmit(request.FILES['file'])
        if errors:
            content = {'errMsg': errors}
            return Response(content, status=400)

        else: 
            content = {'success': True}
            return Response(content)
