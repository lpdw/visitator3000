var Visit = require('../models/visit');

module.exports = function(lcd){
  lcd.cursor(0, 0).print("JOUR MOIS  ANNEE");

  Visit.countThisDay(function (count) {
    lcd.cursor(1, 0).print(count);
  });

  Visit.countThisMonth(function (count) {
    lcd.cursor(1, 5).print(count);
  });

  Visit.countThisYear(function (count) {
    lcd.cursor(1, 11).print(count);
  });
};
