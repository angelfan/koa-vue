module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  
  User.associate = (models) => {
    User.hasMany(models.List, { foreignKey: { name: 'user_id' } });
  };
  
  return User;
};