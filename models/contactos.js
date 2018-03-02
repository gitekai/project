module.exports = (sequelize, DataTypes) => {
  const Contactos = sequelize.define('Contactos',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
      },

      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      departamento: {
        type: DataTypes.STRING,
      },

    },
    {
    });

  Contactos.associate = (models) => {
    Contactos.hasMany(models.MedioComunicacion, {
      foreignKey: 'id_contacto',
      allowNull: false,
    });
    Contactos.belongsToMany(models.RedesSociales, { 
      through: 'ContactoEnRedSocial',
      foreignKey: 'id_contato',
    });
    Contactos.belongsTo(models.TiposContacto, {
      foreignKey: {
        primaryKey: true,
        fieldName: 'id_tipo_contacto',
      }        
    });
  };

  return Contactos;
};
