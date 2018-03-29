const utils = require('../../utils/utils');

const Query = {
  mediosComunicaciones: utils.findAll('MediosComunicacion'),
  medioComunicacion: utils.findById('MediosComunicacion'),
};
const Mutation = {
  createMedioComunicacion: utils.createMutation('MediosComunicacion'),
  modifyMedioComunicacion: utils.updateMutation('MediosComunicacion'),
  deleteMedioComunicacion: utils.deleteMutation('MediosComunicacion'),
};

const MedioComunicacion = {
  contacto: (medioComunicacion, args, context) =>
    context.dataloaders.contactoById.load(medioComunicacion.idContacto),
};

module.exports = {
  Query,
  Mutation,
  MedioComunicacion,
};
