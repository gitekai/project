const utils = require('../../utils/utils');

const Query = {
  contactos: utils.findAll('Contactos'),
  contacto: utils.findById('Contactos'),

};

const Contacto = {
  tipo: (contacto, args, context) => {
    return context.dataloaders.tipoContactoById.load( contacto.id_tipo_contacto);
    /*return context.models.TiposContacto.find({
      attributes: ['nombre'],
      where: { id: contacto.id_tipo_contacto }
    }).then(seqInstance =>
      seqInstance.nombre,
    );*/
  },
}

const Mutation = {
  createContacto: utils.createMutation('Contactos'),
  modifyContacto: utils.updateMutation('Contactos'),
  deleteContacto: utils.deleteMutation('Contactos'),
};

module.exports = {
  Query,
  Mutation,
  Contacto,
};
