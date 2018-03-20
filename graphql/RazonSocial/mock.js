/* eslint-disable */

module.exports = (casual) => ge => {
  return {
    id: casual.integer(from = 666, to = 1000000),
    nombre: casual.company_name,
    url: casual.url,
    nif: casual.numerify('X-#######-Y'),
    cuentaContaPlus: casual.integer(from = 1000, to = 100000),
    numCliente: casual.string,
    fechaAlta: casual.date(format = 'YYYYMMDD'),
    fechaBaja: casual.date(format = 'YYYYMMDD'),
    GrupoEmpresarial: ge,
  }
}