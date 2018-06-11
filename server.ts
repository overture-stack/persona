import 'babel-polyfill';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import connect from 'services/mongo';
import createSchema from './graphql';

export default async () => {
  await connect();

  const app = express();

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
