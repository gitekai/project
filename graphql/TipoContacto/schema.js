const TipoContacto = `

type TipoContacto{
  id: ID!
  nombre: String! @unique 
  isVisible: Boolean!
}

input createTipoContacto{
  nombre: String!
  isVisible: Boolean
}
input updateTipoContacto{
  nombre: String
  isVisible: Boolean
}

input queryTipoContacto{
  AND: [queryTipoContacto!]
  OR: [queryTipoContacto!]
  id_equals: Int 
  nombre_equals: String
  isVisible_equals: Boolean

  id_regex: Int 
  nombre_regex: String

  id_not: Int 
  nombre_not: String
  isVisible_not: Boolean
}

input queryUniqueTipoContacto{
  id: Int
}

extend type  RootQuery{
  tiposContactos(where: queryTipoContacto): [TipoContacto!]!
  tipoContacto(where: queryUniqueTipoContacto! ): TipoContacto
}
extend type RootMutation{
  createTipoContacto(data: createTipoContacto!): TipoContacto!
  modifyTipoContacto(data: updateTipoContacto!, id: Int!): TipoContacto!
  deleteTipoContacto(id: Int!): TipoContacto
}

`;

module.exports = TipoContacto;
