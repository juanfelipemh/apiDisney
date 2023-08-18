'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character_movie_gender extends Model {

    static associate(models) {
      Character_movie_gender.belongsTo(models.Character, {
        foreignKey: 'idCharacter'
      });
    
      Character_movie_gender.belongsTo(models.Movie, {
        foreignKey: 'idMovie'
      });
    
      Character_movie_gender.belongsTo(models.Gender, {
        foreignKey: 'idGender'
      });  
    }
  }
  Character_movie_gender.init({
    idCharacter: DataTypes.INTEGER,
    idMovie: DataTypes.INTEGER,
    idGender: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Character_movie_gender',
    tableName: 'Character_movie_gender'
  });
  return Character_movie_gender;
};