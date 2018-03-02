module.exports = (sequelize, DataTypes) => {
  const DireccionesFiscales = sequelize.define('DireccionesFiscales',
    {
      calle: {
        type: DataTypes.STRING,
      },
      calleDetalle: {
        type: DataTypes.STRING,
      },
      codigoPostal: {
        type: DataTypes.INTEGER,
      },
      provincia: {
        type: DataTypes.STRING,
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
    });

  DireccionesFiscales.associate = (models) => {
    DireccionesFiscales.belongsTo(models.Ciudades, {
      foreignKey: 'id_ciudad',
      allowNull: false,
    });
  };

  return DireccionesFiscales;
};
