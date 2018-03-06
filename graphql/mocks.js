const { MockList } = require('graphql-tools');
const casual = require('casual');

casual.seed(123);


/* eslint-disable */

const mocks = {
  Int: ()=> casual.integer(from = 555 ,to =  10000),
  Boolean: () => casual.coin_flip,
  String: ()=> casual.title, 
  GrupoEmpresarial: () => ({
    id: casual.integer(from = 666, to = 1000000),
    nombre: `${casual.company_name} ${casual.company_suffix}`,
    razonesSociales: () => new MockList([10, 30])
  }),
  RazonSocial: (ge)=>{
    return {
    id: casual.integer(from = 666, to = 1000000),
    nombre: casual.company_name,
    url: casual.url,
    nif: casual.numerify('X-#######-Y'),
    cuentaContaPlus: casual.integer(from = 1000, to = 100000),
    numCliente: casual.text,
    fechaAlta: casual.date(format = 'YYYYMMDD'),
    fechaBaja: casual.date(format = 'YYYYMMDD'),
    GrupoEmpresarial: ge ,
    }
  },
  Pais: () => ({
    nombre: casual.country,
  }),
  Estado: () => ({
    nombre: casual.random_element(['abierto','cerrado','ganado']),
  }),
  RedSocial: () => ({
    nombre: casual.random_element(['Facebook','Twitter','Google+','Instagram','LinkedIN']),
    url: casual.url,
  }),
  Contacto: () => ({
    nombre: casual.first_name,
    apellidos: casual.last_name,
    cargo: casual.random_element(['Manager','IT Specialist','Receptionist','Boss', 'CEO', 'Admin']),

    })
}

module.exports = mocks; 
