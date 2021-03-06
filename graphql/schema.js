const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const mocks = require('./mocks');

const Pais = require('./Pais/schema');
const GrupoEmpresarial = require('./GrupoEmpresarial/schema');
const Estado = require('./Estado/schema');
const RazonSocial = require('./RazonSocial/schema');
const Contacto = require('./Contacto/schema');
const TipoContacto = require('./TipoContacto/schema');
const TipoMedioComunicacion = require('./TipoMedioComunicacion/schema');
const MedioComunicacion = require('./MedioComunicacion/schema');
const RedSocial = require('./RedSocial/schema');

const ResMedioComunicacion = require('./MedioComunicacion/resolver').MedioComunicacion;
const ResContacto = require('./resolver').Contacto;

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
  MedioComunicacion: ResMedioComunicacion,
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
    Contacto,
    TipoContacto,
    TipoMedioComunicacion,
    MedioComunicacion,
    Pais,
    RedSocial,
  ],
  resolvers,
});

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true,
  logger: { log: e => console.log(e) },
});

module.exports = schema;

