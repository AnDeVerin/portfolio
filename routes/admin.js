const express = require('express');
const router = express.Router();

router.get('/admin', function (req, res) {
  let obj = {
    title: 'Admin'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/admin', obj);
});

module.exports = router;