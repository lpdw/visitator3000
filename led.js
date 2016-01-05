pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 3, length: 12}, ], // this is preferred form for definition
    });

    strip.on("ready", function() {
      //strip.color("rgb(0, 255, 0)"); // sets strip to green using rgb values
      var i = 0;
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

      for (it = 0; it < 100; it++) {
          for (i = 0; i < 12; i++) {
            console.log("ICI");
            p = strip.pixel(i);
            p.color(colors[i]);
            strip.show();
            console.log("i",i);
          }

        lastColor = colors.pop();
        colors.splice(0, 0, lastColor);
      }

      var rand = Math.floor((Math.random() * 10) + 1);

      for (i = 0; i < 12; i++) {
          console.log("rand:", rand);
          pTemp = strip.pixel(i);
          if(rand != i){
            pTemp.color('rgb(0,0,0)');
          }
        strip.show();
      }
    });
});
