const Contacto = `

type Contacto{
  id: ID!
  nombre: String! @unique
  apellidos: String!
  "Tipo de Contacto que nadie entiende ... Hace falta otro nombre !!!!!"
  tipo: TipoContacto!
  redesSociales: [String!]!
  mediosDeComunicacion: [MedioComunicacion!]!

  
  "Cargo: No parece que tiene normalizacion por lo que no aporta informacion valida en la BBDD"
  cargo: String
  "departamento: No parece que tiene normalizacion por lo que no aporta informacion valida en la BBDD"
  departamento: String
  "Si o Cargo o departamento realmente no aportan nada se sustituirán por este campo más generico"
  descripcion: String
  "Esto sirve para lamer culos ..."
  recibeRegaloEnNavidad: Boolean
}

type ContactoEnRedSocial{
  redSocial: RedSocial!
  urlContacto: String!
}

input createContacto{
  nombre: String! 
  apellidos: String!
  cargo: String
  departamento: String
  descripcion: String
  recibeRegaloEnNavidad: Boolean
  
  idTipoContacto: Int!
  idsMediosDeComunicacion: [Int!]!
  idsRedesSociales: [Int!]
}

input updateContacto{
  nombre: String 
  apellidos: String
  cargo: String
  departamento: String
  descripcion: String
  recibeRegaloEnNavidad: Boolean
}

input queryUniqueContacto{
  id: Int
  nombre: String
}

input queryContacto{
  nombre_equals: String
  apellidos_equals: String
  id_tipo_contacto_equals: Int
  cargo_equals: String
  departamento_equals: String
  descripcion_equals: String
  recibeRegaloEnNavidad_equals: Boolean

  nombre_regex: String
  apellidos_regex: String
  id_tipo_contacto_regex: Int
  cargo_regex: String
  departamento_regex: String
  descripcion_regex: String
  recibeRegaloEnNavidad_regex: Boolean
 
}

type ContactoDelete{
  success: Int
}

extend type RootQuery{
  contactos(first: Int, skip: Int, where: queryContacto): [Contacto!]!
  contacto(id: Int! ): Contacto
}
extend type RootMutation{
  createContacto(data: createContacto!): Contacto!
  modifyContacto(data: updateContacto!, id: Int!): Contacto!
  deleteContacto(id: Int!): ContactoDelete

  addSocialNetworks(idsSocialNetworks: [Int!]! ): Contacto!
  addMediosDeComunicacion(idsMediosDeContacto: [Int!]!): Contacto!

}
`;

module.exports = Contacto;

