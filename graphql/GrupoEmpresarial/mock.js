/* eslint-disable */

module.exports = (casual) => _ => {
  return {
    id: casual.integer(from = 666, to = 1000000),
    nombre: `${casual.company_name} ${casual.company_suffix}`,
  }
}

