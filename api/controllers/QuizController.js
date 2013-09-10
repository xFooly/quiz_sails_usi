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
                        Question.find().done(function (err, questions) {
                            if(quizLength <= questions.length) {
                                var quizQuestions = []

                                while(quizLength > 0) {
                                    var rand = Math.floor(Math.random() * questions.length)
                                    var q = {
                                        id: questions[rand]['id'],
                                        level: questions[rand]['level'],
                                        question: questions[rand][requested + '_question'],
                                        correct: questions[rand][requested + '_correct'],
                                        wrong: questions[rand][requested + '_wrong']
                                    }
                                    questions.splice(rand,1)
                                    quizQuestions.push(q)
                                    quizLength--
                                }

                                res.view('./quiz/quiz.ejs', {
                                    title: "Quiz",
                                    questions: quizQuestions,
                                    numberQuestions: 30,
                                    forFun: false,
                                    gamer: gamer[0],
                                    lang: requested
                                });
                            } else {
                                res.send('Errore: Non ci sono domande sufficienti nel database');
                            }
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
