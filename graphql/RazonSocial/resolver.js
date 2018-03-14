const utils = require('../../utils/utils');

const Query = {
  razonesSociales: utils.findAll('RazonesSociales'),
};
const Mutation = {
  createRazonSocial: utils.createMutation('RazonesSociales'),
};

module.exports = {
  Query,
  Mutation,
};
