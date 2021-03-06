const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');
const passport = require('passport');

//--
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  //- if no authorisation send to main page
  res.redirect('/');
}
//--

router.get('/admin', isLoggedIn, function(req, res) {
  let obj = {
    title: 'Admin panel',
  };

  Object.assign(obj, req.app.locals.settings);

  const SkillSet = mongoose.model('SkillSet');

  SkillSet.findOne().then(docObj => {
    Object.assign(obj, {skills: docObj.data});
    res.render('pages/admin', obj);
  }).catch(err => { // if no data create empty object
    console.log(err);

    let skills = {
      'Frontend': {
        'HTML5': 0,
        'CSS3': 0,
        'JavaScript': 0,
      },
      'Backend': {
        'PHP': 0,
        'mySQL': 0,
        'NodeJS & npm': 0,
        'MongoDB': 0,
      },
      'WorkFlow': {
        'Git': 0,
        'Gulp': 0,
        'Webpack': 0,
      },
    };

    Object.assign(obj, {skills: skills});
    res.render('pages/admin', obj);
  });
});

router.post('/submit', (req, res, next) => {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status: 'Wrong password or user name!'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({status: 'Welcome! \n Redirecting...', logged: true});
    });
  })(req, res, next);
});

router.post('/admin/addpost', isLoggedIn, (req, res) => {
  //требуем наличия заголовка, даты и текста
  if (!req.body.title || !req.body.date || !req.body.text) {
    //если что-либо не указано - сообщаем об этом
    return res.json({status: 'Input data!'});
  }
  //создаем новую запись блога и передаем в нее поля из формы
  const Model = mongoose.model('blog');
  let item = new Model({
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text,
  });

  item.save().then(
      //обрабатываем и отправляем ответ в браузер
      info => {
        return res.json({status: 'New post added successfully'});
      }, e => {
        //если есть ошибки, то получаем их список и так же передаем их
        const error = Object.keys(e.errors).
            map(key => e.errors[key].message).
            join(', ');

        //обрабатываем шаблон и отправляем его в браузер
        res.json({
          status: 'New post could not be loaded : ' + error,
        });
      });
});

router.post('/admin/saveskills', isLoggedIn, (req, res) => {

  // удаляем данные из БД перед сохранением
  const SkillSet = mongoose.model('SkillSet');
  SkillSet.remove({}, function(err, result) {
    if (err) {
      return console.log(err);
    }
  });

  // сохраняем новые значения
  let skillDoc = new SkillSet({data: req.body});
  skillDoc.save().then(
      //обрабатываем и отправляем ответ в браузер
      info => {
        return res.json({status: 'Data saved successfully'});
      }, e => {
        //если есть ошибки, то получаем их список и так же передаем их
        const error = Object.keys(e.errors).
            map(key => e.errors[key].message).
            join(', ');

        //обрабатываем шаблон и отправляем его в браузер
        res.json({
          status: 'Your data could not be loaded : ' + error,
        });
      });
});

router.post('/admin/upload', isLoggedIn, (req, res) => {

  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), config.upload);
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({status: 'New project could not be loaded '});
    }
    //если ошибок нет, то создаем новую picture и передаем в нее поле из формы
    const Model = mongoose.model('project');

    fs.rename(files.image.path, path.join(config.upload, files.image.name),
        function(err) {
          if (err) {
            fs.unlink(path.join(config.upload, files.image.name));
            fs.rename(files.image.path, files.image.name);
          }
          let dir = config.upload.substr(config.upload.indexOf('/'));
          const item = new Model({
            title: fields.title,
            techStack: fields.tech,
            link: fields.link,
            picture: path.join(dir, files.image.name),
          });

          console.log(item);

          item.save().then(
              i => res.json({status: 'New project added successfully'}),
              e => res.json({status: e.message}),
          );
          // const item = new Model({name: fields.name});
          // item
          //   .save()
          //   .then(pic => {
          //     Model.update({ _id: pic._id }, { $set: { picture:
          // path.join(dir, files.photo.name)}}).then( i => res.json({status:
          // 'Картинка успешно загружена'}), e => res.json({status: e.message})
          // ); });
        });
  });

});

module.exports = router;