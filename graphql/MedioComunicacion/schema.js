const MedioComunicacion = `

type MedioComunicacion{
  id: ID!
  valor: String! @unique 
  descripcion: String

  tipoMedioComunicacion: TipoMedioComunicacion!
  contacto: Contacto!
}

input createMedioComunicacion{
  valor: String!
  descripcion: String
}
input updateMedioComunicacion{
  valor: String
  descripcion: String
}

input queryMedioComunicacion{
  AND: [queryMedioComunicacion!]
  OR: [queryMedioComunicacion!]
  id_equals: Int 
  valor_equals: String

  id_regex: Int 
  valor_regex: String

  id_not: Int 
  valor_not: String
}

input queryUniqueMedioComunicacion{
  id: Int
  valor: String
}

type MedioComunicacionDelete {
  count: Int!
}


extend type  RootQuery{
  mediosComunicaciones(where: queryMedioComunicacion): [MedioComunicacion!]!
  medioComunicacion(id: Int! ): MedioComunicacion
}
extend type RootMutation{
  createMedioComunicacion(data: createMedioComunicacion!): MedioComunicacion!
  modifyMedioComunicacion(data: updateMedioComunicacion!, id: Int!): MedioComunicacion!
  deleteMedioComunicacion(id: Int!): MedioComunicacionDelete
}

`;

module.exports = MedioComunicacion;
