FROM node:16.18.1-alpine3.15 as deps

WORKDIR /app

# Preparing for Installation
COPY package.json package-lock.json ./

# Installing Dependencies
RUN npm ci

# ===================================================================

FROM node:16.18.1-alpine3.15 as builder

WORKDIR /app
COPY . .

# Getting the node_modules
COPY --from=deps /app/node_modules ./node_modules

# Build NextJS build
RUN npm run build

# ===================================================================

FROM node:16.18.1-alpine3.15 as runner

WORKDIR /app
ENV NODE_ENV production

# Adding user & usergroup for NextJS's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copying the standalone files & changing owners
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Changing user to NextJS's user
USER nextjs

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# NextJS server is being run using node server.js
CMD ["node", "server.js"]
