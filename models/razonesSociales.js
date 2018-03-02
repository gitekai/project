module.exports = (sequelize, DataTypes) => {
  const RazonesSociales = sequelize.define(
    'RazonesSociales',
    {
      nombre:
      {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nif: {
        type: DataTypes.STRING,
      },
      cuentaContaPlus: {
        type: DataTypes.BIGINT,
      },
      url:
      {
        type: DataTypes.STRING,
      },
      fechaAlta: {
        type: DataTypes.DATEONLY,
      },
      fechaBaja: {
        type: DataTypes.DATEONLY,
      },
      numCliente: {
        type: DataTypes.STRING, 
      },
    },
    {
      // tablename: 'razones_sociales',
    });

  RazonesSociales.associate = (models) => {
    RazonesSociales.hasOne(RazonesSociales,{
      as: 'AnteriorRazonSocial',
      foreignKey: 'id_anterior_rs',
    });
  }
  return RazonesSociales;
};
