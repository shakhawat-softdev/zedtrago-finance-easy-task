# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/
RUN npm ci --workspace backend --ignore-scripts

COPY backend ./backend
RUN npm run build --workspace backend

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/backend/package*.json ./backend/
COPY --from=builder /app/backend/dist ./backend/dist

WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main"]
