# Use a slim Python image
FROM python:3.11-slim

# System deps
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy requirements
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . /app/

# Make entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script as the default command
CMD ["/app/entrypoint.sh"]

# By default, the container will run manage.py commands (see docker-compose.yml) 