module.exports = (sequelize, DataTypes) => {
  const GruposEmpresariales = sequelize.define('GruposEmpresariales',
    {
      nombre:
      {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      underscored: true,
      tablename: 'grupos_empresariales',
    });

  GruposEmpresariales.associate = (models) => {
    GruposEmpresariales.hasMany(models.RazonesSociales, {
      foreignKey: 'fkRazonesSociales',
    });
  };

  return GruposEmpresariales;
};
