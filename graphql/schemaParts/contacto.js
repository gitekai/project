const Contacto = `

type Contacto{
  nombre: String! @unique
  apellidos: String!
  cargo: String
  departamento: String
}

extend type RootQuery{
  contactos:[Contacto]
}
`;

module.exports = Contacto;

