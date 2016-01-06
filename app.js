var five = require("johnny-five");
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var _ = require('lodash');
var async = require('async');
var basicAuth = require('basic-auth');
var lcd;

var environementMongo = process.env.VISITATOR_3000_ENV || 'test';

mongoose.connect('mongodb://localhost/' + environementMongo);
var Visit = mongoose.model('Visit', { at: { type: Date, default: Date.now } });

app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set("layout extractScripts", true)

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === process.env.VISITATOR_3000_USER && user.pass === process.env.VISITATOR_3000_PASSWORD) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
};

app.use('/', auth);







app.post('/update', function (req, res) {
  var count = req.body.countVisit;
  console.log("count", count);

  var date = new Date(req.body.date);
  var i = 0;

  if (count < 0){
        Visit.find({at: {$gte: date, $lt: date}}).sort({_id:-1}).limit(count).remove().exec();
        console.log(count, "Visites supprimées pour la date");

  }
  else{
    //Save count visites ayant la date req.date
    Visit.save(function (err) {
      if (err){
        console.log("ERROR: ", err);
      } else {
        refreshLcd(lcd);
      }
    });

  }


  res.send('POST request to the homepage');

});










app.get('/', function(req, res) {
  //performers = {};

  // var start = new Date().setDate(1);
  // var end = new Date().setDate(31);
  //
  // Visit.count({at: {$gte: start, $lt: end}}).exec(function(err, count){
  //   console.log(count);
  // });
  // return Visit.$where('return this.at.getDay() == (new Date).getDay()').exec(function (err, docs) {
  //   hours = _.map(docs, function(d){ return d.at.getHours()});
  //
  //   dayChart = _.map(_.range(0,23), function(i){
  //     return _.countBy(hours, function(hour) {
  //       return hour == i;
  //     })['true'] || 0;
  //   });
  //
  //   return callback(err, dayChart);
  //   });
  var currentYear = Math.round((new Date().setHours(23) - new Date(new Date().getFullYear(), 0, 1, 0, 0, 0))/1000/86400);
  var onejan = new Date(new Date().getFullYear(), 0, 1);
  var week = Math.ceil( (((new Date() - onejan) / 86400000) + onejan.getDay() + 1) / 7 );

  async.parallel({
    day: function(callback) {

      return Visit.aggregate(
        {
          $project: {
            hour: { $hour: "$at" },
            dayOfYear: { $dayOfYear: "$at" }
          }
        },
        { $match : { dayOfYear: currentYear } },
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
      }, week: function(callback) {
        return Visit.aggregate(
          {
            $project: {
              day:  { $dayOfWeek: "$at" },
              week: { $week: "$at" }
            }
          },
          { $match : { week: week-1 } },
          {
            $group: {
              _id: { day: { $subtract: ["$day", 2] } },
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
        }, month: function(callback) {
          return Visit.aggregate(
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
          }, year: function(callback) {
            return Visit.aggregate(
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
            }
          }, function(err, stats) {
            return res.render('home', {stats: stats});
          });
        });

app.listen(process.env.VISITATOR_3000_PORT || 8080);

  five.Board().on("ready", function() {
    lcd = new five.LCD({
      pins: [7, 8, 9, 10, 11, 12],
      backlight: 6,
      rows: 2,
      cols: 4
    });

    refreshLcd(lcd);

    var button = new five.Button({
      pin: 2,
      isPullup: true
    });

    button.on("down", function(value) {
      console.log('New visit');
      var visit = new Visit();
      visit.save(function (err) {
        if (err){
          console.log("ERROR: ", err);
        } else {
          refreshLcd(lcd);
        }
      });
      led.ready();
    });

    function refreshLcd(lcd){
      lcd.cursor(0, 0).print("JOUR MOIS  ANNEE");

      Visit.$where('return this.at.getDay() == (new Date).getDay()').exec(function (err, docs) {
        lcd.cursor(1, 0).print(docs.length);
      });

      Visit.$where('return this.at.getMonth() == (new Date).getMonth()').exec(function (err, docs) {
        lcd.cursor(1, 5).print(docs.length);
      });

      Visit.$where('return this.at.getYear() == (new Date).getYear()').exec(function (err, docs) {
        lcd.cursor(1, 11).print(docs.length);
      });
  }
  });
