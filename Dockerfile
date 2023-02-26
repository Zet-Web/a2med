FROM node:16 AS deps
ENV NODE_ENV=production
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /a2med
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16 AS builder
ENV NODE_ENV=production
# add environment variables to client code
# ARG NEXT_BACKEND_URL

# ENV NEXT_BACKEND_URL=$NEXT_BACKEND_URL

WORKDIR /a2med
COPY next.config.js ./
COPY package.json yarn.lock ./
COPY --from=deps /a2med/node_modules ./node_modules

COPY pages ./pages
COPY public ./public
COPY src/styles ./styles
COPY src/components ./src/components

RUN yarn build


# Production image, copy all the files and run next
FROM node:16 AS runner
ENV NODE_ENV=production
WORKDIR /a2med
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /a2med/public ./public
COPY --from=builder --chown=nextjs:nodejs /a2med/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /a2med/.next/static ./.next/static
# COPY --from=builder /a2med/node_modules ./node_modules
# COPY --from=builder /a2med/package.json ./package.json
# COPY --from=builder /a2med/pages ./pages

USER nextjs

# Expose
EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node", "server.js"]
