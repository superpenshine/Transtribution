from rest_framework import serializers
from home.models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

# Only check if provided fields is valid, validator should be enforced using StudentSerializer
class StudentSoftSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=32, required=False)
    password = serializers.CharField(max_length=18, required=False)
    student_id = serializers.IntegerField(required=False)
    class_name = serializers.CharField(max_length=32, required=False)

    # class Meta:
    #     validators = [serializers.UniqueTogetherValidator(queryset=Student.objects.all(), fields=('name', 'password'))]
