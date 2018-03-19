module.exports = (sequelize, DataTypes) => {
  const ContactoEnRedSocial = sequelize.define('ContactoEnRedSocial',
    {
      urlContacto: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {

    });
  return ContactoEnRedSocial;
};
