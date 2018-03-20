const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const context = require('./graphql/context');
// routes to be required

const app = express();
app.use('*', cors({ origin: 'http://localhost:3000' }));


// loading middleware where needed: 
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  },
}));*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
//ALL ROUTES MUST BE MOUNTED HERE 
app.use(
  '/v1/erp2d2',
  graphqlHTTP(request => ({
    schema,
    context: context(request),
    graphiql: true,
  })),
);
app.listen(3000);

app.use((req, res, next) => {
  const err = new Error('404');
  err.code = 404;
  next(err);
});


// missing brace
// missing @returns tag
/**
 * @param {string name Whom to greet.
 */
app.use((err, req, res) => {
  const internalSrvErr = { message: `Internal Server Error ${err}` };
  const notFoundErr = { message: 'Route Not Found' };
  res.send(err.code === 404 ? JSON.stringify(notFoundErr) : JSON.stringify(internalSrvErr));
});


module.exports = app;