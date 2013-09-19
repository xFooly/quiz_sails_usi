/**
 * WinnerController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  winners: function(req, res) {
      Winner.find().where({prize:1}).exec(function (err, p1Ticket) {
          Winner.find().where({prize:2}).exec(function (err, p2Ticket) {
              Winner.find().where({prize:3}).exec(function (err, p3Ticket) {
                  res.view('./winner/winners.ejs',
                      {
                          title: 'Estrazione',
                          p1Pool: p1Ticket,
                          p2Pool: p2Ticket,
                          p3Pool: p3Ticket
                      })
              })
          })
      })
  },

    allDestroy: function(req, res) {
      Ticket.find().exec(function (err, tickets) {

          tickets.forEach(function(ticket) {
                ticket.destroy(function(err) {
              })
          });

      })

      Gamer.find().exec(function (err, gamers) {
          gamers.forEach(function(gamer) {
                gamer.destroy(function(err) {
              })
          });
      })

      Gamer.find().exec(function (err, winners) {
          winners.forEach(function(winner) {
                 winner.destroy(function(err) {
              })
          });
      })

      res.send('ok')
  }

};
