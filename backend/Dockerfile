FROM node:16.14-alpine3.15

WORKDIR /opt/

# Install dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i

# Copy everything else 
COPY ./ ./
