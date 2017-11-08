const GrupoEmpresarial = require('../models').GruposEmpresariales;
/**
 * Function that sends an internal server error (will be exported to a module)
 * @param {HTTPResponse} res - HTTP response
 * @param {Error} err - Error Message when provided 
 * @returns {undefined} - Will return nothing
 */
function sendServerError(res, err) {
  res.statusCode = 400;
  res.json({
    status: res.statusCode,
    message: err.name,
  });
}


/**
 * Function that creates an GrupoEmpresarial
 * @name create
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return the just created object with 201 statusCode
 */
function create(req, res) {
  return GrupoEmpresarial.create({
    nombre: req.body.nombre,
    nif: req.body.nif,
    tlf: req.body.tlf,
    correo: req.body.correo,
  })
    .then((grupoEmpresarialCreated) => {
      res.status(201).json(grupoEmpresarialCreated);
    }).catch((err) => {
      sendServerError(res, err);
    });
}

/**
 * Function that Obtains a Grupo Empresarial by ID 
 * @name readById
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {Array.JSON} - Will return the requested Grupo Empresarial or all Grupos Empresariales
 */
function readById(req, res) {
  return GrupoEmpresarial.findById(req.params.id)
    .then((filteredGe) => {
      res.json(filteredGe);
    })
    .catch((err) => {
      sendServerError(res, err);
    });
}


/**
 * Function that updates a GrupoEmpresarial with given ID
 * @name update
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return the modified Grupo Empresarial 
 */
function update(req, res) {
  return GrupoEmpresarial
    .findById(req.params.id)
    .then(foundGe =>
      foundGe.update({
        nombre: (req.body.nombre) ? req.body.nombre : foundGe.get('nombre'),
        nif: (req.body.nif) ? req.body.nif : foundGe.get('nif'),
        tlf: (req.body.tlf) ? req.body.tlf : foundGe.get('tlf'),
        correo: (req.body.correo) ? req.body.correo : foundGe.get('correo'),
      }))
    .then((grupoEmpresarialUpdated) => {
      res.statusCode = 201;
      res.json(grupoEmpresarialUpdated);
    })
    .catch((err) => {
      sendServerError(res, err);
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
function delById(req, res) {
  return GrupoEmpresarial
    .findById(req.params.id)
    .then(foundGe =>
      foundGe.destroy())
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      sendServerError(res, err);
    });
}


/**
 * Function that deletes all GrupoEmpresariales
 * @name delAll
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return a statusCode 204
 */
function delAll(req, res) {
  return GrupoEmpresarial.destroy({
    where: {},
    tuncate: true,
  })
    .then(() =>
      res.status(204).json())
    .catch((err) => {
      sendServerError(res, err);
    });
}


/**
 * Helper function that returns an for sequelize interpretaple order Array
 * @name getOrderArray
 * @function
 * @param {HTTPRequest} strOrder - String that contains the fields to be ordered 
 *  and optionally the direction in which to be ordered 
 * @returns {Array.Array} - Will return an Array containing Arrays, 
 * with the fields and directions inf form of:
 * [['ColumnA','DESC'],['ColumnB','ASC'], ...'ColumnB','ASC']]
 */
function getOrderArray(strOrder = '') {
  return (strOrder.length === 0) ? undefined :
    strOrder.split(',')
      .map(orderParam =>
        [orderParam.split(':')[0], (orderParam.split(':')[1]) ? orderParam.split(':')[1] : 'ASC']);
}


/**
 * Function that obtains all Grupos Empresariales
 * @name readAll
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {Array.JSON} - Will return the requested Grupo Empresarial or all Grupos Empresariales
 */
function readAll(req, res) {
  return GrupoEmpresarial.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    order: getOrderArray(req.query.order),
  })
    .then((allGe) => {
      res.statusCode = 200;
      res.json(allGe);
    })
    .catch((err) => {
      sendServerError(res, err);
    });
}

module.exports = {
  create,
  readAll,
  readById,
  update,
  delAll,
  delById,
};


