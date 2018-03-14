module.exports = (sequelize, DataTypes) => {
  const TiposContacto = sequelize.define('TiposContacto',
    {
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
      },
      isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
    });

  TiposContacto.associate = (models) => {
    TiposContacto.hasMany(models.Contactos, {
      foreignKey: { 
        fieldName: 'id_tipo_contacto',
        allowNull: false,
      },
      
    });
  }
  return TiposContacto;
};
