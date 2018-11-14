<h1 align="center">Persona</h1>

<p align="center">A user profile & identity management microservice.</p>

<p align="center"><img alt="Release Candidate" title="Release Candidate" src="http://www.overture.bio/img/progress-horizontal-RC.svg" width="320" /></p>

[![Slack](http://slack.overture.bio/badge.svg)](http://slack.overture.bio)

## usage

persona's main export is an express router, to be included in a parent application. an example instantiation is included in `examples/app.ts`, which is hooked up to the `npm start` script mentioned in the dev section below.

#### getting started

* `npm i --save @overture-stack/persona`
* add the required environment variables, documented in `.env.schema`

```
import * as express from 'express';
import * as cors from 'cors';
import createServer from '@overture-stack/persona';

const start = async () => {
  const port = 3232;
  const app = express();

  app.use(cors());

  app.use(
    await createServer({
      ego: {
        required: false,
        accessRules: [
          {
            type: 'deny',
            route: ['/', '/(.*)'],
            role: ['admin', 'user'],
          },
        ],
      },
      schemas: {
        User: {
          fields: {
            email: 'String',
            interests: ['String'],
          },
          collection: 'users',
        },
      },
      tags: {
        User: ['interests'],
      },
    }),
  );

  app.listen(port, () => console.log(`Listening on port: ${port}`))
};

start();
```

## vault

persona supports vault integration by default. the `USE_VAULT` environment variable will determine whether or not persona should try to use vault to connect to mongo, or if it should use explicitly provided connection credentials.

## migrations

depending on your usage the mongo instance backing persona may need migrations. persona provides migration support in the form of the `persona-scripts`.

persona migrations require the global installation of the `migrate-mongo` package, `npm i -g migrate-mongo`. for more information visit https://www.npmjs.com/package/migrate-mongo.

after installing persona, run `persona-scripts migrate --args "<<migrate-mongo commands>>"` from your project root to perform migration tasks. `migrate-mongo` commands include `status`, `up`, `down`, and `create <<migration name>>`

`persona-scripts migrate` will create a `migrations/migrations` directory structure in the root directory of your project.

## environment variables

see `.env.schema` for details on environment variables

## dev

1.  install dependencies

```
$ npm i
```

2.  make sure mongo is running

```
$ mongod
```

3.  start server (defaults to port :3232)

```
npm start
```

4.  personal is now running and you can access it `http://localhost:3232/graphql`

## docker

To get a local instance of persona running you can use the docker compose file. This will start mongo and persona in docker.

```
$ docker-compose up --build
```

If you need a different port you can use the `API_HOST_PORT` env variable

```
$ API_HOST_PORT=3232 docker-compose up --build
```
