module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    user_id: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return List;
};