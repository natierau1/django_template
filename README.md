# Django React Template

A modern web application template using Django, React, and PostgreSQL with Docker Compose for development.

## Features

- Django backend with PostgreSQL
- React frontend with hot-reloading
- Docker Compose setup for development
- Automatic database migrations
- Default admin user creation
- Persistent database storage

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Create a `.env` file in the root directory (or copy from .env.example):
```bash
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword

# Django
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=1
DJANGO_ALLOWED_HOSTS=*
```

3. Build and start the containers:
```bash
docker-compose up --build
```

4. Access the applications:
- Django Admin: http://localhost:8000/admin
  - Username: adminuser
  - Password: Password123
- React Frontend: http://localhost:3000
- PostgreSQL: localhost:5432

## Development

### Project Structure
```
.
├── backend/             # Django application
│   ├── myproject/      # Django project settings
│   ├── Dockerfile
│   ├── requirements.txt
│   └── entrypoint.sh
├── frontend/           # React application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── .env               # Environment variables
├── .gitignore
├── docker-compose.yml
└── README.md
```

### Making Changes

- Backend changes will auto-reload
- Frontend changes will hot-reload
- Database data persists in named volumes

### Adding Dependencies

- Python packages: Add to `backend/requirements.txt`
- Node packages: Run inside frontend container:
  ```bash
  docker-compose exec frontend npm install <package-name>
  ```

## Database Management

### Creating Backups
```bash
docker-compose exec db pg_dump -U myuser mydb > backup.sql
```

### Restoring Backups
```bash
docker-compose exec -T db psql -U myuser mydb < backup.sql
```

## Stopping the Application

```bash
# Stop containers
docker-compose down

# Stop containers and remove volumes (will delete database data)
docker-compose down -v
``` 