ARG NODE_VERSION=22-slim
FROM node:${NODE_VERSION} AS base
WORKDIR /app
# Устанавливаем pnpm и turbo глобально
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g turbo

# --- ЭТАП 1: Pruning (извлекаем только нужное для фронтенда)
FROM base AS prepare
COPY . .
RUN turbo prune web --docker

# --- ЭТАП 2: Builder (установка и сборка)
FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN pnpm install

COPY --from=prepare /app/out/full/ .
# Запускаем сборку через turbo.
# На выходе Vite создаст папку apps/web/dist
RUN turbo build --filter=web

# --- ЭТАП 3: Runner (раздача статики)
# Для React + Vite нам не нужен Node.js в продакшене, достаточно Nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Очищаем дефолтные файлы nginx
RUN rm -rf ./*

# Копируем результат сборки из этапа builder
# В Vite по умолчанию папка сборки называется dist
COPY --from=builder /app/apps/web/dist .

# Добавляем конфиг для React Router (чтобы пути типа /articles/1 не выдавали 404)
RUN echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
