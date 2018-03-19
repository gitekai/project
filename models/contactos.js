module.exports = (sequelize, DataTypes) => {
  const Contactos = sequelize.define('Contactos',
    {
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('nombre', val.toLowerCase());
        },
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      departamento: {
        type: DataTypes.STRING,
      },
      recibeRegaloEnNavidad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

    },
    {
    });

  Contactos.associate = (models) => {
    Contactos.hasMany(models.MediosComunicacion, {
      foreignKey: 'idContacto',
      allowNull: false,
    });
    Contactos.belongsToMany(models.RedesSociales, {
      through: 'ContactoEnRedSocial',
      foreignKey: 'idContacto',
      allowNull: false,
      unique: true,
    });
    Contactos.belongsTo(models.TiposContacto, {
      foreignKey: {
        name: 'idTiposContacto',
        // field: 'id_tipos_contacto',
        allowNull: false,
      },
    });
  };

  return Contactos;
};
