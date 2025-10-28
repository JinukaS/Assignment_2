# ================================================================
# DOCKERFILE for Next.js Application (with Prisma)
# ================================================================

# --- Stage 1: Build Dependencies ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# --- Stage 2: Build the Application ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY prisma ./prisma/
RUN npx prisma generate
RUN npm run build

# --- Stage 3: Production Image ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output
COPY --from=builder /app/.next/standalone ./
# Copy static assets
COPY --from=builder /app/.next/static ./.next/static
# Copy public assets
COPY --from=builder /app/public ./public

# --- THIS IS THE IMPROVEMENT ---
# Copy the Prisma schema and migration files to the final image.
# This is important for the Prisma client to work correctly in production.
COPY --from=builder /app/prisma ./prisma/

RUN chown -R nextjs:nodejs /app/.next
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]