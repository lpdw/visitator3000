var express = require('express');
var router = express.Router();
var async = require('async');
var Visit = require('../models/visit');
var _ = require('lodash');
var spreadsheet = require('../helpers/spreadsheet');

router.post('/visits', function(req, res) {
  var day = new Date(req.body.dateVisits);
  countVisits = parseInt(req.body.countVisits);

  Visit.countByDay(day, function(count){
    if (count - countVisits > 0){
      Visit.removeByDate({day: day, count: count - countVisits}, function(deleteCount){
        req.flash('status', 'Succès de suppresion de ' + deleteCount + ' visites le ' + req.body.dateVisits);
        res.redirect('/');
      });
    } else {
      var visits = _.times(countVisits - count, function() { return {at: day} });
      Visit.collection.insert(visits, function(err, result){
        _.each(visits,function(visit){
          spreadsheet.addCell(visit);
        })
        req.flash('status', "Succès de l'ajout de " + result['insertedCount'] + ' visites le ' + req.body.dateVisits);
        res.redirect('/');
      });
    }
  });
});

module.exports = router;
