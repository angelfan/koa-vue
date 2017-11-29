module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    status: DataTypes.TINYINT,
  });
  
  List.associate = (models) => {
    List.belongsTo(models.User, { foreignKey: { name: 'user_id' } });
  };
  
  return List;
};
