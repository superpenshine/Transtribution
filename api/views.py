# Api view of grades
from home.models import Grade
from Serializers.GradeSerializer import GradeSerializer
from api.services import handelFileSubmit
from django.db.models import Count, Avg, Max, Min, Q

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser

'''
Returned data format:
{"grades":[{"name":{"name":"张益凯","password":"1324","student_id":1,
"class_name":"一（三）班"},"test":"期末考试","subject":"数学","score":99.0,
"id":38}],"user":"admin","className":null,"studentId":null,"isStaff":true}
'''
class GradeAPIView(viewsets.ModelViewSet):
    serializer_class = GradeSerializer

    def get_grade_data(self):
        user = self.request.user
        # If not logged in request.user is anonymous and is_staff=false
        if user.is_staff:
            grade_data = self.get_serializer(Grade.objects.all(), many=True).data
        else:
            grade_data = self.get_serializer(Grade.objects.filter(name=self.request.user), many=True).data
            class_grades = Grade.objects.filter(name__class_name=user.class_name)
            for grade in grade_data:
                subject, test, score = grade['subject'], grade['test'], grade['score']
                # Get ranking #
                grade.update(class_grades.aggregate(rank=Count('id', filter=Q(subject=subject, test=test, score__gte=score))))
                # Get test stats
                grade.update(class_grades.get_test_stats(subject, test, pass_grade=60))

        return grade_data

    def list(self, request, *args, **kwargs):
        user = request.user
        grades = self.get_grade_data()

        return Response({"grades": grades, 
                         "user": user.name, 
                         "className": user.class_name, 
                         'studentId': user.student_id, 
                         'isStaff': user.is_staff})

    # Deletion not supported
    def delete(self, request, *args, **kwargs):
        pass

    @action(methods=['post'], detail=False, permission_classes=[IsAdminUser])
    def createOrUpdate(self, request, *args, **kwargs):

        errors = handelFileSubmit(request.FILES['file'])
        if errors:
            return Response({'errMsg': [error for error in errors if error]}, status=400)

        else: 
            return self.list(request)
