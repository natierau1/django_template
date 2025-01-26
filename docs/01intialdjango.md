### Step-by-Step Docker Setup for Django with JWT API

## **1. Project File Structure**
Organize the Django project to support Docker and differentiate between development and production setups, including JWT for API authentication.

```
project-root/
├── .env
├── docker-compose.yml
├── docker-compose.prod.yml
├── backend/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── requirements/
│   │   ├── dev.txt
│   │   └── prod.txt
│   ├── manage.py
│   └── myproject/
│       ├── __init__.py
│       ├── settings.py
│       ├── urls.py
│       ├── wsgi.py
│       ├── asgi.py
│       └── apps/
│           └── auth/
│               ├── models.py
│               ├── views.py
│               ├── serializers.py
│               └── urls.py
├── postgres_data/ (Database volume)
```

---

## **2. Environment Variables**

Create a `.env` file for storing environment variables.

```env
# General
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=*

# Database
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Superuser credentials (for first-run creation)
DJANGO_SUPERUSER_USERNAME=adminuser
DJANGO_SUPERUSER_PASSWORD=adminpassword
DJANGO_SUPERUSER_EMAIL=admin@example.com
```

---

## **3. Docker Compose Configuration**

### `docker-compose.yml` (Development)

This setup enables hot reloading and connects Django to PostgreSQL.

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: django-backend
    env_file: .env
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    command: >
      sh -c "python manage.py migrate &&
             python manage.py runserver 0.0.0.0:8000"

  db:
    image: postgres:15-alpine
    container_name: postgres-db
    env_file: .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### `docker-compose.prod.yml` (Production)

This setup uses Gunicorn as the production WSGI server and disables hot reloading.

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        ENV=production
    container_name: django-backend-prod
    env_file: .env
    ports:
      - "8000:8000"
    depends_on:
      - db
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 3

  db:
    image: postgres:15-alpine
    container_name: postgres-db-prod
    env_file: .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

---

## **4. Dockerfile**

Use a multi-stage build to optimize the production build and reduce image size.

```dockerfile
# Stage 1: Base
FROM python:3.11-slim as base
WORKDIR /app

# Install dependencies for build
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Stage 2: Development
FROM base as development
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements/dev.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app/

# Entrypoint script
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

# Stage 3: Production
FROM base as production
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements/prod.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app/

# Entrypoint script
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
```

---

## **5. Entrypoint Script**

Create an `entrypoint.sh` script to handle database migrations and superuser creation.

```bash
#!/bin/bash

# Wait for the database to be ready
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Apply migrations
echo "Applying migrations..."
python manage.py migrate

# Create superuser if not exists
echo "Creating superuser..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists():
    User.objects.create_superuser(
        username='$DJANGO_SUPERUSER_USERNAME',
        email='$DJANGO_SUPERUSER_EMAIL',
        password='$DJANGO_SUPERUSER_PASSWORD'
    )
EOF

exec "$@"
```

---

## **6. Requirements Files**

### `requirements/dev.txt`
Include development dependencies:
```
Django==4.2
djangorestframework==3.14.0
djangorestframework-simplejwt==5.2.2
psycopg2-binary==2.9.6
django-cors-headers==3.14.0
```

### `requirements/prod.txt`
Include production dependencies (e.g., Gunicorn):
```
Django==4.2
djangorestframework==3.14.0
djangorestframework-simplejwt==5.2.2
psycopg2-binary==2.9.6
django-cors-headers==3.14.0
gunicorn==20.1.0
```

---

## **7. Add JWT Authentication**

### Settings Update (`settings.py`)

Add the following configurations to enable JWT:

```python
INSTALLED_APPS += [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]
```

---

### Create Authentication Endpoints (`apps/auth/views.py`)

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
```

---

### URL Configuration (`apps/auth/urls.py`)

```python
from django.urls import path
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
]
```

---

### Include Auth URLs (`urls.py`)

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.auth.urls')),
]
```

---

## **8. `.dockerignore`**

Exclude unnecessary files to reduce the build context.

```
# Python
__pycache__/
*.py[cod]

# Django static and media files
static/
media/

# Docker
docker-compose.override.yml
.dockerignore

# IDEs
.vscode/
.idea/

# OS-specific
.DS_Store
Thumbs.db
```

---

## **9. Running the Application**

### Development
1. Build and run:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - API: [http://localhost:8000](http://localhost:8000)
   - JWT Login: [http://localhost:8000/api/auth/login/](http://localhost:8000/api/auth/login/)

---

### Production
1. Build and run:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
   ```

2. Access the application:
   - Production: [http://localhost:8000](http://localhost:8000)

---

## **10. Testing Checklist**
- Verify that the database initializes correctly.
- Check superuser creation on the first run.
- Test JWT login via `/api/auth/login/`.
- Confirm protected endpoints return 401 for unauthenticated requests.
- Ensure the production build runs with Gunicorn.

---

Let me know if you'd like further refinements or details for any specific section!

