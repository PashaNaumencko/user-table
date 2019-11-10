module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.ENUM('Male', 'Female'),
      age: DataTypes.INTEGER,
    },
    {
      timestamps: true
    }
  );

  return Repository;
};
