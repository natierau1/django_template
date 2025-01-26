# Django React Template

A modern web application template using Django, React, and PostgreSQL with Docker Compose for development.

## Features

- Django backend with PostgreSQL
- React frontend with Material UI
- JWT Authentication with protected routes
- Docker Compose setup for development
- Automatic database migrations
- Default admin user creation
- Persistent database storage
- Network isolation between services
- Hot-reloading for both frontend and backend
- Comprehensive error handling

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
# PostgreSQL
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
- React Frontend: http://localhost:3000
  - Default credentials:
    - Username: adminuser
    - Password: Password123
- Django Admin: http://localhost:8000/admin
  - Same credentials as above

## Architecture

### Docker Configuration
- Separate development and production Dockerfiles
- Network isolation between services
- Named volumes for data persistence
- Health checks for database
- Environment variable management
- Hot-reloading configuration

### Authentication Flow
1. User attempts to access protected route
2. If not authenticated, redirected to login
3. Login form submits credentials to `/api/token/`
4. JWT token stored in localStorage
5. Protected routes check authentication status
6. Automatic token refresh handling

## API Endpoints

### Authentication
- POST `/api/token/` - Obtain JWT token pair
- POST `/api/token/refresh/` - Refresh JWT token
- GET `/api/user/info/` - Get current user info (protected)

### Example API Usage
```javascript
// Login
const response = await axios.post('http://localhost:8000/api/token/', {
  username: 'adminuser',
  password: 'Password123'
});
const { access, refresh } = response.data;

// Use token in requests
axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
```

## Project Structure
```
.
├── backend/                # Django application
│   ├── myproject/         # Django project settings
│   ├── Dockerfile.dev     # Development Dockerfile
│   ├── requirements.txt   # Python dependencies
│   └── entrypoint.sh     # Container entrypoint script
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── auth/         # Authentication logic
│   ├── Dockerfile.dev    # Development Dockerfile
│   └── package.json      # Node.js dependencies
├── .env                  # Environment variables
├── .gitignore
├── docker-compose.yml    # Docker Compose configuration
└── README.md
```

## Development

### Making Changes
- Backend changes will auto-reload
- Frontend changes will hot-reload
- Database data persists in named volumes
- Static files served from volume

### Adding Dependencies
- Python packages:
  ```bash
  docker-compose exec backend pip install <package>
  # Update requirements.txt
  docker-compose exec backend pip freeze > requirements.txt
  ```
- Node packages:
  ```bash
  docker-compose exec frontend npm install <package>
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

## Security Notes
- JWT tokens stored in localStorage
- CORS configured for development
- Debug mode enabled in development
- Database credentials in environment variables
- Network isolation between services

## Stopping the Application

```bash
# Stop containers
docker-compose down

# Stop containers and remove volumes (will delete database data)
docker-compose down -v
```

## Contributing
Feel free to submit issues and enhancement requests. 