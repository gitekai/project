
/* eslint-disable */
module.exports = (casual) => (idTipo) => {
  return {
   // id: casual.integer(from = 666, to = 1000000),
    nombre: casual.first_name,
    apellidos: casual.last_name,
    cargo: casual.random_element(['Manager', 'IT Specialist', 'Receptionist', 'Boss', 'CEO', 'Admin']),
    idTiposContacto: idTipo,
    descripcion: casual.text,
  }
};
