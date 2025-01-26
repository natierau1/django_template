# Basic Node image for development
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . /app/

# Default command: run the dev server
CMD ["npm", "start"] 