/**
 * QuestionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
    form: function (req, res) {
        Language.find().done(function(err, langs) {

            res.view('./question/form.ejs', {
                title: "Form Domand",
                languages: langs
            });
        })
    }

};
