FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Install gettext for envsubst
RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html
# Store as template — envsubst fills in $BACKEND_URL at container start
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 80

# Default fallback so nginx starts even if BACKEND_URL is not yet set
ENV BACKEND_URL=http://localhost:3001

# Substitute env vars into nginx config, then start nginx
CMD ["/bin/sh", "-c", "envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -t && nginx -g 'daemon off;'"]
