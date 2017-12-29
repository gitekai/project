const utils = require('../utils/utils');


/**
 * Function that Obtains an Item by ID 
 * @name readById
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @param {HTTPResponse} next - Express next function
 * @returns {Array.JSON} - Will return the requested Item
 */
function readById(req, res, next) {
  return req.model
    .findById(req.params.id)
    .then((filteredModel) => {
      if (!filteredModel) {
        throw new Error('No Item found with given ID');
      }
      return res.json(filteredModel);
    })
    .catch((err) => {
      next(err);
    });
}
/**
 * Function that updates a GrupoEmpresarial with given ID
 * @name update
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return the modified Grupo Empresarial 
 */
function update(req, res, next) {
  return req.model
    .findById(req.params.id)
    .then(foundGe =>
      foundGe.update(utils.getInstanceParams(req)),
    )
    .then((grupoEmpresarialUpdated) => {
      res.statusCode = 201;
      res.json(grupoEmpresarialUpdated);
    })
    .catch((err) => {
      next(err);
    });
}

/**
 * Function that deletes a GrupoEmpresarial with given ID
 * @name delById
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return statusCode 204
 */
function delById(req, res, next) {
  return req.model
    .findById(req.params.id)
    .then(foundModel =>
      foundModel.destroy())
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  readById,
  update,
  delById,
};
