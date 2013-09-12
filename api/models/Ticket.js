/**
 * Ticket
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {

      schema: false,

      prize: {
          type: 'integer',
          finite: true,
          min: 1,
          max: 3,
          required: true
      }
  }

};
