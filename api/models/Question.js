/**
 * Question
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {

      tableName: 'Lingua',
      schema: false,

      level: {
          type: 'integer',
          finite: true,
          min: 1,
          max: 5,
          required: true
      },

      correct: {
          type: 'integer',
          finite: true,
          defaultsTo: 0
      },

      wrong: {
          type: 'integer',
          finite: true,
          defaultsTo: 0
      }
    
  }

};
