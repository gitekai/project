const data = require('../models');
const contactoDataLoaders = require('./Contacto/resolver').dataloaders;
const medioComunicacionDataLoaders = require('./MedioComunicacion/resolver').dataloaders;


module.exports = () => ({
  author_id: 10, // should come from the request for an authentified user
  models: data,
  dataloaders: {
    ...contactoDataLoaders(data),
    ...medioComunicacionDataLoaders(data),
  },
});
