const utils = require('../../utils/utils');

const seqModel = 'Contactos';

const Query = {
  contactos: utils.findAll(seqModel),
  contacto: utils.findById(seqModel),
};

const Mutation = {
  createContacto: utils.createMutation(seqModel),
  modifyContacto: utils.updateMutation(seqModel),
  deleteContacto: utils.deleteMutation(seqModel),
};

const Contacto = {
  tipo: (contacto, args, context) =>
    context.dataloaders.tipoContactoById.load(contacto.idTiposContacto),
  mediosDeComunicacion: (contacto, args, context) =>
    context.dataloaders.mediosDeComunicacionById.load(contacto.id),
  redesSociales: async (contacto, args, context) =>
    context.dataloaders.redesSocialesById.load(contacto.id),
};

module.exports = {
  Query,
  Mutation,
  Contacto,
};
