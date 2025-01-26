# Basic Node image for development
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the frontend code
COPY . .

# Build the application
RUN npm run build

# Default command: run the dev server
CMD ["npm", "start"] 