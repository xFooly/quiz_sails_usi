/**
 * TicketController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  lottery: function (req, res) {
      Ticket.find().where({prize:1}).exec(function (err, p1Ticket) {
          Ticket.find().where({prize:2}).exec(function (err, p2Ticket) {
              Ticket.find().where({prize:3}).exec(function (err, p3Ticket) {
                  res.view('./ticket/lottery.ejs',
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

  estrai: function (req, res) {
      var maxP1 = 4
      var maxP2 = 4
      var maxP3 = 4

      Ticket.find().where({prize:1}).exec(function (err, p1Ticket) {
          Ticket.find().where({prize:2}).exec(function (err, p2Ticket) {
              Ticket.find().where({prize:3}).exec(function (err, p3Ticket) {
                  var p1Winner = []
                  while(p1Winner.length != maxP1 && p1Ticket.length != 0) {
                      var rand = Math.floor(Math.random() * p1Ticket.length)
                      var e = p1Ticket[rand].email
                      p1Ticket.splice(rand,1)

                      if(p1Winner.indexOf(e) == -1) {
                          p1Winner.push(e)
                      }
                  }

                  var p2Winner = []
                  while(p2Winner.length != maxP2 && p2Ticket.length != 0) {
                      var rand = Math.floor(Math.random() * p2Ticket.length)
                      var e = p2Ticket[rand].email
                      p2Ticket.splice(rand,1)
                      if(p2Winner.indexOf(e) == -1) {
                          p2Winner.push(e)
                      }
                  }

                  var p3Winner = []
                  while(p3Winner.length != maxP3 && p3Ticket.length != 0) {
                      var rand = Math.floor(Math.random() * p3Ticket.length)
                      var e = p3Ticket[rand].email
                      p3Ticket.splice(rand,1)
                      if(p3Winner.indexOf(e) == -1) {
                          p3Winner.push(e)
                      }
                  }

                  res.json(
                  {
                      p1Win: p1Winner,
                      p2Win: p2Winner,
                      p3Win: p3Winner
                  })
              })
          })
      })
  },

  estingui: function(req, res) {
      Ticket.find().exec(function (err, tickets) {
          tickets.forEach(function(entry) {
              entry.destroy(function(err) {
              })
          });
          res.send('ok')
      })
  }
};
