/**
 * LanguageController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	form: function (req, res) {

        res.view('./language/form.ejs', {title: "Form Lingua"});
    }
};
