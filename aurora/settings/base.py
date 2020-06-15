import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'e0fl)kreaa^*3kukx5a=vgtr9#(&2%=)hneub^wn@phd7@42)i'

# Application definition

INSTALLED_APPS = [
    'api', 
    'home', 
    'grades', 
    'rest_framework',
    'rest_framework.authtoken', 
    'django_extensions', 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# rest framework settings. Token Auth for API
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication', 
    ), 
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated', 
    ), 
}

AUTH_USER_MODEL = 'home.Student'
LOGIN_REDIRECT_URL = '/grades/'

AUTHENTICATION_BACKENDS = (
    'Backends.CustomAuthBackend.CustomAuthBackend', 
    'django.contrib.auth.backends.ModelBackend', )

ROOT_URLCONF = 'aurora.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR+"/Template/", os.path.join(BASE_DIR, 'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'aurora.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Vancouver'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (where CSS, JavaScript, Images located)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "Static"), # Backend static files
    os.path.join(BASE_DIR, "dist"), # Frontend packed static files
    os.path.join(BASE_DIR, "dist/fonts"), # Frontend packed static files
]
# Where to put all static files collected under STATICFILES_DIRS into
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# folder where static file copies from STATIC_ROOT is served
STATIC_URL = '/static/'