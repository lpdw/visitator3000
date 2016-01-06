$( document ).ready(function() {


  var dataDay = {
      labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      datasets: [
          {
              label: "2016",
              fillColor: "rgba(52, 152, 219,0.6)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              data: [70,90,100,60,90,110,200,80,0,0,0,0]
          }
      ]
  };

  var dataWeek = {
      labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      datasets: [
          {
              label: "2016",
              fillColor: "rgba(52, 152, 219,0.6)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              data: [70,90,100,60,90,110,200,80,0,0,0,0]
          }
      ]
  };

 var dataMonth = {
     labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
     datasets: [
         {
             label: "2016",
             fillColor: "rgba(52, 152, 219,0.6)",
             strokeColor: "rgba(220,220,220,1)",
             pointColor: "rgba(220,220,220,1)",
             pointStrokeColor: "#fff",
             pointHighlightFill: "#fff",
             data: [70,90,100,60,90,110,200,80,0,0,0,0]
         }
     ]
 };

 var dataYear = {
     labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
     datasets: [
         {
             label: "2016",
             fillColor: "rgba(52, 152, 219,0.6)",
             strokeColor: "rgba(220,220,220,1)",
             pointColor: "rgba(220,220,220,1)",
             pointStrokeColor: "#fff",
             pointHighlightFill: "#fff",
             data: [70,90,100,60,90,110,200,80,0,0,0,0]
         }
     ]
 };


 charts = ['chartDay', 'chartWeek', 'chartMonth', 'chartYear']
 charts.forEach(function(e,i){
   var ctx = document.getElementById(e).getContext("2d");
   var myRadarChart = new Chart(ctx).Line(data);
 });
});
