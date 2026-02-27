'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Review.belongsTo(models.Work, {
        foreignKey: 'workId'
      })
    }
  }
  Review.init({
    status: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    workId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};