FROM node:lts-alpine AS ui
COPY nginx.conf         /config/
WORKDIR /app/ui
COPY public/            ./public
COPY src/               ./src
COPY .env               ./
COPY package.json       ./
COPY package-lock.json  ./
COPY tsconfig.json      ./
RUN yarn install --frozen-lockfile && yarn build

FROM node:lts-alpine AS api
WORKDIR /app/api
COPY api/src   ./src
COPY api/*     ./
RUN yarn install --frozen-lockfile && yarn build

FROM eu.gcr.io/personalweb-279207/alpine-nginx-nodejs:3.9
COPY --from=ui  /config/nginx.conf  /etc/nginx/conf.d/ui.conf
COPY --from=ui  /app/ui/build       /app/ui
COPY --from=api /app/api            /app/api
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 8080
# EXPOSE 3000

ENV PORT=8080

WORKDIR /app/api
CMD ["node", "dist/index"]
