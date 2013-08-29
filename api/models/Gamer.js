/**
 * Gamer
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {

      tableName: 'Lingua',
      schema: true,

      email: {
          type: 'email',
          required: true
      },

      best: {
          type: 'integer',
          finite: true,
          defaultsTo: 0
      },

      prize1: {
          type: 'boolean',
          defaultsTo: false
      },

      prize2: {
          type: 'boolean',
          defaultsTo: false
      },

      prize3: {
          type: 'boolean',
          defaultsTo: false
      }
    
  }

};
