FROM node:16.14.0
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# fix vulneability
# RUN npm audit fix
# Build the app
RUN npm run build
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# get ready to serve
RUN npm install -g serve
# Start the app
CMD [ "npx", "serve", "build" ]
