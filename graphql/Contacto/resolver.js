const DataLoader = require('dataloader');
const utils = require('../../utils/utils');

const Query = {
  contactos: utils.findAll('Contactos'),
  contacto: utils.findById('Contactos'),
};

const Contacto = {
  tipo: (contacto, args, context) =>
    context.dataloaders.tipoContactoById.load(contacto.id_tipo_contacto),
};

const Mutation = {
  createContacto: utils.createMutation('Contactos'),
  modifyContacto: utils.updateMutation('Contactos'),
  deleteContacto: utils.deleteMutation('Contactos'),
};


const getTipoContactoById = models => ids =>
  models.TiposContacto.findAll({
    attributes: ['nombre'],
    where: { id: { [models.Sequelize.Op.in]: ids } },
  })
    .then(
      seqInstance =>
        seqInstance.map(inst => inst.nombre),
    );

const dataloaders = models => ({
  tipoContactoById: new DataLoader(getTipoContactoById(models)),
});

module.exports = {
  Query,
  Mutation,
  Contacto,
  dataloaders,
};
