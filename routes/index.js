const express = require('express');
const router = express.Router();

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
  res.render('pages/about', obj);
});

router.get('/blog', function (req, res) {     // blog page
  let obj = {
    title: 'Blog'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/blog', obj);
});

module.exports = router;