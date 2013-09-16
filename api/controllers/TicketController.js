/**
 * TicketController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var email = require("emailjs/email");

var googleEmail = {
    user: "concorso.conoscimi@gmail.com",
    password: "marcello1",
    host: "smtp.gmail.com",
    sender: 'Concorso Conoscimi <concorso.conoscimi@gmail.com>'
}

var server = email.server.connect({
    user: googleEmail.user,
    password: googleEmail.password,
    host: googleEmail.host,
    ssl: true
});

module.exports = {

  winners: function (req, res) {
      winners = req.body

      if(winners.p1Win == undefined || winners.p2Win == undefined || winners.p3Win == undefined) {
          res.json({status: false})
      } else {
          winnersEmail = []
          for(var key in winners.p1Win) {
              Gamer.findOne().where({email: winners.p1Win[key]}).exec(function (err, gamer) {
                  winnersEmail.push({email: winners.p1Win[key], prize: 1})

                  gamer.prize1 = true;

                  gamer.save(function(res) {})

//                  server.send({
//                      text:    "Ciao hai vinto il premio 1",
//                      from:    googleEmail.sender,
//                      to:      "<" + winners.p1Win[key] + ">",
//                      subject: "Vincitore Concorso Conoscimi"
//                  }, function(err, message) { console.log(err || message); });
              })
          }

          for(var key in winners.p2Win) {
              Gamer.findOne().where({email: winners.p2Win[key]}).exec(function (err, gamer) {
                  winnersEmail.push({email: winners.p2Win[key], prize: 2})

                  gamer.prize2 = true;

                  gamer.save(function(res) {})

//                  server.send({
//                      text:    "Ciao hai vinto il premio 2",
//                      from:    googleEmail.sender,
//                      to:      "<" + winners.p2Win[key] + ">",
//                      subject: "Vincitore Concorso Conoscimi"
//                  }, function(err, message) { console.log(err || message); });
              })
          }

          for(var key in winners.p3Win) {
              Gamer.findOne().where({email: winners.p3Win[key]}).exec(function (err, gamer) {
                  winnersEmail.push({email: winners.p3Win[key], prize: 3})

                  gamer.prize3 = true;

                  gamer.save(function(res) {})

//                  server.send({
//                      text:    "Ciao hai vinto il premio 3",
//                      from:    googleEmail.sender,
//                      to:      "<" + winners.p3Win[key] + ">",
//                      subject: "Vincitore Concorso Conoscimi"
//                  }, function(err, message) { console.log(err || message); });
              })
          }

          Ticket.find().exec(function (err, tickets) {
              tickets.forEach(function(entry) {
                  entry.destroy(function(err) {
                  })
              });
          })

          res.json({status: true})
      }
  },

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
      var maxP1 = 10
      var maxP2 = 10
      var maxP3 = 10

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
