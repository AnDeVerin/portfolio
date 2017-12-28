const express = require('express');
const router = express.Router();

router.get('/works', function (req, res) {
  let obj = {
    title: 'Works'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/works', obj);
});

module.exports = router;