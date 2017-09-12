module.exports = (sequelize, DataTypes) => {
  const RelGsRs = sequelize.define('RelGsRs',
    {
      fk_razones_sociales: 
      {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'RazonesSociales',
          key: 'id',
        },
      },
      fk_grupos_empresariales:
      {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'GruposEmpresariales',
          key: 'id',
        },
      },
    },
    {
      underscored: true,
      tablename: 'Rel_Gs_Rs',
    });

  return RelGsRs;
};
