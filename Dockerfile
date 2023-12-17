# Use a lightweight Node.js image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install development dependencies (you may omit this step if not needed)
RUN npm install --omit=development

# Copy the rest of your application code and configuration
COPY . .

# Install a compatible version of npm
RUN npm install -g npm@7

# Install global npm packages
RUN npm install -g rimraf
RUN npm install -g typescript

# Create the /app/output directory
RUN mkdir /app/output

# Build your TypeScript code
RUN npm run build

# Specify the command to start your application
CMD ["npm", "run", "start:server"]
