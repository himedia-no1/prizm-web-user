FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

RUN corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN corepack prepare pnpm@latest --activate
COPY --from=builder /app ./

EXPOSE 8080
CMD ["pnpm", "start"]