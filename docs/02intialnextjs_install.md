# Next.js Frontend Installation and Setup Guide

## Technology Stack

### Core Technologies
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Node.js >= 18.17.0

### UI Framework and Styling
- Tailwind CSS 3
- Shadcn/ui (Component Library)
- Radix UI (Primitive Components)
- Lucide Icons

### Development Tools
- pnpm (Package Manager)
- ESLint
- Prettier
- PostCSS

## Prerequisites

Before starting, ensure you have the following installed:
- Docker and Docker Compose
- Git
- Node.js >= 18.17.0 (for local development without Docker)
- pnpm >= 8.0.0 (for local development without Docker)

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   ├── styles/            # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Installation Methods

### Method 1: Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create a `.env` file in the root directory:
   ```env
   POSTGRES_DB=your_db_name
   POSTGRES_USER=your_db_user
   POSTGRES_PASSWORD=your_db_password
   DJANGO_SECRET_KEY=your_secret_key
   DJANGO_DEBUG=1
   DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
   ```

3. Start the development environment:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Method 2: Local Development Setup

1. Install pnpm globally:
   ```bash
   npm install -g pnpm@8
   ```

2. Install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Docker Development Environment

The Docker setup includes:
- Hot reloading for instant feedback
- Volume mounting for live code updates
- Proper networking between services
- Development-specific configurations

Key features:
- Changes to your code are reflected immediately
- Node modules are cached in a Docker volume
- Next.js build cache is preserved between restarts
- API requests are properly forwarded to the backend

### Environment Variables

Development environment variables are set in `docker-compose.yml`:
```yaml
environment:
  - NEXT_PUBLIC_API_URL=http://backend:8000
  - NEXT_TELEMETRY_DISABLED=1
  - NODE_ENV=development
  - WATCHPACK_POLLING=true
  - CHOKIDAR_USEPOLLING=true
```

### Available Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Production Deployment

The production Docker setup includes:
- Multi-stage build process for optimal image size
- Production-optimized Next.js build
- Standalone server configuration

To build for production:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## Troubleshooting

### Common Issues

1. Hot Reloading Not Working
   - Ensure Docker volumes are properly mounted
   - Check if file watching is enabled in Docker

2. API Connection Issues
   - Verify the NEXT_PUBLIC_API_URL environment variable
   - Check if the backend service is running

3. Build Failures
   - Clear Docker build cache: `docker-compose build --no-cache`
   - Remove node_modules: `rm -rf frontend/node_modules`

### Getting Help

If you encounter issues:
1. Check the Docker logs: `docker-compose logs frontend`
2. Verify your Node.js version matches the requirements
3. Ensure all required ports are available (3000, 8000)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Docker Documentation](https://docs.docker.com) 