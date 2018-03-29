const DataLoader = require('dataloader');
const utilLoader = require('../../utils/genericLoaders');

const tipoContactoLoader = utilLoader.getUniqueItemAsociationLoader('TiposContacto', 'id');
const mediosDeComunicacionLoader = utilLoader.getAsociationArrayLoader('MediosComunicacion', 'idContacto');
const redesSocialesLoader = utilLoader.getAsociationArrayLoader('ContactoEnRedSocial', 'idContacto');

const dataloaders = models => ({
  tipoContactoById: new DataLoader(tipoContactoLoader(models)),
  mediosDeComunicacionById: new DataLoader(mediosDeComunicacionLoader(models)),
  redesSocialesById: new DataLoader(redesSocialesLoader(models)),
});

module.exports = {
  dataloaders,
};
