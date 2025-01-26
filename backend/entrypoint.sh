#!/bin/sh

# Wait for database to be ready
echo "Waiting for PostgreSQL..."
while ! nc -z db 5432; do
    sleep 0.1
done
echo "PostgreSQL started"

# Run migrations
python manage.py migrate

# Create superuser if it doesn't exist
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='adminuser').exists():
    User.objects.create_superuser('adminuser', 'admin@example.com', 'Password123')
    print('Superuser created with username: adminuser')
else:
    print('Superuser already exists.')
END

# Start server
python manage.py runserver 0.0.0.0:8000 