const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');

router.get('/admin', function(req, res) {
  let obj = {
    title: 'Admin',
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/admin', obj);
});

router.post('/admin/addpost', (req, res) => {
  //требуем наличия заголовка, даты и текста
  if (!req.body.title || !req.body.date || !req.body.text) {
    //если что-либо не указано - сообщаем об этом
    return res.json({status: 'Укажите данные!'});
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
        return res.json({status: 'Запись успешно добавлена'});
      }, e => {
        //если есть ошибки, то получаем их список и так же передаем их
        const error = Object.keys(e.errors).
            map(key => e.errors[key].message).
            join(', ');

        //обрабатываем шаблон и отправляем его в браузер
        res.json({
          status: 'При добавление записи произошла ошибка: ' + error,
        });
      });
});

module.exports = router;