const RedSocial = `

type RedSocial{
  id: ID!
  nombre: String! @unique
  url: String! @unique
}

input createRedSocial{
  nombre: String!
  url: String!
}
input updateRedSocial{
  nombre: String
  url: String
}

input queryRedSocial{
  AND: [queryRedSocial!]
  OR: [queryRedSocial!]
  id_equals: Int 
  nombre_equals: String
  url_equals: String

  id_regex: Int 
  nombre_regex: String
  url_regex: String


  id_not: Int 
  nombre_not: String
  url_not: String
}

input queryUniqueRedSocial{
  id: Int
  nombre: String
  url: String
}

type RedSocialDelete {
  count: Int!
}


extend type  RootQuery{
  redesSociales(first: Int, skip: Int, where: queryRedSocial): [RedSocial!]!
  redSocial(id: Int! ): RedSocial
}
extend type RootMutation{
  createRedSocial(data: createRedSocial!): RedSocial!
  modifyRedSocial(data: updateRedSocial!, id: Int!): RedSocial!
  deleteRedSocial(id: Int!): RedSocialDelete
}

`;

module.exports = RedSocial;
