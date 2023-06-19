FROM node:18.16.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./


RUN npm install --global npm@6.14.13


# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use the official Nginx image as a second stage to serve the built app
FROM nginx:1.21.0-alpine

# Copy the built app to Nginx's default public folder
COPY --from=0 /app/build /usr/share/nginx/html

copy ./default.conf /etc/nginx/conf.d/

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
