FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN addgroup -S nginx && adduser -S nginx -G nginx
RUN chown -R nginx:nginx /usr/share/nginx /var/cache/nginx /var/run
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/out ./
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]