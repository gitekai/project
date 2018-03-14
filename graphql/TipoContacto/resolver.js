const utils = require('../../utils/utils');

const Query = {
  tiposContactos: utils.findAll('TiposContacto'),
  tipoContacto: utils.findById('TiposContacto'),
};
const Mutation = {
  createTipoContacto: utils.createMutation('TiposContacto'),
  modifyTipoContacto: utils.updateMutation('TiposContacto'),
  deleteTipoContacto: utils.deleteMutation('TiposContacto'),
};

module.exports = {
  Query,
  Mutation,
};
