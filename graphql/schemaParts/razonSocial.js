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
  nombre_ne: String
  nombre_contains: String
}

extend type RootQuery{
  razonesSociales(where: rsInput, first: Int, skip: Int): [RazonSocial!]!
  razonSocial: RazonSocial
}


`;
//razonesSociales(where: rsInput, orderBy: OrderByInput,
// after: afterCursor, before: beforCursor, skip: Int, first: Int, last: Int): [RazonSocial!]!
module.exports = RazonSocial;
