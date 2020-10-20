const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./resources/errorsHandling/logErrors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.all('*', function(req, res, next) {
  console.log(`Url: ${req.protocol + '://' + req.get('host') + req.originalUrl}`);
  console.log(`Query params: ${JSON.stringify(req.query)}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

//// Error handler
app.use((err, req, res, next) => {
  console.error(`Error message: ${err}`);
  res.sendStatus(500);
});

//// Handle process exception
process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}`);
});

//// Handle rejection
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ')');
});

module.exports = app;
