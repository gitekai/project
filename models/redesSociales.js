module.exports = (sequelize, DataTypes) => {
  const RedesSociales = sequelize.define('RedesSociales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('nombre', val.toLowerCase());
        },
      },
      url: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('url', val.toLowerCase());
        },
      },
    },
    {
    });

  RedesSociales.associate = (models) => {
    RedesSociales.belongsToMany(models.Contactos, {
      through: 'ContactoEnRedSocial',
      foreignKey: 'idRedSocial',
    });
  };

  return RedesSociales;
};
