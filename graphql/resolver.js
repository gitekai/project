// in src/resolvers
const ResContacto = require('./Contacto/resolver');
const ResRazonSocial = require('./RazonSocial/resolver');
const ResTipoContacto = require('./TipoContacto/resolver');
const ResTipoMedioComunicacion = require('./TipoMedioComunicacion/resolver');
const ResMedioComunicacion = require('./MedioComunicacion/resolver');



module.exports = {
  Query: Object.assign({}, 
    ResRazonSocial.Query,
    ResContacto.Query,
    ResTipoContacto.Query,
    ResTipoMedioComunicacion.Query,
    ResMedioComunicacion.Query, 
  ),
  Mutation: Object.assign({}, 
    ResRazonSocial.Mutation,
    ResContacto.Mutation,
    ResTipoContacto.Mutation,
    ResTipoMedioComunicacion.Mutation,
    ResMedioComunicacion.Mutation,

  ),

  Contacto: ResContacto.Contacto,
  MedioComunicacion: ResMedioComunicacion.MedioComunicacion,
};