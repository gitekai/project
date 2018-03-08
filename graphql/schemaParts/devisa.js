const Devisa = `

type Devisa{
  id: Int!
  nombre: String!
}

extend type RootQuery{
  devisas:[Devisa]
}
`;

module.exports = Devisa;
