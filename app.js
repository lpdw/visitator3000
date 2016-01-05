var five = require("johnny-five");
var mongoose = require('mongoose');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var lcd;

mongoose.connect('mongodb://localhost/test');
var Visit = mongoose.model('Visit', { at: { type: Date, default: Date.now } });

app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set("layout extractScripts", true)

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('home');
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
