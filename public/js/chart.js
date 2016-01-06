$( document ).ready(function() {
  var chartDatas = {};
  var charDefaultData = {
    datasets: [
      {
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        bezierCurve : true
      }
    ]
  };

  var chartDayData = jQuery.extend(true, {}, charDefaultData);

  chartDayData['labels'] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
  chartDayData['datasets'][0]['fillColor'] = "rgba(52, 152, 219,0.6)";
  chartDayData['datasets'][0]['data'] = $('#chartDay').data('chart');
  chartDatas['chartDay'] = chartDayData;

  var chartWeekData = jQuery.extend(true, {}, charDefaultData);

  chartWeekData['labels'] = ['Lundi', 'Mardi', 'Mecredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  chartWeekData['datasets'][0]['fillColor'] = "rgba(46, 204, 113,0.6)";
  chartWeekData['datasets'][0]['data'] = $('#chartWeek').data('chart');
  chartDatas['chartWeek'] = chartWeekData;

  var chartMonthData = jQuery.extend(true, {}, charDefaultData);

  chartMonthData['labels'] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  chartMonthData['datasets'][0]['fillColor'] = "rgba(155, 89, 182,0.6)";
  chartMonthData['datasets'][0]['data'] = $('#chartMonth').data('chart');
  chartDatas['chartMonth'] = chartMonthData;

  var chartYearData = jQuery.extend(true, {}, charDefaultData);

  chartYearData['labels'] = _.map($('#chartYear').data('chart'), function(e){ return e["year"]});
  chartYearData['datasets'][0]['fillColor'] = "rgba(243, 156, 18,0.6)";
  chartYearData['datasets'][0]['data'] = _.map($('#chartYear').data('chart'), function(e){ return e["count"]});
  chartDatas['chartYear'] = chartYearData;

  _.each(chartDatas, function(data, idCanvan){
    var ctx = document.getElementById(idCanvan).getContext("2d");
    var chart = new Chart(ctx).Line(data);
  });
});
