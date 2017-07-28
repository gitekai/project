module.exports = (sequelize, DataTypes) => {
  const GruposEmpresariales = sequelize.define('GruposEmpresariales', {
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    nif: {
      type: DataTypes.STRING,
    },
    tlf: {
      type: DataTypes.INTEGER,
    },
    correo: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    tablename: 'grupos_empresariales',
  });

  return GruposEmpresariales;
};
