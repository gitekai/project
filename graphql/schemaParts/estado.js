const Estado = `

  type Estado{
    id: Int!
    nombre: String!
    siguenteEstado: Estado
  }
`;

module.exports = Estado;
