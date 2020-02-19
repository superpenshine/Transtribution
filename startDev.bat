start cmd /k "cd /d %~dp0\venv\Scripts && activate && cd /d %~dp0 && python manage.py runserver --setting aurora.settings.dev"
start cmd /k "cd /d %~dp0\venv\Scripts && activate && cd /d %~dp0 && npm start"
