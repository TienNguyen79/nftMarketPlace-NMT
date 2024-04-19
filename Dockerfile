FROM node:16.14.0 as builder

ARG STAGE
ENV REACT_APP_STAGE $STAGE
ARG http_proxy
ENV http_proxy $http_proxy
ARG https_proxy
ENV https_proxy $https_proxy

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY ["client/package.json", "client/yarn.lock", "./"]
RUN yarn install --pure-lockfile
COPY ["client/", "./"]
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder ["/usr/src/app/client/build/", "./"]
COPY ["client/nginx/default.conf", "/etc/nginx/conf.d/"]
RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
