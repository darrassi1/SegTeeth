# Use a lightweight Node.js base image
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the application for production
RUN npm run build

# Create a production image with minimal footprint
FROM nginx:1.23-alpine AS production

# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx with default configuration
CMD ["nginx", "-g", "daemon off;"]
