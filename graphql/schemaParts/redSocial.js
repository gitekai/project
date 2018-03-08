const RedSocial = `

type RedSocial{
  nombre: String! 
  url: String! 
}

extend type RootQuery{
  redesSociales:[RedSocial]
}
`;

module.exports = RedSocial;
