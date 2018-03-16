/* eslint-disable */

module.exports = (casual) => _ => {
  return {
    id: casual.integer(from = 666, to = 1000000),
    nombre: casual.random_element(['Tecnico', 'Envio Postal', 'Evnio por email', 'Dirrecion de envio de contratos']),
    discripcion: casual.text,
  }
}