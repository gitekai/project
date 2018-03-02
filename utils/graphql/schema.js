const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const models = require('../../models');


const typeDefs = `

  type GrupoEmpresarial {
    id: Int!
    nombre: String! 
  }

  # the schema allows the following query:
  type Query {
    gruposEmpresariales: [gruposEmpresariales!]!
  }
  graphql
  # this schema allows the following mutation:

`;

const resolvers = {
  Query: {
    gruposEmpresariales: () => {
      models.gruposEmpresariales.findAll().json();
    }
  },
};


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema; 