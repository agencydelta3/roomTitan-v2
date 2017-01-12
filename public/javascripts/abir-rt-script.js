// Wait for window load
$(window).load(function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});


/* Full-width carousel */
$(function(){ $('.carousel.carousel-slider').carousel({full_width: true}); });

$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
      items: 3,
      loop: true,
      margin: 10,
      autoplay:true,
      autoplayTimeout:1800,
      autoplayHoverPause:true,
      responsive : {
      // breakpoint from 0 up
      0 : {
        items:1,
        autoHeight:true
      },
      760:{
        items:2
      },
      // breakpoint from 480 up
      1101 : {
        items:3
      },

    }
  });
});

/** Google maps Property Details **/
var map, mapi, infowindow;
function initMap() {
  var chicago = {lat: 41.878, lng: -87.629};
  map = new google.maps.Map(document.getElementById('circle-map'), {
    zoom: 6,
    center: chicago
  });
  var marker = new google.maps.Marker({
    position: chicago,
    icon: '/assets/rt_marker.png',
    map: map
  });

  var cityCircle = new google.maps.Circle({
    strokeColor: '#179ed5',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#f3b9bb',
    fillOpacity: 0.35,
    map: map,
    center: chicago,
    radius: Math.sqrt(2714856) * 100
  });

}

function display() {
  var e = document.getElementById('nearby_select').value;
  initializeMap(e);
}


function initializeMap(type) {
var newyork = {lat: 40.714, lng: -74.005};

  mapi = new google.maps.Map(document.getElementById('nearby-map'), {
    center: newyork,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(mapi);
  service.nearbySearch({
    location: newyork,
    radius: 500,
    type: [type]
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      document.getElementById("nearby-list").innerHTML = '<li id='+i+'>'+results[i].name+'</li>';
      // console.log(results[i]);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: mapi,
    position: placeLoc,
    icon: '/assets/rt_marker.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(mapi, this);
  });
}

$(document).ready(function() {
  $('#circle-map').css({'display':'','visible':'hidden','position':'absolute' });
  // $('#circle-map').hide();
  $("#show-map").click(function() {
    $('#circle-map').css({'visibility':'visible', 'position':'relative'});
    var uluru = {lat: -25.363, lng: 131.044};
    google.maps.event.addListener(map, 'idle', function() {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(uluru);
    });
  });
});

// HOME
// Count up
(function($) {
  $.fn.countTo = function(options) {
    // merge the default plugin settings with the custom options
    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(options.speed / options.refreshInterval),
    increment = (options.to - options.from) / loops;

    return $(this).each(function() {
      var _this = this,
      loopCount = 0,
      value = options.from,
      interval = setInterval(updateTimer, options.refreshInterval);

      function updateTimer() {
        value += increment;
        loopCount++;
        $(_this).html(value.toFixed(options.decimals));

        if (typeof(options.onUpdate) == 'function') {
          options.onUpdate.call(_this, value);
        }

        if (loopCount >= loops) {
          clearInterval(interval);
          value = options.to;

          if (typeof(options.onComplete) == 'function') {
            options.onComplete.call(_this, value);
          }
        }
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,  // the number the element should start at
    to: 100,  // the number the element should end at
    speed: 1000,  // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,  // the number of decimal places to show
    onUpdate: null,  // callback method for every time the element is updated,
    onComplete: null,  // callback method for when the element finishes updating
  };
})(jQuery);

jQuery(function($) {
  $('.houses').countTo({
    from: 0,
    to: 200,
    speed: 5000,
    refreshInterval: 50,
    onComplete: function(value) {
      // console.debug(this);
    }
  });
});
jQuery(function($) {
  $('.rooms').countTo({
    from: 0,
    to: 400,
    speed: 5000,
    refreshInterval: 50,
    onComplete: function(value) {
      // console.debug(this);
    }
  });
});
jQuery(function($) {
  $('.parkings').countTo({
    from: 0,
    to: 200,
    speed: 4000,
    refreshInterval: 50,
    onComplete: function(value) {
      // console.debug(this);
    }
  });
});
jQuery(function($) {
  $('.commercial').countTo({
    from: 0,
    to: 50,
    speed: 5000,
    refreshInterval: 50,
    onComplete: function(value) {
      // console.debug(this);
    }
  });
});

// end of Count up


// Owl carousel
$(document).ready(function() {

  $("#owl-demo").owlCarousel({

      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      // singleItem:true

      // "singleItem:true" is a shortcut for:
      items : 1,
      itemsDesktop : true,
      itemsDesktopSmall : true,
      itemsTablet: true,
      itemsMobile : true

  });

});

$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  }
);










/** Document Ready Functions **/
/********************************************************************/

$( document ).ready(function() {

    // Resive video
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

/** Reusable Functions **/
/********************************************************************/

function scaleVideoContainer() {

    var height = $(window).height();
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        videoWidth,
        videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width'),
            windowAspectRatio = windowHeight/windowWidth;

        if (videoAspectRatio > windowAspectRatio) {
            videoWidth = windowWidth;
            videoHeight = videoWidth * videoAspectRatio;
            $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
        } else {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
        }

        $(this).width(videoWidth).height(videoHeight);

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}




$(document).ready(function() {
    $('select').material_select();
});









// Text Slider
$('.carousel.carousel-slider').carousel({full_width: true});
//
// $('.carousel').carousel({
//     padding: 200
// });
// autoplay()
// function autoplay() {
//     $('.carousel').carousel('next');
//     setTimeout(autoplay, 4500);
// }


// HOME END



// PROFILE

// Modal
$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
$('.modal').modal();
});

// Password form Hide/Show
$("#showResetPasswordForm").click(function(){
    $("#resetPasswordForm").show();
});

// PROFILE END
