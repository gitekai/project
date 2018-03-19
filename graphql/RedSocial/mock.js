/* eslint-disable */

module.exports = (casual) => _ => {
  return {
    id: casual.integer(from = 666, to = 1000000),
    nombre: casual.random_element(['Facebook', 'Twitter', 'Google+', 'Instagram', 'LinkedIN']),
    url: casual.url,
  }
}
