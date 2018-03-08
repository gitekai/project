const RazonSocial = `

type RazonSocial {
  nombre: String! 
  nif: String
  cuentaContaPlus: Int
  url: String
  fechaAlta: Int!
  fechaBaja: Int
  numCliente: String
  grupoEmpresarial: GrupoEmpresarial
}

input rsInput{
  AND: [rsInput!]
  OR: [rsInput!]

  nombre_equals: String
  nif_equals: String
  cuentaContaPlus_equals: String
  url_equals: String
  numCliente_equals: String
  fechaAlta_equals: String
  fechaBaja_equals: String
  GrupoEmpresarial_equals: String

  nombre_like: String
  nif_like: String
  cuentaContaPlus_like: String
  url_like: String
  numCliente_like: Int
  fechaAlta_like: String
  fechaBaja_like: String

  nombre_notLike: String
  nif_notLike: String
  cuentaContaPlus_notLike: String
  url_notLike: String
  numCliente_notLike: Int
  fechaAlta_notLike: String
  fechaBaja_notLike: String

  nombre_not: String
  nif_not: String
  cuentaContaPlus_not: String
  url_not: String
  numCliente_not: Int
  fechaAlta_not: String
  fechaBaja_not: String

  nombre_in: String
  nif_in: String
  cuentaContaPlus_in: Int
  url_in: String
  numCliente_in: String
  fechaAlta_in: String
  fechaBaja_in: String
}

extend type RootQuery{
  razonesSociales(where: rsInput, first: Int, skip: Int): [RazonSocial!]!
  razonSocial: RazonSocial
}


`;
// razonesSociales(where: rsInput, orderBy: OrderByInput,
// after: afterCursor, before: beforCursor, skip: Int, first: Int, last: Int): [RazonSocial!]!
module.exports = RazonSocial;
