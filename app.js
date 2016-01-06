var five = require("johnny-five");
var pixel = require("node-pixel");
var mongoose = require('mongoose');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var schedule = require('node-schedule');
var app = express();
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var _ = require('lodash');
var async = require('async');
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');
var lcd;

var environementMongo = process.env.VISITATOR_3000_ENV || 'test';

mongoose.connect('mongodb://localhost/' + environementMongo);
var Visit = mongoose.model('Visit', { at: { type: Date, default: Date.now } });

app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set("layout extractScripts", true);

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(process.env.VISITATOR_3000_PASSWORD));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

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
}

app.use('/', auth);

app.get('/visits', function(req, res) {
  var day = new Date(req.query.day);
  var tomorrow = new Date(req.query.day);
  tomorrow.setDate(day.getDate()+1);

  Visit.find({at: {$gte: day, $lt: tomorrow}}).count().exec(function(err, count){
    res.json({count: count});
  });
});

app.post('/visits', function(req, res) {
  var day = new Date(req.body.dateVisits);
  var tomorrow = new Date(req.body.dateVisits);
  tomorrow.setDate(day.getDate()+1);
  countVisits = parseInt(req.body.countVisits);

  Visit.find({at: {$gte: day, $lt: tomorrow}}).count().exec(function(err, count){
    if (count - countVisits > 0){
      Visit.find({at: {$gte: day, $lt: tomorrow}}).select('_id').sort({_id: 1}).limit(count - countVisits)
          .exec(function (err, docs) {
              var ids = docs.map(function(doc) { return doc._id; });
              Visit.remove({_id: {$in: ids}}).exec(function(err, result){
                req.flash('status', "Succès de l'ajout de " + result['result']['n']+ ' visites le ' + req.body.dateVisits);
                res.redirect('/');
              });
          }
      );
    } else {
      var visits = _.times(countVisits - count, function() { return {at: day} });
      Visit.collection.insert(visits, function(err, result){
        req.flash('status', 'Succès de suppresion de ' + result['insertedCount'] + ' visites le ' + req.body.dateVisits);
        res.redirect('/');
      });
    }
  });
});

app.get('/', function(req, res) {
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
            return res.render('home', {stats: stats, status: req.flash('status')});
          });
        });

app.listen(process.env.VISITATOR_3000_PORT || 8080);

board = five.Board();
  board.on("ready", function() {
    servo = new five.Servo(5);
    servo.to(0);

    schedule.scheduleJob('* * 1 * * *', function(){
      servo.to(0);
      board.wait(20000, function() {
        servo.to(90);
      });
    });
    //servo.to( 0 );
    servo.to(90);

    lcd = new five.LCD({
      pins: [7, 8, 9, 10, 11, 12],
      backlight: 6,
      rows: 2,
      cols: 4
    });

    refreshLcd(lcd);

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 3, length: 12}, ], // this is preferred form for definition
    });

    var button = new five.Button({
      pin: 2,
      isPullup: true
    });


    button.on("down", function(value) {
      console.log('New visit');
      var visit = new Visit();
      playLed(strip);
      refreshLcd(lcd);
      visit.save(function (err) {
        if (err){ console.log("ERROR: ", err); }
      });
      board.wait(11000, function() {
        strip.off();
        strip.show();
      });
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
  function playLed(){
    var colors = [
        "red",
        "red",
        "yellow",
        "yellow",
        "green",
        "green",
        "blue",
        "blue",
        "violet",
        "violet",
        "violet"
    ];

    for (it = 0; it < 110; it++) {
        for (i = 0; i < 12; i++) {
          p = strip.pixel(i);
          p.color(colors[i]);
          strip.show();
        }

      lastColor = colors.pop();
      colors.splice(0, 0, lastColor);
    }

    var rand = Math.floor((Math.random() * 10) + 1);

    for (i = 0; i < 12; i++) {
        p = strip.pixel(i);
        if(rand != i){
          p.color('rgb(0,0,0)');
        }
      strip.show();
    }
  }
  });
