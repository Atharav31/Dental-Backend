# Use the official Node.js image as the base image
FROM node:20

# Set the working directory of image 
WORKDIR /user/src/app

# Copy package.json and package-lock.json files yaha se leke workdir m daal dega
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application whatever  is written with cmd means yeh container run krega
CMD ["node", "index.js"]