/**
 * Language
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

var fs = require('fs')

module.exports = {
  tableName: 'Lingua',
  schema: true,

  attributes: {

    lang: {
        type: 'string',
        required: true
    },

    code: {
        type: 'string',
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 2
    }
    
  },

  afterCreate: function (language, callback) {
      fs.mkdir('./assets/locales/' + language.code, function(err) {
         fs.open('./assets/locales/' + language.code + '/translation.json', 'w', function(err, fd){
            var json = {}
            json['welcome'] = {}
            json['welcome']['title'] = "Conosciamoci."
            fs.write(fd, JSON.stringify(json), null, 'utf8', function(){
                fs.close(fd, function(){
                    callback()
                });
            });
         })
      })
  }
};
