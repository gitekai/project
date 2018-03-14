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

async function startup() {
  await models.sequelize.sync({ force: true });
  await create_rs(10);
  server.listen(port, () => {
    console.log("server started");
  });
}

startup();
