const models = require('../models');

/**
 * Helper function that assigns a model to the req object 
 * @name assignModel
 * @function
 * @param {string} model - string searched to be found in Model mapping
 * @returns {Object} - Will return the sequelize Model name 
 * or undefined when nothing is found  
 */
function getModel(model) {
  const modelMap = new Map();
  modelMap.set('ge', 'GruposEmpresariales');
  modelMap.set('rs', 'RazonesSociales');
  modelMap.set('contactos', 'Contactos');
  modelMap.set('paises', 'Paises');
  modelMap.set('tiposContactos', 'TiposContacto');
  modelMap.set('redesSociales', 'RedesSociales');
  modelMap.set('tipoMedioComunicacion', 'TipoMedioComunicacion');
  modelMap.set('direccionesFiscales', 'DireccionesFiscales');
  modelMap.set('ciudades', 'Ciudades');
  modelMap.set('contactosEnRedesSociales', 'contactosEnRedesSociales');
  return modelMap.get(model);
}

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
 * Function that assigns a model to the req object 
 * @name assignModelToReq
 * @function
 * @param {HTTPRequest} req - http request object 
 * @param {HTTPRequest} res - http response object  
 * @param {HTTPRequest} next - express next function   
 * @returns {Object} - Will return a sequelize Object representing the model searched
 * or undefined when nothing was found // because of map function  
 */
function assignModelToReq(req, res, next) {
  /**
   * @property pModel {string} - Model that maps to a real sequelize object
   * @property model {string} - Real sequelize Model name 
   */
  const pModel = req.params.model;
  const model = getModel(pModel);
  if (model) {
    req.model = models[model];
    next();
  } else {
    res.status(404).json({ message: `${pModel} not found` });
  }
}

module.exports = {
  getInstanceParams,
  assignModelToReq,
  getModel,
};
