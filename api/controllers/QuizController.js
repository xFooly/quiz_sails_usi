/**
 * QuizController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */



module.exports = {
    welcome: function (req, res) {
        Language.find().done(function (err, languages) {
            var requested = req.param('lang');
            var isSupported = false;

            for(var i in languages) {
                if(languages[i].code == requested) {
                    isSupported = true;
                }
            }

            res.view('./quiz/intro.ejs',
            {
                title: 'Welcome',
                lang: requested
            })
        })
    },

    email: function (req, res) {
        var email = req.param('email')

        //TODO VALIDATION EMAIL HERE
        if(true) {
            Gamer.find().where({email: email}).exec(function (err, gamers) {
                if(gamers.length == 0) {
                    Gamer.create({
                        email: email
                    }).done(function(err, user) {
                            if(!err) {
                                res.json({
                                    success: true
                                })
                            } else {
                                res.json({
                                    success: false,
                                    reason: "Non ho potuto salvare l'email"
                                })
                            }
                        })
                } else {
                    res.json({
                        success: true
                    })
                }
            })
        } else {
            res.json({
                success: false,
                reason: "Email non valida"
            })
        }

    },

    quiz: function (req, res) {
        var quizLength = 30 ;
        var level1 = 10;
        var level2 = 10;
        var level3 = 10;

        var today = new Date()
        var stringToday = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()

        Gamer.find().where({email: req.param('email')}).exec(function (err, gamer) {
            if(gamer.length == 0) {
                res.send('Errore: Email non esiste')
            } else if (gamer.length == 1) {
                Language.find().done(function (err, languages) {
                    var requested = req.param('lang');
                    var isSupported = false;

                    for(var i in languages) {
                        if(languages[i].code == requested) {
                            isSupported = true;
                        }
                    }

                    if(isSupported) {
                        Question.find().where({level:1}).exec(function (err, level1Questions) {
                            Question.find().where({level:2}).exec(function (err, level2Questions) {
                                Question.find().where({level:3}).exec(function (err, level3Questions) {
                                    var quizQuestions = []

                                    while(level1 > 0) {
                                        var rand = Math.floor(Math.random() * level1Questions.length)

                                        var q = {
                                            id: level1Questions[rand]['id'],
                                            level: level1Questions[rand]['level'],
                                            question: level1Questions[rand][requested + '_question'],
                                            correct: level1Questions[rand][requested + '_correct'],
                                            wrong: level1Questions[rand][requested + '_wrong']
                                        }
                                        level1Questions.splice(rand,1)
                                        quizQuestions.push(q)
                                        level1--
                                    }

                                    while(level2 > 0) {
                                        var rand = Math.floor(Math.random() * level2Questions.length)
                                        var q = {
                                            id: level2Questions[rand]['id'],
                                            level: level2Questions[rand]['level'],
                                            question: level2Questions[rand][requested + '_question'],
                                            correct: level2Questions[rand][requested + '_correct'],
                                            wrong: level2Questions[rand][requested + '_wrong']
                                        }
                                        level2Questions.splice(rand,1)
                                        quizQuestions.push(q)
                                        level2--
                                    }

                                    while(level3 > 0) {
                                        var rand = Math.floor(Math.random() * level3Questions.length)
                                        var q = {
                                            id: level3Questions[rand]['id'],
                                            level: level3Questions[rand]['level'],
                                            question: level3Questions[rand][requested + '_question'],
                                            correct: level3Questions[rand][requested + '_correct'],
                                            wrong: level3Questions[rand][requested + '_wrong']
                                        }
                                        level3Questions.splice(rand,1)
                                        quizQuestions.push(q)
                                        level3--
                                    }

                                    var player = gamer[0]

                                    if(player[stringToday] == undefined) {
                                        player[stringToday] = {
                                            attempt: 1,
                                            lottery1: false,
                                            lottery2: false,
                                            lottery3: false
                                        }
                                    } else {
                                        player[stringToday].attempt++
                                    }

                                    player.save(function() {
                                        res.view('./quiz/quiz.ejs', {
                                            title: "Quiz",
                                            questions: quizQuestions,
                                            numberQuestions: 30,
                                            forFun: false,
                                            gamer: player,
                                            lang: requested,
                                            today: stringToday,
                                            lottery: player[stringToday]
                                        });
                                    })
                                })
                            })
                        })
                    } else {
                        res.send('Errore: Il linguaggio non è supportato')
                    }
                })
            } else {
                res.send('Errore: Esistono più giocatori con la stessa email')
            }
        })
    }
};
