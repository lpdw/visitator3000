var express = require('express');
var router = express.Router();
var async = require('async');
var Visit = require('../models/visit');

router.get('/visits', function(req, res) {
  var day = new Date(req.query.day);

  Visit.count({at: {$gte: day, $lt: day.tomorrow()}}).exec(function(err, count){
    res.json({count: count});
  });
});

module.exports = router;
