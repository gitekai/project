const app = require('../app');
const http = require('http');
const models = require('../models');
const mocks = require('../graphql/mocks');

const DEF_PORT = 3001;
const port = process.env.PORT || DEF_PORT;
const server = http.createServer(app);


async function create_rs(counter) {
  const promises = [];

  let ge = mocks.GrupoEmpresarial();
  await models.GruposEmpresariales.create(ge);
  for (let i = 0; i < counter; i += 1) {
    let rs = mocks.RazonSocial(ge);
    rs.nombre = `${rs.nombre}_${i}`;
    promises.push(
      models.RazonesSociales.create(rs)
    );
  }
  return Promise.all(promises)
    .catch((err) => {
      console.log(`Ha habido un error = ${err}`);
    });

}

function random(max=0){
  return Math.floor(Math.random() * Math.floor(max));
}

async function create_contactos(countTipo = 1, countContactos = 2) {
  const promises = [];

  const arrTipos = new Array();
  const arrTiposPromises = new Array();
  for (let i = 0; i < countTipo; i++) {
    let tipoContacto = mocks.TipoContacto();
    tipoContacto.nombre = `${tipoContacto.nombre}_${i}`;
    arrTipos.push(tipoContacto);
    arrTiposPromises.push(models.TiposContacto.create(tipoContacto));
  }
  await Promise.all(arrTiposPromises);
  arrContactosPromise = new Array();
  for (let i = 0; i < countContactos; i += 1) {
    let tipoContacto = arrTipos[random(countTipo)]
    let contacto = mocks.Contacto(tipoContacto.id);
    arrContactosPromise.push(models.Contactos.create(contacto));
  }
  return Promise.all(arrContactosPromise)
    .catch((err) => {
      console.log(`Ha habido un error = ${err}`);
    });
}

async function startup() {
  await models.sequelize.sync({ force: true });
  await create_rs(10);
  await create_contactos(3,20);
  server.listen(port, () => {
    console.log("server started");
  });
}

startup();
