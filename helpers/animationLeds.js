module.exports = function(strip){
  var colors = ["orange", "orange", "red", "red", "yellow", "yellow", "green", "green", "blue", "blue","violet", "violet"];

  for (it = 0; it < 110; it++) {
    for (i = 0; i < 12; i++) {
      pixel = strip.pixel(i);
      pixel.color(colors[i]);
      strip.show();
    }

    lastColor = colors.pop();
    colors.splice(0, 0, lastColor);
  }

  var rand = Math.floor((Math.random() * 13) + 0);

  for (i = 0; i < 12; i++) {
    pixel = strip.pixel(i);
    if(rand != i){
      pixel.color('rgb(0,0,0)');
    }
    strip.show();
  }
}
