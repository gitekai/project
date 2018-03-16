module.exports = (sequelize, DataTypes) => {
  const MedioComunicacion = sequelize.define('MediosComunicaciones',
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

  MedioComunicacion.associate = (models) => {
    MedioComunicacion.belongsTo(models.TiposMedioComunicacion, {
      foreignKey: {
        name: 'idTipoMedioComunicacion',
        unique: 'uq_mediocomunicacion_valor',
      },
    });
    MedioComunicacion.belongsTo(models.Contactos, {
      foreignKey: 'idContacto',
      allowNull: false,
    });
  };

  return MedioComunicacion;
};
