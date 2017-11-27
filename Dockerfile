FROM mhart/alpine-node:latest

ENV MONGO_HOST mongo

ADD package.json /tmp/package.json

RUN cd /tmp && npm install

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app

ADD . /opt/app

CMD ["npm", "start"]