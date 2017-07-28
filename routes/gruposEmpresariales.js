const express = require('express');
const models = require('../models');

const router = express.Router();

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
 * Post Methods
 */
router.post('/', (req, res) => {
  models.GruposEmpresariales
    .create({
      nombre: req.body.nombre,
      nif: req.body.nif,
      tlf: req.body.tlf,
      correo: req.body.correo,
    })
    .then((grupoEmpresarialCreated) => {
      res.statusCode = 201;
      res.send(JSON.stringify(grupoEmpresarialCreated));
    }).catch((err) => {
      sendServerError(res, err);
    });
});

router.put('/:id', (req, res) => {
  models.GruposEmpresariales
    .findById(req.params.id)
    .then((foundGe) => {
      return foundGe.update({
        nombre: (req.body.nombre) ? req.body.nombre : foundGe.get('nombre'),
        nif: (req.body.nif) ? req.body.nif : foundGe.get('nif'),
        tlf: (req.body.tlf) ? req.body.tlf : foundGe.get('tlf'),
        correo: (req.body.correo) ? req.body.correo : foundGe.get('correo'),
      }).then((grupoEmpresarialUpdated) => {
        res.statusCode = 201;
        res.send(JSON.stringify(grupoEmpresarialUpdated));  
      });
    }).catch((err) => {
      sendServerError(res, err);
    });
});


/**
 * Get Methods
 */
router.get('/', (req, res) => {
  models.GruposEmpresariales
    .findAll({
      limit: req.query.limit,
      offset: req.query.offset,
    })
    .then((allGe) => {
      res.statusCode = 200;
      res.send(JSON.stringify(allGe));
    })
    .catch((err) => {
      sendServerError(res, err);
    });
});

router.get('/:grupoEmpresarialId', (req, res) => {
  models.GruposEmpresariales.findAll({
    where: {
      id: req.params.grupoEmpresarialId,
    },
  }).then((filteredGe) => {
    res.send(JSON.stringify(filteredGe));
  }).catch((err) => {
    sendServerError(res, err);
  });
});

module.exports = router;
