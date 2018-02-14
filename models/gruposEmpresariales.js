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
        field: 'namen_ist_proben',
        // esto es para hacer un mapeo y así evitar exponer los nombres reales de las columnas
        //el field representa el campo verdadero de la BBDD
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
