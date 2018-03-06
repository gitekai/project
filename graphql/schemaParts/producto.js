const Producto = `
 
type Producto{
    nombre: String! @unique
    precio: Int!
    devisa: Devisa!
  }
  `;

module.exports = Producto;
