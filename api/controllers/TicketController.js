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
          var contentVictory = "GRANDEEEEE!!! \n\n Hai vinto un premio al gioco informatico della 'settimana della lingua e cultura della Svizzera italiana'.\n\nIl tuo premio ti aspetta in segreteria nei seguenti orari:\n7.30-9.50\n13.00-13.30\n16.00-16.30\n\nCari saluti,\n\nAndrea e Marcello, programmatori del gioco."
          var subjectVictory = "[No Reply] Concorso Conoscimi - Vincitore del premio categoria ";

          var text = ""
          var today = new Date();

          text += "Giorno: " + today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + '\n'
          text += "Lista dei vincitori per categoria\n\n"

          text += "Categoria 1: \n"

          for(var key in winners.p1Win) {
              Gamer.findOne().where({email: winners.p1Win[key]}).exec(function (err, gamer) {
                  text += ' -  ' + winners.p1Win[key] + '\n'

                  gamer.prize1 = true;

                  gamer.save(function(res) {})

                  server.send({
                      text:    contentVictory,
                      from:    googleEmail.sender,
                      to:      "<" + winners.p1Win[key] + ">",
                      subject: subjectVictory + 1
                  }, function(err, message) { console.log(err || message); });
              })

              Winner.create({
                  email: winners.p1Win[key],
                  prize: 1
              }).done(function(err, user) {})
          }

          text += '\n\n\n Categoria 2: \n'

          for(var key in winners.p2Win) {
              Gamer.findOne().where({email: winners.p2Win[key]}).exec(function (err, gamer) {
                  text += ' -  ' + winners.p2Win[key] + '\n'

                  gamer.prize2 = true;

                  gamer.save(function(res) {})

                  server.send({
                      text:    contentVictory,
                      from:    googleEmail.sender,
                      to:      "<" + winners.p2Win[key] + ">",
                      subject: subjectVictory + 2
                  }, function(err, message) { console.log(err || message); });
              })

              Winner.create({
                  email: winners.p1Win[key],
                  prize: 2
              }).done(function(err, user) {})
          }

          text += '\n\n\n Categoria 3: \n'

          for(var key in winners.p3Win) {
              Gamer.findOne().where({email: winners.p3Win[key]}).exec(function (err, gamer) {
                  text += ' -  ' + winners.p3Win[key] + '\n'

                  gamer.prize3 = true;

                  gamer.save(function(res) {})

                  server.send({
                      text:    contentVictory,
                      from:    googleEmail.sender,
                      to:      "<" + winners.p3Win[key] + ">",
                      subject: subjectVictory + 3
                  }, function(err, message) { console.log(err || message); });
              })

              Winner.create({
                  email: winners.p1Win[key],
                  prize: 3
              }).done(function(err, user) {})
          }

          server.send({
              text:    text,
              from:    googleEmail.sender,
              to:      "<nicole.bandion@usi.ch>",
              subject: "Reminder quotidiano: Vincitori concorso conoscimi"
          }, function(err, message) { console.log(err || message); });


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

      Questions.find().exec(function (err, questions) {
          questions.forEach(function(question) {
              question.destroy(function(err) {
              })
          });
      })


      res.send('ok')
  }
};
