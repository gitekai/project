const Contacto = `

type Contacto{
  id: ID!
  nombre: String! @unique
  apellidos: String!
  "Tipo de Contacto que nadie entiende ... Hace falta otro nombre !!!!!"
  tipo: String!
  
  "Cargo: No parece que tiene normalizacion por lo que no aporta informacion valida en la BBDD"
  cargo: String
  "departamento: No parece que tiene normalizacion por lo que no aporta informacion valida en la BBDD"
  departamento: String
  "Si o Cargo o departamento realmente no aportan nada se sustituirán por este campo más generico"
  descripcion: String
  "Esto sirve para lamer culos ..."
  recibeRegaloEnNavidad: Boolean
}



"Ojo Que esto no funciona ni pa tras !!!!"
input createContacto{
  nombre: String! 
  apellidos: String!
  id_tipo_contacto: Int!
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

extend type RootQuery{
  contactos(where: queryContacto ): [Contacto!]!
  contacto(where: queryUniqueContacto ! ): Contacto!
}
extend type RootMutation{
  createContacto(data: createContacto): Contacto!
}
`;

module.exports = Contacto;

