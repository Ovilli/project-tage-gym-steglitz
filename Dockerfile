# --- Build stage: install deps (compiles better-sqlite3 native binding) ---
FROM node:20-bookworm-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json ./
RUN npm install --omit=dev

# --- Runtime stage ---
FROM node:20-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package.json server.js ./
COPY public ./public
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 3000
ENV PORT=3000 DB_PATH=/app/data/showcase.db
CMD ["node", "server.js"]
