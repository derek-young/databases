var db = require('../db');
var request = require('request');
var date = require('date-and-time');

var dateTime = function() {
  return date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
};

module.exports = {
  messages: {
    get: function (res) {
      db.messages.findAll()
      .then((results) => (
        res.end(JSON.stringify(results))
      ));
    },
    post: function (message, res) {
      db.users.findOrCreate({
        where: {
          name: message.user
        }
      })
      .then(() => (
        db.messages.create({
          message: message.message,
          room: message.room,
          userName: message.user
        })
      ))
      .then((results) => (
        res.end(JSON.stringify(results))
      ));
    }
  },

  users: {
    get: function (user) {
      db.users.find(user)
        .then(function(err, results) {
          console.log('users get ', results);
          res.end(JSON.stringify(results));
        });
    },
    post: function (user) {
      db.users.create({
        name: user
      }).then(function(results) {
        console.log('message post ', results);
      });
    }
  }
};
