FROM mhart/alpine-node:latest

ENV MONGO_HOST db

RUN mkdir -p /opt/app

WORKDIR /opt/app

# copy just the package.json and install dependencies for caching
ADD package.json ./package.json
RUN npm install

ADD . .

EXPOSE 3232

CMD ["npm", "start"]