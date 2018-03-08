const Producto = `
 
type Producto{
    nombre: String! @unique
    precio: Int!
    devisa: Devisa!
  }

  extend type RootQuery{
    productos:[Producto]
  }
  `;

module.exports = Producto;
