const Contacto = `

type Contacto{
  nombre: String! @unique
  apellidos: String!
  cargo: String
  departamento: String
}
`;

module.exports = Contacto;

