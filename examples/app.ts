import 'babel-polyfill';

import * as express from 'express';
import { getPortPromise } from 'portfinder';
import * as cors from 'cors';
import egoTokenMiddleware from 'ego-token-middleware';

import createServer from '../server';
import { port as defaultPort, egoApi, egoApiAuthRequired } from '../config';

// An example instantiation of persona
const start = async () => {
  const port = defaultPort || (await (getPortPromise as any)({ port: 3232 }));
  const app = express();

  app.use(cors());

  app.use(
    await createServer({
      ego: {
        url: egoApi,
        required: egoApiAuthRequired,
        accessRules: [
          {
            type: 'deny',
            route: ['/', '/(.*)'],
            role: ['admin', 'user'],
          },
        ],
      },
      schemas: {
        User: {},
      },
      tags: {},
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
