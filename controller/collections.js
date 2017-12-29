/**
 * Helper function that returns an for sequelize interpretaple object needed for creation or updates
 * @name 
 * @function getInstanceParams
 * @param {HTTPRequest} req - HTTP request 
 * @returns {Object} - Will return an Object containing keys and values needed for creation,updates 
 */
function getInstanceParams(req) {
  const createObject = {};
  Object.keys(req.model.attributes)
    .forEach(
      (modelAttr) => {
        if (req.body[modelAttr]) {
          createObject[modelAttr] = req.body[modelAttr];
        }
      });
  return createObject;
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
function readAll(req, res, next) {
  return req.model.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    order: getOrderArray(req.query.order),
  })
    .then((allGe) => {
      res.statusCode = 200;
      res.json(allGe);
    })
    .catch((err) => {
      next(err);
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
function create(req, res, next) {
  return req.model.create(
    getInstanceParams(req),
  )
    .then((grupoEmpresarialCreated) => {
      res.status(201).json(grupoEmpresarialCreated);
    }).catch((err) => {
      next(err);
    });
}

/**
 * Function that deletes all GrupoEmpresariales
 * @name delAll
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @param {HTTPResponse} next - express next function
 * @returns {JSON} - Will return a statusCode 204
 */
function delAll(req, res, next) {
  return req.model.destroy({
    where: {},
    tuncate: true,
  })
    .then(() =>
      res.status(204).json())
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  readAll,
  create,
  delAll,
};
