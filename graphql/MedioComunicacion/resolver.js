const utils = require('../../utils/utils');
const DataLoader = require('dataloader');

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

const getContactoById = models => ids =>
  models.Contactos.findAll({
    where: { id: { [models.Sequelize.Op.in]: ids } },
  });

const dataloaders = models => ({
  contactoById: new DataLoader(getContactoById(models)),
});

module.exports = {
  Query,
  Mutation,
  MedioComunicacion,
  dataloaders,
};
