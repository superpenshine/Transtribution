from rest_framework import serializers
from home.models import Grade, Student
from Serializers.StudentSerializer import StudentSerializer, StudentSoftSerializer
from django.core.exceptions import MultipleObjectsReturned

'''
Undocumented serializer validation steps: 
    # 1. Field deserialization called (serializer.to_internal_value and field.run_validators)
    # 2. serializer.validate_[field] is called for each field
    # 3. Serializer-level validators are called (serializer.run_validation followed by serializer.run_validators)
    # 4. serializer.validate is called
'''

class GradeSerializer(serializers.Serializer):
    name = StudentSoftSerializer()
    test = serializers.CharField(max_length=62, required=True)
    subject = serializers.CharField(max_length=32, required=True)
    score = serializers.FloatField()
    id = serializers.IntegerField(label='ID', read_only=True)

    def create(self, validated_data):
        grade = Grade(**validated_data)
        grade.save()

        return grade

    def update(self, instance, validated_data):
        instance.score = validated_data['score']
        instance.save()

        return instance

    ''' 
    Validate 'name' and map 'name' to user, used as custom field validation in the serializer validation steps.
    '''
    def validate_name(self, s_data):

        # Try identify student
        datakeys = list(s_data.keys())
        user_atr = {}
        for atr in {'name', 'student_id', 'class_name'}:
            if atr in datakeys:
                user_atr[atr] = s_data[atr] 

        try:
            student = Student.objects.get(**user_atr)
            if 'password' in datakeys and s_data['password'] is not '':
                # Will hash the password, but is costly
                # student.set_password(s_data['password'])
                student.password = s_data['password']
                student.save()

        # Create new obj
        except Student.DoesNotExist:
            ser = StudentSerializer(data=s_data)
            if ser.is_valid():
                student = Student(**ser.validated_data)
                student.save()
            else:
                raise serializers.ValidationError(f"Multiple student found with information {dict(s_data)}. To create new student, you must provide name, password student_id and class_name.")

        except MultipleObjectsReturned:
            raise serializers.ValidationError(f"Multiple student found with information {dict(s_data)}, try provide more information such as name, student_id and class_name.")

        return student


class GradeListSerializer(serializers.ListSerializer):
    child = GradeSerializer()

    # Save and return a list of object instances.
    def save(self, **kwargs):
        validated_data = [
            dict(list(attrs.items()) + list(kwargs.items()))
            for attrs in self.validated_data
        ]
        ret = []

        for data in validated_data:
            try: 
                instance = Grade.objects.get(name=data['name'], test=data['test'], subject=data['subject'])
                grade = self.update(instance, data)
                assert grade is not None, (
                    f'`GradeListSerializer.update()` did not return an object instance with information {dict(data)}.'
                )

            except Grade.DoesNotExist:
                grade = self.create(data)
                assert grade is not None, (
                    f'`GradeListSerializer.create()` did not return an object instance with information {dict(data)}.'
                )

            except MultipleObjectsReturned:
                print(f"ERROR: Grade data integrity error. Multiple grades of with information {dict(data)} found.")

            ret.append(grade)

        return grade

    def create(self, data):
        return self.child.create(data)

    def update(self, instance, data):
        return self.child.update(instance, data)
