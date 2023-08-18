'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      Movie.belongsToMany(models.Character, {
        through: 'Character_movie_gender',
        foreignKey: 'idMovie'
      });
      Movie.belongsToMany(models.Gender, {
        through: 'Character_movie_gender',
        foreignKey: 'idMovie'
      });
      //Movie.belongsTo(models.Gender, { foreignKey: 'idGender' });
    }
  }
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};


/*  RELACION ENTRE TABLAS - LA OTRA ES APUNTANDO A character_movie_gende
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      Movie.belongsToMany(models.Character, {
        through: models.Character_movie_gender,
        foreignKey: 'idGender'
      });
      //Movie.belongsTo(models.Gender, { foreignKey: 'idGender' });
    }
  }
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
}; */