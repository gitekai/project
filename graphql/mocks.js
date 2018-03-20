const { MockList } = require('graphql-tools');
const casual = require('casual');
const Contacto = require('./Contacto/mock');
const TipoContacto = require('./TipoContacto/mock');
const RedSocial = require('./RedSocial/mock');
const TipoMedioComunicacion = require('./TipoMedioComunicacion/mock');
const MedioComunicacion = require('./MedioComunicacion/mock');
const Pais = require('./Pais/mock');
const RazonSocial = require('./RazonSocial/mock');
const Estado = require('./Estado/mock');
const GrupoEmpresarial = require('./GrupoEmpresarial/mock');
casual.seed(123);


const mocks = {
  Int: () => casual.integer(from = 555, to = 10000),
  Boolean: () => casual.coin_flip,
  String: () => casual.word,
  razonesSociales: () => new MockList([10, 30]),

  GrupoEmpresarial: GrupoEmpresarial(casual),
  Estado: Estado(casual),
  Pais: Pais(casual),
  RedSocial: RedSocial(casual),
  RazonSocial: RazonSocial(casual),
  Contacto: Contacto(casual),
  TipoContacto: TipoContacto(casual),
  TipoMedioComunicacion: TipoMedioComunicacion(casual),
  MedioComunicacion: MedioComunicacion(casual),
}

module.exports = mocks; 
