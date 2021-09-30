FROM node:lts-alpine3.12

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY ./dist ./dist
COPY ./.env* .

CMD [ "npm", "run", "start:in:docker" ]
