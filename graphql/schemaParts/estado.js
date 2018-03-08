const Estado = `

  type Estado{
    id: Int!
    nombre: String!
    siguenteEstado: Estado
  }

  extend type RootQuery{
    estados:[Estado]
  }
`;

module.exports = Estado;
