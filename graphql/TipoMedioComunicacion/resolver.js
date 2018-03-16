const utils = require('../../utils/utils');

const Query = {
  tiposMediosComunicaciones: utils.findAll('TiposMedioComunicacion'),
  tipoMedioComunicacion: utils.findById('TiposMedioComunicacion'),
};
const Mutation = {
  createTipoMedioComunicacion: utils.createMutation('TiposMedioComunicacion'),
  modifyTipoMedioComunicacion: utils.updateMutation('TiposMedioComunicacion'),
  deleteTipoMedioComunicacion: utils.deleteMutation('TiposMedioComunicacion'),
};

module.exports = {
  Query,
  Mutation,
};
