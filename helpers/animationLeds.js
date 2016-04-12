module.exports = function(strip){
  var colors = ["orange", "orange", "magenta", "magenta", "red", "red", "yellow", "yellow", "green", "green", "blue", "blue","violet", "violet","orange", "orange"];

  for (it = 0; it < 110; it++) {
    for (var i = 0; i < 15; i++) {
      pixel = strip.pixel(i);
      pixel.color(colors[i]);
      strip.show();
    }

    lastColor = colors.pop();
    colors.splice(0, 0, lastColor);
  }

  hiddenLeds = [6,7,8,9];
  do{
    var rand = Math.floor((Math.random() * 12) + 0);
  } while(hiddenLeds.indexOf(rand) != - 1);

  for (i = 0; i < 15; i++) {
    pixel = strip.pixel(i);
    pixel.color('rgb(0,0,0)');
    strip.show();
  }
  strip.off();

  pixel = strip.pixel(rand);
  pixel.color(colors[rand]);
  strip.show();
}
