$( ".modal-trigger" ).click(function() {
  $('#modal1').openModal();
});


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
