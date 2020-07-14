# Api view of grades
from home.models import Grade
# from Serializers.GradeSerializer import FlatGradeSerializer
from api.services import handelFileSubmit, sendEmail, createTmpFile, getUserGrades

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import JSONParser

'''
GradeAPIView: basic oprations (updaste, create, delete, list, ...)

Return data format
Non-staff: 
{"grades":[
    {name":"张益凯","password":"1324","student_id":1,"class_name":"一（三）班",
    "test":"期末考试","subject":"数学","score":99.0,"id":38,"rank":1,"count":37,
    "avg":94.02,"max":99,"min":75.0,"pass_num":37}
    {name":"张益凯","password":"1324","student_id":1,"class_name":"一（三）班",
    "test":"期末考试","subject":"语文","score":99.0,"id":38,"rank":1,"count":37,
    "avg":94.02,"max":99,"min":75.0,"pass_num":37}
    ],
 "user":"张益凯",
 "className":一（三）班,
 "studentId":1,
 "isStaff":false}
 
Staff: 
{"grades":[
    {"name":"张益凯","password":"1324","student_id":1,"class_name":"一（三）班",
    "test":"期末考试","subject":"数学","score":99.0,"id":38}
    {"name":"常梦冉","password":"1324","student_id":1,"class_name":"一（三）班",
    "test":"期末考试","subject":"语文","score":99.0,"id":38}
    ],
 "user":"admin",
 "className":null,
 "studentId":null,
 "isStaff":true}
'''
class GradeAPIView(viewsets.ModelViewSet):
    # serializer_class = FlatGradeSerializer

    def list(self, request, *args, **kwargs):
        user = request.user

        grades = getUserGrades(user)
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

    @action(methods=['post'], detail=False)
    def sendReport(self, request, *args, **kwargs):
        user = request.user
        grades = getUserGrades(user, pk__in=request.data['ids'])
        tmp_file = createTmpFile(grades, prefix='GradesReport-', suffix='.xlsx')
        e = sendEmail(request.data['addresses'], 
            text='This is an auto-generated grade report (see attachment) from Transtribution.', 
            files=tmp_file).result()

        if e:
            return Response({'errMsg': e}, status=400)

        else:
            return Response(status=200)
