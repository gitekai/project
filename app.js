const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const schema = require('./graphql/schema');

const models = require('./models');

// routes to be required
const def = require('./routes/default');
//const authorization = require('./routes/authorization');
const gruposEmpresariales = require('./routes/gruposEmpresariales');
const razonesSociales = require('./routes/razonesSociales');
const mappingRouter = require('./routes/mappping');

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
app.use('/', def);


//al final van los router genericos 
// asi si hay algo más especifico se ejecuta eso en vez del generico
app.use('/api/v1.1/', mappingRouter);

const DataLoader = require('dataloader');
const getTipoContactoById = models => ids => models
  .TiposContacto.findAll({
    attributes: ['nombre'],
    where{ id Op.in ids }
  }).then(seqInstance => {
    return seqInstance.map((inst)=> inst.nombre);
  }
    
);

const dataloaders = models => ({
  tipoContactoById: new DataLoader(getTipoContactoById(models)),
});



app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: { models, dataloaders: dataloaders(models) }
  }));
app.listen(3000);
console.log('Running a GraphQL API server at localhost:3000/graphql');

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



