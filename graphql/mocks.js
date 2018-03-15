const { MockList } = require('graphql-tools');
const casual = require('casual');

casual.seed(123);


/* eslint-disable */

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
  RedSocial: () => ({
    nombre: casual.random_element(['Facebook', 'Twitter', 'Google+', 'Instagram', 'LinkedIN']),
    url: casual.url,
  }),
  Contacto: (id_tipo) => {
    return {
      id: casual.integer(from = 666, to = 1000000),
      nombre: casual.first_name,
      apellidos: casual.last_name,
      cargo: casual.random_element(['Manager', 'IT Specialist', 'Receptionist', 'Boss', 'CEO', 'Admin']),
      id_tipo_contacto: id_tipo,
      descripcion: casual.text,
    }
  },
  TipoContacto: () => {
    return {
      id: casual.integer(from = 666, to = 1000000),
      nombre: casual.random_element(['Tecnico', 'Envio Postal', 'Evnio por email', 'Dirrecion de envio de contratos']),
      isVisible: casual.coin_flip,
    }
  }
}

module.exports = mocks; 
