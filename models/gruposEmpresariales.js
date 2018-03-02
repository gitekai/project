module.exports = (sequelize, DataTypes) => {
  const GruposEmpresariales = sequelize.define('GruposEmpresariales',
    {
      nombre:
      {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('nombre', val.toUpperCase());
        },
        // field: 'namen_ist_proben',
      },
    },
    {
    });

 /* GruposEmpresariales.associate = (models) => {
    GruposEmpresariales.hasMany(models.RazonesSociales, {
      foreignKey: 'fkRazonesSociales',
    });
  };*/
  return GruposEmpresariales;
};
