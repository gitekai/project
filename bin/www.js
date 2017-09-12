const app = require('../app');
const http = require('http');
const models = require('../models');


const DEF_PORT = 3001;
const port = process.env.PORT || DEF_PORT;
const server = http.createServer(app);

models.sequelize.sync().then(
  () =>
    new Promise(() => {
      server.listen(port, () => {
        console.log(`listening on port ${DEF_PORT}`);
      });
    }))
  .catch((err) => {
    console.log(err);
  });
