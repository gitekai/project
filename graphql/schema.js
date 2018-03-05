const { MockList, makeExecutableSchema, addMockFunctionsToSchema } = require ('graphql-tools');


const models = require('../models');
const mocks = require('./mocks');


const typeDefs = `

  type RazonSocial {
    nombre: String! 
    nif: String
    cuentaContaPlus: Int
    url: String
    fechaAlta: Int!
    fechaBaja: Int
    numCliente: String
    grupoEmpresarial: GrupoEmpresarial
  }

  input rsInput {
    nombre: String
    nif: String
  }

  type GrupoEmpresarial{
    nombre: String!
    razonesSociales: [RazonSocial]!
  }

  type Contacto{
    nombre: String! @unique
    apellidos: String!
    cargo: String
    departamento: String
  }

  type TipoContacto{
    nombre: String! @uniqe
    isVisible: Boolean!
  }

  type RedSocial{
    nombre: String! 
    url: String! 
  }

  type Pais{
    "El Pais que existe en la vida real"
    nombre: String!
    isEu: Boolean!
  }

  type Estado{
    id: Int!
    nombre: String!
    siguenteEstado: Estado
  }

  type Productos{
    nombre: String! @unique
    precio: Int!
    devisa: Devisa!
  }
  type Devisa{
    id: Int!
    nombre: String!
  }
  

  # the schema allows the following query:
  type Query {
    razonesSociales(skip: Int,first: Int): [RazonSocial!]!
    razonSocial: RazonSocial
    gruposEmpresariales: [GrupoEmpresarial!]!
    paises: [Pais!]!
    estados: [Estado!]!
    redesSociales: [RedSocial!]!
    contactos: [Contacto!]!
  }
`;

//   razonesSociales(where: rsInput, orderBy: OrderByInput,after: afterCursor, before: beforCursor, skip: Int, first: Int, last: Int): [RazonSocial!]!

const resolvers = {
  Query: {
    razonesSociales: (obj, args, context, info) => {
      return models.RazonesSociales.findAll({
        limit: args.first, 
        offset: args.skip,
      });
    },
  },
};


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

addMockFunctionsToSchema({ 
  schema,
  mocks,
  preserveResolvers: true,
});

module.exports = schema;

