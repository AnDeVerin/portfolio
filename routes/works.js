const express = require('express');
const router = express.Router();

router.get('/works', function (req, res) {
  let obj = {
    title: 'My works'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/works', obj);
});

module.exports = router;