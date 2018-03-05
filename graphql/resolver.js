const models = require('../../models');

const resolvers = {
  Query: {
    gruposEmpresariales: ()=>{
      models.gruposEmpresariales.findAll().json();
    }
  },
};