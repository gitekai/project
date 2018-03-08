const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const models = require('../models');
const mocks = require('./mocks');
const utils = require('../utils/utils');
const Pais = require('./schemaParts/pais');
const RazonSocial = require('./schemaParts/razonSocial');
const GrupoEmpresarial = require('./schemaParts/grupoEmpresarial');
const Estado = require('./schemaParts/estado');
const Devisa = require('./schemaParts/devisa');
const Contacto = require('./schemaParts/contacto');
const Producto = require('./schemaParts/producto');
const RedSocial = require('./schemaParts/redSocial');








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
  RootQuery: {
    razonesSociales: (obj, args, context, info) => {
      const { where = {}, first = 10, skip = 0 } = args;
      utils.modifyWhere(where);
      return models.RazonesSociales.findAll({
        limit: args.first,
        offset: args.skip,
        where: where,
      });
    },
  }
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
    Pais,
    Producto,
    RedSocial,
    
  ],
  resolvers,
});

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});




module.exports = schema;

