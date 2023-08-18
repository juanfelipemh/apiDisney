'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {

    static associate(models) {
      Character.belongsToMany(models.Movie, {
        through: 'Character_movie_gender',
        foreignKey: 'idCharacter'
      });
      Character.belongsToMany(models.Gender, {
        through: 'Character_movie_gender',
        foreignKey: 'idCharacter'
      });
    }
  }
  Character.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    history: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};



/*  RELACION ENTRE TABLAS - LA OTRA ES APUNTANDO A character_movie_gende
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {

    static associate(models) {
      Character.belongsToMany(models.Movie, {
        through: models.Character_movie_gender,
        foreignKey: 'idCharacter'
      });
    }
  }
  Character.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    history: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};*/