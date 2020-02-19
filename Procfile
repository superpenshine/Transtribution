release: python manage.py migrate
web: gunicorn aurora.wsgi -b 0.0.0.0:$PORT -w 1 --log-file -