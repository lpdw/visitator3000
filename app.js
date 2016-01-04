var five = require("johnny-five");
var mongoose = require('mongoose');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();

mongoose.connect('mongodb://localhost/test');
var Visit = mongoose.model('Visit', { at: { type: Date, default: Date.now } });

app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(process.env.VISITATOR_3000_PORT || 8080);

five.Board().on("ready", function() {

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
      }
    });
  });
});
