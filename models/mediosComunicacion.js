module.exports = (sequelize, DataTypes) => {
  const MediosComunicacion = sequelize.define('MediosComunicacion',
    {

      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        unique: 'uq_mediocomunicacion_valor',
      },
      anotacion: {
        type: DataTypes.STRING,
      },
    },
    {
    });

  MediosComunicacion.associate = (models) => {
    MediosComunicacion.belongsTo(models.TiposMedioComunicacion, {
      foreignKey: {
        name: 'idTipoMedioComunicacion',
        unique: 'uq_mediocomunicacion_valor',
      },
    });
    MediosComunicacion.belongsTo(models.Contactos, {
      foreignKey: 'idContacto',
      allowNull: false,
    });
  };

  return MediosComunicacion;
};
