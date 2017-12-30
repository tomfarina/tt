$(document).ready( function(){
    $('.taskName').hover(
        function(){
            $(this).children(".buttons").show();
        }
        , function() {
            $(this).children(".buttons").hide();
        }
    );

    var slideDuration = 100;
    $('.task').hover(function(e) {
        $(this).children(".workGroup").stop(true, true).slideDown({ duration: slideDuration, queue: false });
    }, function() {
        $(this).children(".workGroup").stop(true, true).slideUp({ duration: slideDuration, queue: false });
    });


});
