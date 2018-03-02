module.exports = (sequelize, DataTypes) => {
  const TiposContacto = sequelize.define('TiposContacto',
    {
      nombre: {
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        unique: true,
      },
      isVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
    });

  TiposContacto.associate = (models) => {
    TiposContacto.hasMany(models.Contactos, {
      foreignKey: { 
        primaryKey: true,
        fieldName: 'id_tipo_contacto',
      },
      
    });
  }
  return TiposContacto;
};
