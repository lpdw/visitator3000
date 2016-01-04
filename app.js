var five = require("johnny-five"),
  button;

five.Board().on("ready", function() {

  button = new five.Button({
    pin: 2,
    isPullup: true
  });

  button.on("down", function(value) {
     console.log('Nouvelle visite');
  });
});

