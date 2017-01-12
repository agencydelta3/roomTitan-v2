$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});


    $("#triggerOpenFileExplorer").click(function () {
        $("#openFileExplorer").trigger("click");
    });
});