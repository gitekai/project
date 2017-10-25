module.exports = (sequelize, DataTypes) => {
  const RazonesSociales = sequelize.define(
    'RazonesSociales',
    {
      // id is not needed (will be done automatically)
    /* id:
      {
        type: DataTypes.INTEGER,
        primaryKey: true,
      }, */     
      nombre:
      {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nif:
      {
        type: DataTypes.STRING,
      },

      tlf:
      {
        type: DataTypes.INTEGER,
      },
      correo:
      {
        type: DataTypes.STRING,
      },
      url:
      {
        type: DataTypes.STRING,
      },

    },
    {
      underscored: true,
      tablename: 'razones_sociales',
    },
  );

  return RazonesSociales;
};
