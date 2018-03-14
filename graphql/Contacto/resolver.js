const utils = require('../../utils/utils');

const Query = {
  contactos: utils.findAll('Contactos'),
  contacto: utils.findById('Contactos'),

};

const Contacto = {
  tipo: (contacto, args, context) => {
    return context.models.TiposContacto.find({
      attributes: ['nombre'],
      where: { id: contacto.id_tipo_contacto }
    }).then(seqInstance =>
      seqInstance.nombre,
    );
  },
}

const Mutation = {
  createContacto: utils.createMutation('Contactos'),
};

module.exports = {
  Query,
  Mutation,
  Contacto,
};
