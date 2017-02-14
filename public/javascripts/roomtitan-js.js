$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});


    $("#triggerOpenFileExplorer").click(function () {
        $("#openFileExplorer").trigger("click");
    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

});