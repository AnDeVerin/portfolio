const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/works', function(req, res) {
  let obj = {
    title: 'My works',
    myWorks: [ // basic set of works
      {
        title: 'Мой сайт-портфолио',
        techStack: 'JavaScript, Node.js, Mongo.db',
        link: 'index.html',
        picture: 'assets/img/content/s1.jpg',
      },
      {
        title: 'Cайт интернет-магазина',
        techStack: 'HTML5 & CSS3',
        link: 'https://interiorsite.000webhostapp.com/',
        picture: 'assets/img/content/s2.jpg',
      },
      {
        title: 'Лендинг интернет-агентства',
        techStack: 'HTML5 & CSS3',
        link: 'https://andeverin.github.io/waxom-homepage/',
        picture: 'assets/img/content/s3.jpg',
      }],
  };

  Object.assign(obj, req.app.locals.settings);

  const Project = mongoose.model('project');

  Project.find().then(doc => {
    // correction of the image path ('\' -> '/')
    doc.forEach(item => {
      item.picture = '.' + item.picture.split('\\').join('/');
    });

    // add works from DB to myWorks
    obj.myWorks = obj.myWorks.concat(doc);
    res.render('pages/works', obj);

  }).catch(err => {
    console.log(err);
    res.render('pages/works', obj);
  });

});

module.exports = router;