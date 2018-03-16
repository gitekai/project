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
    Contactos.hasMany(models.MediosComunicaciones, {
      foreignKey: 'idContacto',
      allowNull: false,
    });
    Contactos.belongsToMany(models.RedesSociales, { 
      through: 'ContactoEnRedSocial',
      foreignKey: 'id_contacto',
      allowNull: false,
      unique: true,
    });
    Contactos.belongsTo(models.TiposContacto, {
      foreignKey: {
        name: 'idTiposContacto',
        //field: 'id_tipos_contacto',
        allowNull: false,
      },       
    });
  };

  return Contactos;
};


/*
cargo 
departamento: 
  --> deberían ser normalizados también, 
      si no serán reemplazado por el campo descripcion !!!!
tipoDeContacto
  -te
  -Envio postal 
  -Envio por email
  -Tecnico
  -Dirrecion de envio de contrators 
  --> para Que coño supuestamente sirve esto. 


*/