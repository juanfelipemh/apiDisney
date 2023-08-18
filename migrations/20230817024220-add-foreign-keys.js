'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addConstraint('Character_movie_gender', {
        fields: ['idMovie'],
        type: 'foreign key',
        name: 'fk_movie',
        references: {
          table: 'movies',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      }),
      queryInterface.addConstraint('Character_movie_gender', {
        fields: ['idCharacter'],
        type: 'foreign key',
        name: 'fk_character',
        references: {
          table: 'characters',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      }),
      queryInterface.addConstraint('Character_movie_gender', {
        fields: ['idGender'],
        type: 'foreign key',
        name: 'fk_gender',
        references: {
          table: 'Genders',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeConstraint('character_movie_gender', 'fk_movie'),
      queryInterface.removeConstraint('character_movie_gender', 'fk_character'),
      queryInterface.removeConstraint('character_movie_gender', 'fk_gender')
    ]);
  }
};
