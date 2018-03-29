const DataLoader = require('dataloader');
const utilLoader = require('../../utils/genericLoaders');

const contactoLoader = utilLoader.getUniqueItemAsociationLoader('Contactos', 'id');

const dataloaders = models => ({
  contactoById: new DataLoader(contactoLoader(models)),
});

module.exports = {
  dataloaders,
};
