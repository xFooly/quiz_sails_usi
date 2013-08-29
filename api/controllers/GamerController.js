/**
 * GamerController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

    form: function (req, res) {
        res.view('./gamer/form.ejs', {title: "Giocatori"});
    }
};
