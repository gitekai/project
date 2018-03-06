const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const models = require('../models');
const mocks = require('./mocks');
const Pais = require('./schemaParts/pais');
const RazonSocial = require('./schemaParts/razonSocial');
const GrupoEmpresarial = require('./schemaParts/grupoEmpresarial');
const Op = require('sequelize').Op;
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
      const { where, first, skip } = args;

      let filter; 
      Object.keys(where).map((key,ind,arr)=>{
        if(key == "nombre_equals"){
          filter =   { [Op.and] : { nombre: "kk"} };
        }
      });
      console.log("");
//dels.RazonesSociales.findAll({ where:{ [op.and]: { nombre: 'kk' , url: 'pipi'}} })
    return  models.RazonesSociales.findAll({
        limit: args.first,
        offset: args.skip,
        //where: (filter) ? filter : {},
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
  ],
  resolvers,
});

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});

module.exports = schema;

