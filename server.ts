import * as bodyParser from 'body-parser';
import * as express from 'express';
import { getPortPromise } from 'portfinder';
import createSchema from './graphql';
import * as cors from 'cors';
var graphqlHTTP = require('express-graphql');
import expressEgo from 'ego-token-middleware';
import config from './config';

const createApp = () => {
  const app = express();
  app.use(cors());

  app.use(
    expressEgo({
      required: config.egoApiAuthRequired,
      egoURL: config.egoApi,
      requireUserApproval: config.egoApiRequireUserApproval,
    }),
  );

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlHTTP((err, res) => ({
      schema: createSchema(),
      formatError: err => {
        res.status(err.status || 500);
        return err;
      },
    })),
  );

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err: any = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: req.app.get('env') === 'development' ? err.message : {},
    });
  });
  return app;
};

export function start() {
  return (process.env.PORT
    ? Promise.resolve(process.env.PORT)
    : (getPortPromise as any)({ port: 3232 })
  ).then(function(port) {
    createApp()
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
  });
}
