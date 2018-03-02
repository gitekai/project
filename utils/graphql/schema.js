const { makeExecutableSchema } = require('graphql-tools');

const models = require('../../models');


const typeDefs = `

  type RazonSocial {
    id: Int!
    nombre: String! 
    nif: String
    cuentaContaPlus: Int
    url: String
    fechaAlta: Int!
    fechaBaja: Int
    numCliente: String
  }

  # the schema allows the following query:
  type Query {
    razonesSociales: [RazonSocial!]!
  }
  
`;

const resolvers = {
  Query: {
    razonesSociales: () => {
      return models.RazonesSociales.findAll();
      
    
    }
  },
};


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema; 