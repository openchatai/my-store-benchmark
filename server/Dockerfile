FROM node:20-alpine as base
RUN npm install -g pnpm

FROM base as deps
WORKDIR /app
COPY package*.json ./
RUN pnpm install

FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build .

FROM base as runner
WORKDIR /app
COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", "./.output/server/index.mjs"]
