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
      descripcion: {
        type: DataTypes.TEXT,
      }
    },
    {
    });

  TiposContacto.associate = (models) => {
    TiposContacto.hasMany(models.Contactos, {
      foreignKey: {
        name: 'idTiposContacto',
        //field: 'id_tipos_contacto',
        allowNull: false,
      },

    });
  }
  return TiposContacto;
};
