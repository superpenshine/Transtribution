from django.db import models
from django.db.models import Count, Avg, Max, Min, Q
# V1 user profile
# class Student(models.Model):
#     name = models.CharField(max_length=32, blank=False)
#     student_id = models.PositiveSmallIntegerField()
#     pwd = models.CharField(max_length=18, blank=False)
#     class_name = models.CharField(max_length=32)

#     class Meta:
#         db_table = 'student'

#     def __str__(self):
#         return f'\n{self.name}_{self.class_name}_{self.student_id}'


# V2 inherite AbsBaseUser which allows non-unique USERNAME_FIELD
# PermissionsMixin gives is_superuser, groups, user_permissions
# AbstractBaseUser gives password, last_login

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .customUserManager import CustomUserManager

from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

class Student(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=32, blank=False)
    password = models.CharField(max_length=128, blank=False)
    student_id = models.PositiveSmallIntegerField(null=True)
    class_name = models.CharField(max_length=32, null=True)

    # Attri from AbstractUser
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    # Can be duplicated attr (need custom authentication)
    USERNAME_FIELD = 'name'
    # colum used in USERNAME_FIELD is required by default
    REQUIRED_FIELDS = ['password']
    objects = CustomUserManager()

    class Meta:
        db_table = 'student'
        unique_together = ('name', 'password')

    def __str__(self):
        return f'\n{self.name}_{self.class_name}_{self.student_id}_{self.password}_{self.date_joined}'

class GradeQuerySet(models.QuerySet):

    # Grade count, avg, max, min, passed grade number of all test
    # example: class_grades_stats = Grade.objects.get_grade_stats(pass_grade=60)
    def get_grade_stats(self, pass_grade=60):
        return self.values('test', 'subject').annotate(count=Count('id'), avg=Avg('score'), max=Max('score'), min=Min('score'), pass_num=Count('id', filter=Q(score__gte=pass_grade)))

    # Grade count, avg, max, min, passed grade number of specified test
    def get_test_stats(self, subject, test, pass_grade=60):
        return self.filter(subject=subject, test=test).aggregate(count=Count('id'), avg=Avg('score'), max=Max('score'), min=Min('score'), pass_num=Count('id', filter=Q(score__gte=pass_grade)))

class Grade(models.Model):
    test = models.CharField(max_length=62, blank=False)
    subject = models.CharField(max_length=32, blank=False)
    name = models.ForeignKey(Student, on_delete=models.CASCADE, blank=False)
    score = models.FloatField(blank=False)
    # Shortcut to add a duplicated method in custom model manager
    objects = GradeQuerySet.as_manager()

    class Meta:
        db_table = 'grades'
        unique_together = ('name', 'subject', 'test')

    def __str__(self):
        return f'\n{self.name}_{self.subject}_{self.test}_{self.score}'

