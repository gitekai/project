const TipoMedioComunicacion = `

type TipoMedioComunicacion{
  id: ID!
  nombre: String! @unique 
  descripcion: String
}

input createTipoMedioComunicacion{
  nombre: String!
  descripcion: String
}
input updateTipoMedioComunicacion{
  nombre: String
  descripcion: String
}

input queryTipoMedioComunicacion{
  AND: [queryTipoMedioComunicacion!]
  OR: [queryTipoMedioComunicacion!]
  id_equals: Int 
  nombre_equals: String

  id_regex: Int 
  nombre_regex: String

  id_not: Int 
  nombre_not: String
}

input queryUniqueTipoMedioComunicacion{
  id: Int
  nombre: String
}

type TipoMedioComunicacionDelete {
  count: Int!
}


extend type  RootQuery{
  tiposMediosComunicaciones(where: queryTipoMedioComunicacion): [TipoMedioComunicacion!]!
  tipoMedioComunicacion(id: Int! ): TipoMedioComunicacion
}
extend type RootMutation{
  createTipoMedioComunicacion(data: createTipoMedioComunicacion!): TipoMedioComunicacion!
  modifyTipoMedioComunicacion(data: updateTipoMedioComunicacion!, id: Int!): TipoMedioComunicacion!
  deleteTipoMedioComunicacion(id: Int!): TipoMedioComunicacionDelete
}

`;

module.exports = TipoMedioComunicacion;
