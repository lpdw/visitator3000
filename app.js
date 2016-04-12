var five = require("johnny-five"),
    pixel = require("node-pixel"),
    expressLayouts = require('express-ejs-layouts'),
    schedule = require('node-schedule'),
    flash = require('connect-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    _ = require('lodash'),
    auth = require('./middlewares/auth'),
    bodyParser = require('body-parser'),
    express = require('express'),
    Visit = require('./models/visit'),
    dateHelper = require('./helpers/date'),
    home = require('./routes/home'),
    index = require('./routes/index'),
    create = require('./routes/create'),
    refreshLcd = require('./helpers/refreshLcd'),
    animationLeds = require('./helpers/animationLeds'),
    app = express();

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
app.use(auth);
app.use(home);
app.use(index);
app.use(create);

app.listen(process.env.VISITATOR_3000_PORT || 8080);

board = five.Board();

board.on("ready", function() {
  var servo = new five.Servo(5);
  servo.to(0);

  schedule.scheduleJob('* * 1 * * *', function(){
    servo.to(0);
    board.wait(20000, function() {
      servo.to(90);
    });
  });

  var lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 4
  });

  refreshLcd(lcd);

  strip = new pixel.Strip({
    board: this,
    controller: "FIRMATA",
    strips: [ {pin: 3, length: 16} ]
  });

  var button = new five.Button({
    pin: 4,
    isPullup: true
  });

  button.on("down", function(value) {
    var dteTemp = new Date();
    Visit.count({
      at: {$gte: dteTemp.setSeconds(dteTemp.getSeconds()-1), $lt: dteTemp.setSeconds(dteTemp.getSeconds()+1)}
      }).exec(function (err, number) {
      if(!number){
        console.log('New visit');
        var visit = new Visit();
        animationLeds(strip);
        visit.save(function(){
          refreshLcd(lcd);
        });
      }

    });

    // board.wait(10000, function() {
    //   strip.off();
    //   strip.show();
    // });
  });
});
