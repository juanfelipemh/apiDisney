'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    
    static associate(models) {
      Gender.belongsToMany(models.Character, {
        through: 'Character_movie_gender',
        foreignKey: 'idGender'
      });
      Gender.belongsToMany(models.Movie, {
        through: 'Character_movie_gender',
        foreignKey: 'idGender'
      });
      //Gender.hasMany(models.Movie, { foreignKey: 'idGender' });
    }
  }
  Gender.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};



/* RELACION ENTRE TABLAS - LA OTRA ES APUNTANDO A character_movie_gende
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    
    static associate(models) {
      Gender.belongsToMany(models.Character, {
        through: models.Character_movie_gender,
        foreignKey: 'idGender'
      });
    
      //Gender.hasMany(models.Movie, { foreignKey: 'idGender' });
    }
  }
  Gender.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};*/