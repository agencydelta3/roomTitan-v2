$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.modal').modal();
    $('select').material_select();


    $("#triggerOpenFileExplorer").click(function () {
        $("#openFileExplorer").trigger("click");
    });
});