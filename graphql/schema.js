const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const models = require('../models');
const mocks = require('./mocks');
const Pais = require('./schemaParts/pais');
const RazonSocial = require('./schemaParts/razonSocial');
const GrupoEmpresarial = require('./schemaParts/grupoEmpresarial');
const Op = require('sequelize').Op;

/*
function createWhere(root, res = {}) {
  Object.keys(root).forEach((key) => {

    let operator;
    let field;
    if (/(OR|AND)/.test(key)) {
      operator = key;
    } else {
      [field, operator] = key.split('_')
    }
    const operatorObj = {};

    if (operator == "equals") {
      operatorObj[field] = { [Op.eq]: root[key] };
      res = operatorObj;
      root = (typeof (root[key]) == "object") ? root[key] : {};
      createWhere(root, res);
    }
    else if (operator == "like") {
      operatorObj[field] = { [Op.like]: root[key] };
      res = operatorObj;
      root = (typeof (root[key]) == "object") ? root[key] : {};
      createWhere(root, res);
    } else if (operator == "OR") {
      //Array o object
      if (Array.isArray(root[key])) { // its always because of graphql 
        root[key].forEach((item) => {
          if (Array.isArray(res[Op.or])) {
            res[Op.or].push(item);
          } else {
            // initializo el objeto como array
            res[Op.or] = [item];
          }
        });
      }



      //estripar y meter en operador
      //createWhere()
      console.log("");
    } else if (operator == "AND") {
      //estripar y meter en operador
      // no puede haber un AND vacio está controlado por graphql 
      //createWhere()
      console.log("");
    }

  });

  if (objIsEmpty(root)) {
    // hemos llegado a la condicion final 
    return res;
  }
}

*/
function createWhere(root, res = {}, pointer) {


  if (Array.isArray(root)) {
    //AND OR OR operators
    root.forEach((item) => {
      if (typeof item == 'object') {
        createWhere(item, res);
      }
    });
  } else {
    //convertir obj in sequelizable 
    const operatorObj = {};

    Object.keys(root).forEach((key) => {
      let operator;
      let field;
      if (/(OR|AND)/.test(key)) {
        operator = key;
      } else {
        [field, operator] = key.split('_')
      }
      if (operator == "equals") {
        operatorObj[field] = { [Op.eq]: root[key] };
      } else if (operator == "like") {
        operatorObj[field] = { [Op.like]: root[key] };
      }

      if (operator == "OR") {
        createWhere(root[key], res[Op.or]=[]);
      } else if (operator == "AND") {
        createWhere(root[key], res[Op.and]=[]);
      }

      if (Array.isArray(res)) {
        res.push(operatorObj);
      } else {
        // initializo el objeto como array
        res = operatorObj;
      }
    });
  }
  return res;

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


      /*
      let filter = {
        [Op.and]: [],
        //[Op.or]: [],      
      };
      Object.keys(where).forEach((key) => {
        const [field, operator] = key.split('_');

        const operatorObj = {};
        operatorObj[field] = { [Op.like]: where[key] };

        if (operator == "equals") {
          operatorObj[field] = { [Op.eq]: where[key] };
        }
        else if (operator == "like") {
          operatorObj[field] = { [Op.like]: where[key] };
        } else if (operator == "OR") {
          //strip that shit
        }



        filter[Op.and].push(operatorObj);
        /*filter = {
          [Op.and]: [
            operatorObj,
          ],
        };


      });*/
      const { where = {}, first = 10, skip = 0 } = args;
      let o = createWhere(where);
      console.log("where");
      return models.RazonesSociales.findAll({
        limit: args.first,
        offset: args.skip,
        where: o,

      });
    },
    //dels.RazonesSociales.findAll({ where:{ [op.and]: { nombre: 'kk' , url: 'pipi'}} })
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

