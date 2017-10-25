const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');

// routes to be required
const def = require('./routes/default');
const gruposEmpresariales = require('./routes/gruposEmpresariales');
const razonesSociales = require('./routes/razonesSociales');


const app = express();

// loading middleware where needed: 
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  },
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
// HERE ALL ROUTES MUST BE MOUNTED  
app.use('/', def);
app.use('/api/v1.0/ge', gruposEmpresariales);
app.use('/api/v1.0/rs', razonesSociales);
//app.use('/', );

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
app.use((err, req, res, next) => {
  const internalSrvErr = { message: 'Internal Server Error' };
  const notFoundErr = { message: 'Route Not Found' };
  res.send(err.code === 404 ? JSON.stringify(notFoundErr) : JSON.stringify(internalSrvErr));
});


module.exports = app;
