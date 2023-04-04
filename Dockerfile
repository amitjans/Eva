# Use the official Node.js 14.16.0 image as the base image
FROM node:14.16.0

# Set the working directory
WORKDIR /app

# Install required packages
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        curl \
        lsb-release \
        sudo \
        alsa-utils \
        nginx

# Add Matrix repository and install packages
RUN curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add - && \
    echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        matrixio-kernel-modules \
        matrixio-creator-init libmatrixio-creator-hal libmatrixio-creator-hal-dev

# Install pm2
RUN npm install pm2 -g

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["pm2-runtime", "start", "app.js", "--name", "eva"]
