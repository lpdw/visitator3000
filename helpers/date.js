Date.prototype.getWeek = function() {
  var determinedate = new Date();
  determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
  var D = determinedate.getDay();
  if(D == 0) D = 7;
  determinedate.setDate(determinedate.getDate() + (4 - D));
  var YN = determinedate.getFullYear();
  var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
  var WN = 1 + Math.floor(ZBDoCY / 7);
  return WN;
}

Date.prototype.getDayOfYear = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((this - onejan) / 86400000);
}

Date.prototype.tomorrow = function() {
  var tomorrow = new Date(this);
  tomorrow.setDate(this.getDate()+1);
  return tomorrow;
}

Date.prototype.toDate = function() {
  return this.toJSON().slice(0,10);
}
