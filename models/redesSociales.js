module.exports = (sequelize, DataTypes) => {
  const RedesSociales = sequelize.define('RedesSociales',
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
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
    });

  RedesSociales.associate = (models) => {
    RedesSociales.belongsToMany(models.Contactos, { 
      through: 'ContactoEnRedSocial',
      foreignKey: 'id_red_social',
    });
  }


  return RedesSociales;
};
