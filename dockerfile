# ----------------------------------------------------
# STEP 1: Build Angular app using Node
# ----------------------------------------------------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ----------------------------------------------------
# STEP 2: Serve app using NGINX
# ----------------------------------------------------
FROM nginx:alpine

# Copy built Angular files to nginx html folder
COPY --from=build /app/dist/video-stream/ /usr/share/nginx/html/

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default NGINX port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
