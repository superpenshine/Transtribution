from aurora.settings.base import * 
import os

# Override base.py settings
DEBUG = True
ALLOWED_HOSTS = []

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

SMTP_HOST_ADDR = os.environ.get('SMTP_HOST_ADDR')
SMTP_HOST_PORT = os.environ.get('SMTP_HOST_PORT')
SMTP_HOST_USER = os.environ.get('SMTP_HOST_USER')
SMTP_HOST_PWD = os.environ.get('SMTP_HOST_PWD')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'aurora',
        'USER': os.environ.get("postgres_usr"),
        'PASSWORD': os.environ.get("postgres_pwd"),
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}