const _ = require('lodash');

const getUniqueItemAsociationLoader = (modelName, searchedColumn, returnAttribute = null) => models =>
  (ids) => {
    const searchObject = {
      raw: true,
      where: { id: { [models.Sequelize.Op.in]: ids } },
    };
    if (returnAttribute !== null) searchObject.attributes = [returnAttribute];
    return models[modelName].findAll(searchObject);
  };

/*  models[modelName].findAll({
    raw: true,
    attributes: [returnAttribute],
    where: { id: { [models.Sequelize.Op.in]: ids } },
  });*/

const getAsociationArrayLoader = (modelName, searchedColumn) => models => async (ids) => {
  const searchResult = await models[modelName].findAll({
    raw: true,
    where: { [searchedColumn]: { [models.Sequelize.Op.in]: ids } },
  });
  const group = _.groupBy(searchResult, searchedColumn);
  return ids.map(id => group[id] || []);
};


module.exports = {
  getAsociationArrayLoader,
  getUniqueItemAsociationLoader,
};
