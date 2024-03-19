
#!/bin/sh

until cd /app/backend
do
    echo "Waiting for server volume..."
done


until python manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done


python manage.py collectstatic --noinput

# python manage.py createsuperuser --noinput
uvicorn --port 8080 makeeasyhmis.asgi:application
# gunicorn backend.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4
