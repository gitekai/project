const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./utils/graphql/schema');


// routes to be required
const def = require('./routes/default');
//const authorization = require('./routes/authorization');
const gruposEmpresariales = require('./routes/gruposEmpresariales');
const razonesSociales = require('./routes/razonesSociales');
const mappingRouter = require('./routes/mappping');

const app = express();

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
app.use('/', def);





//app.use('/api/v1.0/ge', gruposEmpresariales);
//app.use('/api/v1.0/rs', razonesSociales);

//al final van los router genericos 
// asi si hay algo más especifico se ejecuta eso en vez del generico
app.use('/api/v1.1/', mappingRouter);

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


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
//  const internalSrvErr = { message: `Internal Server Error ${err}` };
  const internalSrvErr = { message: `WTF` };  
  const notFoundErr = { message: 'Route Not Found' };
  res.send(err.code === 404 ? JSON.stringify(notFoundErr) : JSON.stringify(internalSrvErr));
});


module.exports = app;
