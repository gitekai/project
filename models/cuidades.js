module.exports = (sequelize, DataTypes) => {
  const Ciudades = sequelize.define('Ciudades',
    {
      nombre: {
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        unique: 'un_pais_ciudad',
      },
    },
    {

    });

  Ciudades.associate = (models) => {
    /* OJITO el hasMany encima del belongsTo hace que funcione. Si no, no crea el foreignKey  ... 
   */
    Ciudades.hasMany(models.DireccionesFiscales, {
      foreignKey: 'id_ciudad',
    });
    Ciudades.belongsTo(models.Paises, {
      foreignKey: {
        fieldName: 'id_pais',
        allowNull: false,
        unique: 'un_pais_ciudad',
      },
    });

  };

  return Ciudades;
};
