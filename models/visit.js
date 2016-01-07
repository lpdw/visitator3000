var mongoose = require('mongoose');
var _ = require('lodash');
var dateHelper = require('../helpers/date');

var environementMongo = process.env.VISITATOR_3000_ENV || 'test';
mongoose.connect('mongodb://localhost/' + environementMongo);
//var Visit = mongoose.model('Visit', { at: { type: Date, default: Date.now } });

var VisitSchema = mongoose.Schema({at: { type: Date, default: Date.now }});

VisitSchema.statics.removeByDate = function(params, callback) {
  var model = this;
  this.find({at: {$gte: params['day'], $lt: params['day'].tomorrow()}}).select('_id').sort({_id: 1}).limit(params['count'])
      .exec(function (err, docs) {
          var ids = docs.map(function(doc) { return doc._id; });
          model.remove({_id: {$in: ids}}).exec(function(err, result){
            callback(result['result']['n']);
          });
      }
  );
};

VisitSchema.statics.countByDay = function(day, callback) {
  this.count({at: {$gte: day, $lt: day.tomorrow()}}).exec(function(err, count){
    callback(count);
  });
};

VisitSchema.statics.chartDay = function(callback) {
  this.aggregate(
    {
      $project: {
        hour: { $hour: "$at" },
        dayOfYear: { $dayOfYear: "$at" }
      }
    },
    { $match : { dayOfYear: new Date().getDayOfYear() } },
    {
      $group: {
        _id: { hour: "$hour" },
        count: { $sum: 1 },
      }
    }).exec(function(err, stats){

      var chartData = _.range(24).map(function () { return 0 });
      _.each(stats, function(e) {
        hour = e["_id"]["hour"];
        chartData[hour] = e["count"];
      });

      return callback(err, chartData);
    });
};

VisitSchema.statics.chartWeek = function(callback) {
  this.aggregate(
    {
      $project: {
        day:  { $dayOfWeek: "$at" },
        week: { $week: "$at" }
      }
    },
    { $match : { week: new Date().getWeek() } },
    {
      $group: {
        _id: { day: { $subtract: ["$day", 1] } },
        count: { $sum: 1 }
      }
    }).exec(function(err, stats){
      var chartData = _.range(7).map(function () { return 0 });
      _.each(stats, function(e) {
        day = e["_id"]["day"];
        chartData[day] = e["count"];
      });

      return callback(err, chartData);
    });
};

VisitSchema.statics.chartMonth = function(callback) {
  this.aggregate(
    {
      $project: {
        month: { $month: "$at" }
      }
    },
    { $sort : { month: -1 } },
    {
      $group: {
        _id: { month: { $subtract: ["$month", 1] } },
        count: { $sum: 1 }
      }
    }).exec(function(err, stats){
      var chartData = _.range(12).map(function () { return 0 });
      _.each(stats, function(e) {
        day = e["_id"]["month"];
        chartData[day] = e["count"];
      });

      return callback(err, chartData);
    });
};

VisitSchema.statics.chartYear = function(callback) {
  this.aggregate(
    {
      $project: {
        year: { $year: "$at" }
      }
    },
    { $sort : { year: -1 } },
    {
      $group: {
        _id: {year: "$year"},
        count: { $sum: 1 }
      }
    }).exec(function(err, stats){
      chartData = _.map(stats, function(e) {
        year = e["_id"]["year"];
        return { year: year, count: e["count"] }
      });

      return callback(err, chartData);
    });
};

VisitSchema.statics.countThisDay = function(callback) {
  var day = new Date();
  day.setHours(00);
  day.setMinutes(00);
  this.count({at: {$gte: day, $lt: day.tomorrow()}}).exec(function(err, count){
    callback(count);
  });
};

VisitSchema.statics.countThisMonth = function(callback) {
  this.$where('return this.at.getMonth() == (new Date).getMonth()').count().exec(function (err, count) {
    callback(count);
  });
};

VisitSchema.statics.countThisYear = function(callback) {
  this.$where('return this.at.getYear() == (new Date).getYear()').count().exec(function (err, count) {
    callback(count);
  });
};

module.exports = mongoose.model('Visit', VisitSchema);
