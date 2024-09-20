# Use an official Node.js runtime as a parent image
FROM node:20.12.0-alpine3.19


# Set the working directory inside the container
WORKDIR /app

# Copy all files
COPY . .

# List files before running npm install
RUN ls -al


# Install dependencies
RUN npm install


# Expose the port your app runs on
EXPOSE 3001


# Command to run the application
CMD ["npm", "start"]
