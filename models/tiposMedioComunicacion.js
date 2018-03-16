module.exports = (sequelize, DataTypes) => {
  const TiposMedioComunicacion = sequelize.define('TiposMedioComunicacion',
    {
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
    },
    {
    });


  TiposMedioComunicacion.associate = (models) => {
    TiposMedioComunicacion.hasMany(models.MediosComunicaciones, {
      foreignKey: 'IdTiposMedioComunicacion',
    });
  };

  return TiposMedioComunicacion;
};
