from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views
from api.views import GradeAPIView

router = routers.DefaultRouter()
router.register(r'', GradeAPIView, 'grades')

for route in router.urls:
	print(route)

app_name = 'gradesAPI'
urlpatterns = [
    path('token_auth/', views.obtain_auth_token, name='api-token-auth'), 
    path('', include(router.urls), name='gradesAPI'), 
]