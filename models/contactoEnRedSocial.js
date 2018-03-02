module.exports = (sequelize, DataTypes) => {
  const ContactoEnRedSocial = sequelize.define('ContactoEnRedSocial',
    {
      urlContacto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {

    });

  return ContactoEnRedSocial;
};
