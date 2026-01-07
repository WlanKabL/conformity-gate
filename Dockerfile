# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies (production only)
COPY package*.json ./
RUN npm ci --only=production

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", ".output/server/index.mjs"]
