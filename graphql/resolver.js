// in src/resolvers
const ResContacto = require('./Contacto/resolver');
const ResRazonSocial = require('./RazonSocial/resolver');
const ResTipoContacto = require('./TipoContacto/resolver');


module.exports = {
  Query: Object.assign({}, 
    ResRazonSocial.Query,
    ResContacto.Query,
    ResTipoContacto.Query,

  
  ),
  Mutation: Object.assign({}, 
    ResRazonSocial.Mutation,
    ResContacto.Mutation,
    ResTipoContacto.Mutation,
  ),

  Contacto: ResContacto.Contacto,
};