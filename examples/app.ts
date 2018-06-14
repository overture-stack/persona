import 'babel-polyfill';

import * as express from 'express';
import { getPortPromise } from 'portfinder';
import * as cors from 'cors';

import createServer from '../index';

// An example instantiation of persona
const start = async () => {
  const port = await (getPortPromise as any)({
    port: process.env.PORT || 3232,
  });
  const app = express();

  app.use(cors());

  app.use(
    await createServer({
      ego: {
        accessRules: [
          {
            type: 'allow',
            route: ['/', '/(.*)'],
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

  app
    .listen(port, () => console.log(`Listening on port: ${port}`))
    .on('error', error => {
      if (error.syscall !== 'listen') throw error;

      const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
};

start();
