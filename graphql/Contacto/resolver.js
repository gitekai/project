const DataLoader = require('dataloader');
const utils = require('../../utils/utils');

const Query = {
  contactos: utils.findAll('Contactos'),
  contacto: utils.findById('Contactos'),
};

const Contacto = {
  tipo: (contacto, args, context) =>
    context.dataloaders.tipoContactoById.load(contacto.idTiposContacto),

  redesSociales: (contacto, args, context) =>
    context.dataloaders.redSocialById.load(contacto.id),
  /* context.models.ContactoEnRedSocial.findAll({
      attributes: ['urlContacto'],
      where: { idContacto: contacto.id },
    })
      .then(sequInstance =>
        sequInstance.map(inst => { return inst.urlContacto }),
    ),*/
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

const getRedSocialById = models => ids =>
  models.Contactos.findAll({
    include: [{
      model: models.RedesSociales,
      through: {
        required: false,
        attributes: ['urlContacto'],
      }
    }],
  }).then(
    seqInstance => 
      seqInstance.map(inst =>
        inst.getRedesSociales({through:'urlContacto'}).then(
          e =>
           new Promise([e])),
      ),
  );

const dataloaders = models => ({
  tipoContactoById: new DataLoader(getTipoContactoById(models)),
  redSocialById: new DataLoader(getRedSocialById(models)),
});

module.exports = {
  Query,
  Mutation,
  Contacto,
  dataloaders,
};
