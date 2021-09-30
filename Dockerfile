# build ui
FROM node:lts-alpine3.12

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

