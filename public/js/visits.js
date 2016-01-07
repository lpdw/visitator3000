$( document ).ready(function() {
  $('#datePickerVisits').change(function(){
    var dateString = $('#datePickerVisits').val();
    $.get("/visits?day=" +  dateString, function(data) {
      $('#countVisits').val(data['count']);
    });
  })
});
