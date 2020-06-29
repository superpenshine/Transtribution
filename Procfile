release: python manage.py migrate
web: bin/start-nginx gunicorn aurora.wsgi -c config/gunicorn.conf.py