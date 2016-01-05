pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 3, length: 9}, ], // this is preferred form for definition
    });

    strip.on("ready", function() {
	    strip.color("rgb(0, 255, 0)"); // sets strip to green using rgb values
	    strip.show();
    });
});
