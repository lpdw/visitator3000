var express = require('express');
var router = express.Router();
var async = require('async');
var Visit = require('../models/visit');

router.get('/', function(req, res) {
  async.parallel({
    day: function(callback) {
      return Visit.chartDay(function (err, chartDayData){
        return callback(err, chartDayData);
      });
    }, week: function(callback) {
      return Visit.chartWeek(function (err, chartWeekData){
        return callback(err, chartWeekData);
      });
    }, month: function(callback) {
      return Visit.chartMonth(function (err, chartMonthData){
        return callback(err, chartMonthData);
      });
    }, year: function(callback) {
      return Visit.chartYear(function (err, chartYearData){
        return callback(err, chartYearData);
      });
    }
  }, function(err, stats) {
    return res.render('home', {stats: stats, status: req.flash('status')});
  });
});

module.exports = router;
