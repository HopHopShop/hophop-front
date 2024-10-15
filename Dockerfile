FROM node:20-alpine AS base

WORKDIR /var/www/app

COPY package*.json ./
COPY .prettierrc ./

RUN npm ci

FROM base AS build

COPY . ./

RUN npm run build

RUN npm pkg delete scripts.prepare && \
    npm ci --omit=dev && npm cache clean --force

FROM node:20-alpine AS production

WORKDIR /var/www/app

USER node

ENV NODE_ENV production
COPY --chown=node:node --from=build /var/www/app/node_modules ./node_modules
COPY --chown=node:node --from=build /var/www/app/.next ./.next
COPY --chown=node:node --from=build /var/www/app/next.config.mjs ./next.config.mjs
COPY --chown=node:node --from=build /var/www/app/package.json ./
COPY --chown=node:node --from=build /var/www/app/.env ./
COPY --chown=node:node --from=build /var/www/app/public ./public

EXPOSE 3000

CMD ["npm", "start"]