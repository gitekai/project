/* eslint-disable */

module.exports = (casual) => _ => {
  return {
    id: casual.integer(from = 666, to = 1000000),
    nombre: casual.random_element(['telefono', 'Email', 'Carta', 'Whatsapp','Paloma','A boca','señales de humo']),
    discripcion: casual.text,
  }
}