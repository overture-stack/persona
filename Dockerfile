FROM mhart/alpine-node:latest

ENV MONGO_HOST db

RUN mkdir -p /opt/app

WORKDIR /opt/app

# copy just the package.json/yarn.lock and install dependencies for caching
COPY package.json yarn.lock ./

RUN yarn --ignore-optional && yarn cache clean

COPY . .

EXPOSE 3232

CMD npm start