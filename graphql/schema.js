const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const models = require('../models');
const mocks = require('./mocks');
const utils = require('../utils/utils');
const Pais = require('./schemaParts/pais');
const GrupoEmpresarial = require('./schemaParts/grupoEmpresarial');
const Estado = require('./schemaParts/estado');
const Devisa = require('./schemaParts/devisa');

const Producto = require('./schemaParts/producto');
const RedSocial = require('./schemaParts/redSocial');

const RazonSocial = require('./RazonSocial/schema');
const Contacto = require('./Contacto/schema');
const ResContacto = require('./resolver').Contacto;
const TipoContacto = require('./TipoContacto/schema');
const Query = require('./resolver').Query;
const Mutation = require('./resolver').Mutation;



const RootQuery = `
  type RootQuery {
    _ : Boolean
  }`;

const RootMutation = `
  type RootMutation{
    _ : Boolean
  }
  
  `;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `;

const resolvers = {
  RootQuery: Query,
  RootMutation: Mutation,
  Contacto: ResContacto, 
};


const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,
    Pais,
    RazonSocial,
    GrupoEmpresarial,
    Estado,
    Devisa,
    Contacto,
    TipoContacto,
    Pais,
    Producto,
    RedSocial,
    
  ],
  resolvers,
});
/*
addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true,
  logger: { log: e => console.log(e) },
});*/




module.exports = schema;

