const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {         // index page
  let obj = {
    title: 'Welcome'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});

router.get('/about', function (req, res) {    // about page
  let obj = {
    title: 'About'
  };

  Object.assign(obj, req.app.locals.settings);

  const SkillSet = mongoose.model('SkillSet');
  SkillSet.findOne()

  .then(docObj => {
    Object.assign(obj, {skills: docObj.data});
    res.render('pages/about', obj);
  })

  .catch(err => { // if no data create empty object
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
    res.render('pages/about', obj);
  });
});

router.get('/blog', function (req, res) {     // blog page
  let obj = {
    title: 'Blog'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/blog', obj);
});

module.exports = router;