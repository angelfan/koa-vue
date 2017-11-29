module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return User;
};