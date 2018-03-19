const utils = require('../../utils/utils');

const Query = {
  redesSociales: utils.findAll('RedesSociales'),
  redSocial: utils.findById('RedesSociales'),
};
const Mutation = {
  createRedSocial: utils.createMutation('RedesSociales'),
  modifyRedSocial: utils.updateMutation('RedesSociales'),
  deleteRedSocial: utils.deleteMutation('RedesSociales'),
};

module.exports = {
  Query,
  Mutation,
};
