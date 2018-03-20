/* eslint-disable */

module.exports = (casual) => _ => {
  return {
    nombre: casual.random_element(['abierto', 'cerrado', 'ganado']),
  }
}