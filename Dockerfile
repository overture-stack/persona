FROM mhart/alpine-node:latest

ENV MONGO_HOST db

RUN mkdir -p /opt/app

WORKDIR /opt/app

# copy just the package.json/yarn.lock and install dependencies for caching
COPY package.json yarn.lock ./

RUN NODE_ENV=production yarn --ignore-optional && \
  yarn autoclean --init && \
  yarn autoclean --force && \
  yarn cache clean

COPY . .

EXPOSE 3232

CMD yarn start