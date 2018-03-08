const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const models = require('../models');
const mocks = require('./mocks');
const Pais = require('./schemaParts/pais');
const RazonSocial = require('./schemaParts/razonSocial');
const GrupoEmpresarial = require('./schemaParts/grupoEmpresarial');
const Op = require('sequelize').Op;


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



//filter[Op.and].push(operatorObj);

function objIsEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
    && true
    || false;
}


const RootQuery = `
  type RootQuery {
    _ : Boolean
  }`;

const RootMutation = `
  type RootMutation{
    _ : Boolean
  }
  
  `;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `;

const resolvers = {
  RootQuery: {
    razonesSociales: (obj, args, context, info) => {
      const { where = {}, first = 10, skip = 0 } = args;
      modifyWhere(where);
      return models.RazonesSociales.findAll({
        limit: args.first,
        offset: args.skip,
        where: where,
      });
    },
  }
};


const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,
    Pais,
    RazonSocial,
    GrupoEmpresarial,
  ],
  resolvers,
});

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});




module.exports = schema;

