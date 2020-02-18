
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import LoginView
from home.forms import AuthForm, StudentForm
from django import forms

# 主界面
class Login(LoginView):

    template_name = 'index.html'
    authentication_form = AuthForm


# Login page Version 1.0
# Inherites Django view
# from django.shortcuts import render, redirect
# from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
# from django.views import View
# from home.models import Student, Grade

# from Serializers import StudentSerializer, GradeSerializer
# from rest_framework import generics

# class LoginView(View):

#     # Login request
#     def post(self, request):
#         # data = request.data
#         # serializer = StudentSerializer(data=data)
#         # usr = authenticate(request, serializer.name, serializer.pwd)

#         form = AuthForm(request.POST)
#         if form.is_valid():
#             usr = authenticate(request=request)
#             if usr:
#                 login(request, usr)
#                 request.session['usr_id'] = usr.id

#             return HttpResponseRedirect('/Grade')
#         return HttpResponseBadRequest("Bad request")



