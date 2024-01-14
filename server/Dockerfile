# Use an official Node runtime as the base image
FROM node:20-alpine as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the app
RUN npm run build

# Start from a base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Bundle app source
COPY --from=build /app/.output ./output

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "./output/server/index.mjs" ]
