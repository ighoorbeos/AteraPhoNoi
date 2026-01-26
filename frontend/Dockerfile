# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Build arguments for environment variables
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage - Simple static file server
FROM node:20-alpine
WORKDIR /app

# Copy built files
COPY --from=build /app/dist ./dist

# Install serve for simple static file serving
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "3000"]
