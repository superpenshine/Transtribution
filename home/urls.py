from django.urls import path
from home.views import Login

app_name = 'home'
urlpatterns = [
    # path('login/', LoginView.as_view(), name='login'), 
    path('', Login.as_view(), name='login'), 
]
