# Use an official Node runtime as the base image
FROM node:20-alpine as base

# deps stage
FROM base as deps
WORKDIR /app
COPY package.json .
RUN npm install
# build stage
FROM deps as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "preview" ]