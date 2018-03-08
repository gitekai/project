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
    promises.push(
      models.RazonesSociales.create(mocks.RazonSocial(ge))
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


/*
models.sequelize.sync({force: true}).then(()=>{
  create_razones_sociales();

}).catch((err)=>{
  console.log(err);
})



models.sequelize.sync({force: true}).then(



  server.listen(port, () => {
    console.log(`listening on port ${DEF_PORT}`);
  });
);

  .catch((err) => {
    console.log(err);
  });

  */
