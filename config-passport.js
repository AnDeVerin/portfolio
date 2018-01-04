const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Model = mongoose.model('user');
var user = {};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

// локальная стратегия

passport.use(
    'loginUsers',
    new LocalStrategy((username, password, done) => {

      var newpassword = crypto.createHash('md5').update(password).digest('hex');

      Model.findOne({login: username}).then(item => {
        user = {
          username: item.login,
          password: item.password,
          id: item._id,
        };

        if (username === user.username && newpassword === user.password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }).catch(err => {
        console.log('Ошибка в имени пользователя.');
        return done(null, false);
      });
    }));