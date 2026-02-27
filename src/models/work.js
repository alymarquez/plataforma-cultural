'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    static associate(models) {
      Work.hasMany(models.Review, {
        foreignKey: 'workId',
        as: 'reviews'
      })
    }
  }
  Work.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    coverImage: DataTypes.STRING,
    type: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    externalId: DataTypes.STRING,
    externalSource: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};