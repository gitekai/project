const GrupoEmpresarial = require('../models').GruposEmpresariales;

/**
 * Function that sends an internal server error (will be exported to a module)
 * @param {HTTPResponse} res - HTTP response
 * @param {Error} err - Error Message when provided 
 * @returns {undefined} - Will return nothing
 */
function sendServerError(res, err) {
  res.statusCode = 400;
  res.send(JSON.stringify({ message: `Caught Error = ${err}` }));
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
function create(req, res){
  return GrupoEmpresarial.create({
    nombre: req.body.nombre,
    nif: req.body.nif,
    tlf: req.body.tlf,
    correo: req.body.correo,
  })
    .then((grupoEmpresarialCreated) => {
      res.status(201).send(JSON.stringify(grupoEmpresarialCreated));
    }).catch((err) => {
      sendServerError(res, err);
    });
}

/**
 * Function that returns an Array of GrupoEmpresariales
 * @name read
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {Array.JSON} - Will return the requested Grupo Empresarial or all Grupos Empresariales
 */
function read(req, res){
  GrupoEmpresarial
    .findById(req.params.id)
    .then((foundGe) => {
      return foundGe.update({
        nombre: (req.body.nombre) ? req.body.nombre : foundGe.get('nombre'),
        nif: (req.body.nif) ? req.body.nif : foundGe.get('nif'),
        tlf: (req.body.tlf) ? req.body.tlf : foundGe.get('tlf'),
        correo: (req.body.correo) ? req.body.correo : foundGe.get('correo'),
      });
    })
    .then((grupoEmpresarialUpdated) => {
      res.statusCode = 201;
      res.send(JSON.stringify(grupoEmpresarialUpdated));  
    })
    .catch((err) => {
      sendServerError(res, err);
    });
}


/**
 * Function that updates a GrupoEmpresarial given by ID
 * @name update
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return the modified Grupo Empresarial 
 */
function update(req, res){
  return GrupoEmpresarial
    .findById(req.params.id)
    .then((foundGe) => {
      return foundGe.update({
        nombre: (req.body.nombre) ? req.body.nombre : foundGe.get('nombre'),
        nif: (req.body.nif) ? req.body.nif : foundGe.get('nif'),
        tlf: (req.body.tlf) ? req.body.tlf : foundGe.get('tlf'),
        correo: (req.body.correo) ? req.body.correo : foundGe.get('correo'),
      });
    })
    .then((grupoEmpresarialUpdated) => {
      res.statusCode = 201;
      res.send(JSON.stringify(grupoEmpresarialUpdated));  
    })
    .catch((err) => {
      sendServerError(res, err);
    });
}

/**
 * Function that deletes a GrupoEmpresarial given by ID
 * @name del
 * @module gruposEmpresariales
 * @function
 * @param {HTTPRequest} req - HTTP request
 * @param {HTTPResponse} res - HTTP response
 * @returns {JSON} - Will return a massage with statusCode 200
 */
function del(req, res){
  GrupoEmpresarial
    .findById(req.params.id)
    .then((foundGe) => {
      return foundGe.destroy().then(() => { res.status(200).send(); });
    })
    .catch((err) => {
      sendServerError(res, err);
    });
}

module.exports = {
  create,
  read,
  update,
  del,
};
