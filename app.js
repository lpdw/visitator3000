var five = require("johnny-five"),
button;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Visit = mongoose.model('Visit', { at: { type: Date, default: Date.now } });

five.Board().on("ready", function() {

  button = new five.Button({
    pin: 2,
    isPullup: true
  });

  button.on("down", function(value) {
    console.log('Nouvelle visite');
    var visit = new Visit();
    visit.save(function (err) {
      if (err){
        console.log("ERROR: ", err);
      }
    });
  });
});
