module.exports = (sequelize, DataTypes) => {
  const TipoMedioComunicacion = sequelize.define('TipoMedioComunicacion',
    {
      nombre: {
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        unique: true,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
    },
    {
    });

  TipoMedioComunicacion.associate = (models) => {
    TipoMedioComunicacion.hasMany(models.MedioComunicacion, {
      foreignKey: 'id_tipo_medio_comunicacion',
    });
  };

  return TipoMedioComunicacion;
};
