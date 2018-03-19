const { MockList } = require('graphql-tools');
const casual = require('casual');
const Contacto = require('./Contacto/mock');
const TipoContacto = require('./TipoContacto/mock');
const RedSocial = require('./RedSocial/mock');


casual.seed(123);



const mocks = {
  Int: () => casual.integer(from = 555, to = 10000),
  Boolean: () => casual.coin_flip,
  String: () => casual.word,
  GrupoEmpresarial: () => ({
    id: casual.integer(from = 666, to = 1000000),
    nombre: `${casual.company_name} ${casual.company_suffix}`,
    razonesSociales: () => new MockList([10, 30])
  }),
  RazonSocial: (ge) => {
    return {
      id: casual.integer(from = 666, to = 1000000),
      nombre: casual.company_name,
      url: casual.url,
      nif: casual.numerify('X-#######-Y'),
      cuentaContaPlus: casual.integer(from = 1000, to = 100000),
      numCliente: casual.string,
      fechaAlta: casual.date(format = 'YYYYMMDD'),
      fechaBaja: casual.date(format = 'YYYYMMDD'),
      GrupoEmpresarial: ge,
    }
  },
  Pais: () => ({
    nombre: casual.country,
  }),
  Estado: () => ({
    nombre: casual.random_element(['abierto', 'cerrado', 'ganado']),
  }),
  //RedSocial: RedSocial(casual),
  Contacto: Contacto(casual),
  TipoContacto: TipoContacto(casual),
}

module.exports = mocks; 
