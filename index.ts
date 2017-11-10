const { addMockFunctionsToSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const express = require('express');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { promisify } = require('util');
const portfinder = require('portfinder');
const { schema } = require('./graphql');

const getPort = promisify(portfinder.getPort);
portfinder.basePort = 3232;

let app = express();
// addMockFunctionsToSchema({ schema });
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

function onError(error) {
  // if (error.syscall !== 'listen') {
  //   throw error;
  // }
  // var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // // handle specific listen errors with friendly messages
  // switch (error.code) {
  //   case 'EACCES':
  //     console.error(bind + ' requires elevated privileges');
  //     process.exit(1);
  //     break;
  //   case 'EADDRINUSE':
  //     console.error(bind + ' is already in use');
  //     process.exit(1);
  //     break;
  //   default:
  //     throw error;
  // }
}

(process.env.PORT
  ? Promise.resolve(process.env.PORT)
  : getPort()
).then(function(port) {
  app.listen(port, () => console.log(`listening on http://localhost:${port}`));
  app.on('error', onError);
});
