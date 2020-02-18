from django.contrib import admin
from .models import Student, Grade

# Register your models here.

class GradeAdmin(admin.ModelAdmin):
	fields = ['name', 'subject', 'test', 'score']
	list_display = ('name', 'subject', 'test', 'score')

class StudentAdmin(admin.ModelAdmin):
	# For add object
	fields = ['class_name', 'student_id', 'name', 'password', 'is_staff', ]
	# For list existing objects
	list_display = ('class_name', 'student_id', 'name', 'password', 'is_staff')


admin.site.register(Student, StudentAdmin)
admin.site.register(Grade, GradeAdmin)
