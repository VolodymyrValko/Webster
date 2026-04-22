FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 80

# Defaults — Railway overrides PORT at runtime; BACKEND_URL must be set in Railway Variables
ENV PORT=80
ENV BACKEND_URL=http://localhost:3001

CMD ["/bin/sh", "-c", "envsubst '$PORT $BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -t && nginx -g 'daemon off;'"]
