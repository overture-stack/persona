import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import { getPortPromise } from 'portfinder';
import { schema } from './graphql';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

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

export function start() {
  return (process.env.PORT
    ? Promise.resolve(process.env.PORT)
    : (getPortPromise as any)({ port: 3232 })
  ).then(function(port) {
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
  });
}
