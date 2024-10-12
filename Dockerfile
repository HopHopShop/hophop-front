# Use the official Node.js image as the base image
FROM node:18.18.0 as base

ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG CORS_ALLOWED_ORIGINS

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" && \
    echo "NEXTAUTH_URL=$NEXTAUTH_URL" && \
    echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" && \
    echo "CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS"


ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS

# Build the Next.js application
RUN npm run build

# Use web server to serve the application
FROM node:18.18.0

# Set working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=base /app/next.config.mjs ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY scripts ./scripts
RUN chmod +x /app/scripts/run.sh

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["/app/scripts/run.sh"]
