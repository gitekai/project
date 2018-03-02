module.exports = (sequelize, DataTypes) => {
  const Paises = sequelize.define('Paises',
    {
      nombre: {
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        unique: true,
      },
      isEU: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
    });

  Paises.associate = (models) => {
    Paises.hasMany(models.Ciudades, {
      foreignKey: 'id_ciudad',
      allowNull: false,
    });
  };

  return Paises;
};
