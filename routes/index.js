var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all static pages(in footer). */
router.get('/:staticpage', function(req, res) {
  res.render('staticpage', {title: req.params.staticpage});
});


module.exports = router;
