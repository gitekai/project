const models = require('../models');
const Op = require('sequelize').Op;

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

function modifyWhere(obj, res = {}) {
  if (!obj.AND && !obj.OR) {
    Object.keys(obj).forEach((key) => {

      let [attr, operator] = key.split('_');

      let a = {};
      a[attr] = {};
      if (operator == 'like') {
        a[attr][Op.like] = obj[key];
      } else if (operator == 'equals') {
        a[attr][Op.eq] = obj[key];
      } else if (operator == 'in') {
        a[attr][Op.in] = obj[key];
      } else if (operator == 'not') {
        a[attr][Op.not] = obj[key];
      } else if (operator == 'notLike') {
        a[attr][Op.notLike] = obj[key];
      } else if (operator === 'regex') {
        a[attr][Op.iRegexp] = obj[key];
      } else if (operator === 'notRegexp') {
        a[attr][Op.notIRegexp] = obj[key];
      } else {
        a[attr][Op.eq] = obj[key];
      }

      obj[attr] = {};
      Object.defineProperties(obj,
        {
          [attr]: Object.getOwnPropertyDescriptor(a, attr),
        }
      );
      delete obj[key];
    });
    return obj;
  }

  if (obj.AND) {
    Object.defineProperties(obj,
      {
        [Op.and]: Object.getOwnPropertyDescriptor(obj, 'AND'),
      });
    delete obj.AND;
    obj[Op.and].forEach((item) => {
      modifyWhere(item);
    });
  }

  if (obj.OR) {
    Object.defineProperties(obj,
      {
        [Op.or]: Object.getOwnPropertyDescriptor(obj, 'OR'),
      });

    delete obj.OR;
    obj[Op.or].forEach((item) => {
      modifyWhere(item);
    });
  }


}

function createMutation(model) {
  return (obj, args, context) => {
    return context.models[model].create(args.data);
  };
}
function updateMutation(model) {
  return async (obj, args, context) => {
    const foundInstance = await context.models[model].findById(args.id);
    return foundInstance.update(args.data);
  };
}

function deleteMutation(model) {
  return async (obj, args, context) => {
    const foundInstance = await context.models[model].findById(args.id);
    return foundInstance.destroy();
  };
}
function findById(model) {
  return (obj, args, context) => {
    return context.models[model].findById(args.id);
  };
}
function findAll(model) {
  return (obj, args, context) => {
    const { where = {}, first = 10, skip = 0 } = args;
    modifyWhere(where);
    return context.models[model].findAll({
      limit: first,
      offset: skip,
      where,
    });
  }
}

function objIsEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
    && true
    || false;
}





module.exports = {
  getInstanceParams,
  assignModelToReq,
  getModel,
  modifyWhere,
  objIsEmpty,
  createMutation,
  findAll,
  findById,
  updateMutation,
  deleteMutation,
};
