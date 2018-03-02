module.exports = (sequelize, DataTypes) => {
  const MedioComunicacion = sequelize.define('MedioComunicacion',
    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        unique: true,
      },
      anotacion: {
        type: DataTypes.STRING,
      },
    },
    {
    });

  MedioComunicacion.associate = (models) => {
    MedioComunicacion.belongsTo(models.TipoMedioComunicacion, {
      foreignKey: {
        primaryKey: true,
        fieldName: 'id_tipo_medio_comunicacion',
      },
    });
    MedioComunicacion.belongsTo(models.Contactos, {
      foreignKey: 'id_contacto',
      allowNull: false,
    });
  };

  return MedioComunicacion;
};
