const Pais = `

type Pais{
  "Nombre del Pais"
  nombre: String!
  "Booleano que nos sirve para saber si aplicar IVA o no"
  isEu: Boolean!
}

extend type RootQuery{
  paises:[Pais]
}

`;

module.exports = Pais;
