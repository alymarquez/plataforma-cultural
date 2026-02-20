'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Work.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    coverImage: DataTypes.STRING,
    type: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};