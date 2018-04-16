FROM mhart/alpine-node:latest

ENV EGO_API=https://demo.ego.kfdrc.org \
    EGO_API_AUTH_REQUIRED=true \
    MONGO_HOST=10.20.3.54 \
    MONGO_DB=persona \
    VAULT_AUTHENTICATION=AWS_IAM \
    AWS_IAM_ROLE=kf_personaservice_api_role \
    VAULT_ENDPOINT_PROTOCAL=https \
    VAULT_HOST=vault-dev.kids-first.io \
    VAULT_PORT=443 \
    VAULT_API_VERSION=v1 \
    VAULT_TOKEN= \
    VAULT_MONGO_CREDENTIAL_PATH=secret/aws/oicr-personaservice-api/db \
    MONGO_USERNAME_KEY=mongodb-username \
    MONGO_USERPASS_KEY=mongodb-password

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
