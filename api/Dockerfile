FROM node:lts-alpine

WORKDIR /app

COPY api/src   ./src
COPY api/*     ./

RUN npm ci && npm run build

ENV NODE_ENV=production
ENV PORT=3000

VOLUME [ "/config/google-datastore.json" ]

EXPOSE 3000

CMD [ "npm", "run", "start:in:docker" ]