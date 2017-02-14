var map;
var markers = [];
var infowindow;
var image = {
    url: '/images/display_price.png',
    scaledSize: new google.maps.Size(38, 20),
};
var image_hover = {
    url: '/images/rt-hover-on-map.png',
    scaledSize: new google.maps.Size(38, 20),
};
var properties = [
    {
        lat: 38.880320,
        lng: -77.168394,
        price: "$121",
        address: 'E Broad St & E Fairfax St',
        propertyPhoto: 'arch.jpg'
    },
    {
        lat: 38.880570,
        lng: -77.169038,
        price: "$160",
        address: 'Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-1.jpg'
    },
    {
        lat: 38.880796,
        lng: -77.170668,
        price: "$125",
        address: '115 East Fairfax Street Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-2.jpg'
    },
    {
        lat: 38.880194,
        lng: -77.170025,
        price: "$180",
        address: '203 Katie Court Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-3.jpg'
    },
    {
        lat: 38.881840,
        lng: -77.171033,
        price: "$120",
        address: '104 East Broad Street Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-4.jpg'
    },
    {
        lat: 38.879543,
        lng: -77.167857,
        price: "$160",
        address: '304 East Broad Street Falls Church, VA 22046, USA',
        propertyPhoto: 'city.jpg'
    },
    {
        lat: 38.895301,
        lng: -77.189412,
        price: "$160",
        address: '7039-7055 Haycock Rd Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-3.jpg'
    }
];

// map for profile public view
function userProfilePropertyOnMap() {
    map = new google.maps.Map(document.getElementById('userProfileMap'), {
        center: {lat: 38.880320, lng: -77.168394}
    });

    var bounds = new google.maps.LatLngBounds();
    properties.forEach(function (property) {
        propertyLatLng = {
            lat: property.lat,
            lng: property.lng
        };
        var marker = createMarkerForProperties(propertyLatLng, property.price, property.address);

        markers.push(marker);

        bounds.extend(propertyLatLng);

        marker.addListener('mouseover', function () {
            marker.setIcon(image_hover);
        });
        marker.addListener('mouseout', function () {
            marker.setIcon(image);
        });

        marker.addListener('click', function () {
            if (infowindow) {
                infowindow.close(map, marker);
            }
            infowindow = createInfoWindowForProperties(property);
            infowindow.setOptions({pixelOffset: getInfowindowOffset(marker)});
            infowindow.open(map, marker);
        });

    });
    map.fitBounds(bounds);

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

}

// map for property listing
function propertyListingPropertyOnMap() {
    map = new google.maps.Map(document.getElementById('propertyListingMap'), {
        center: {lat: 38.880320, lng: -77.168394}
    });

    var bounds = new google.maps.LatLngBounds();
    properties.forEach(function (property) {
        propertyLatLng = {
            lat: property.lat,
            lng: property.lng
        };
        var marker = createMarkerForProperties(propertyLatLng, property.price, property.address);

        markers.push(marker);

        bounds.extend(propertyLatLng);

        marker.addListener('mouseover', function () {
            marker.setIcon(image_hover);
        });
        marker.addListener('mouseout', function () {
            marker.setIcon(image);
        });

        marker.addListener('click', function () {
            if (infowindow) {
                infowindow.close(map, marker);
            }
            infowindow = createInfoWindowForProperties(property);
            infowindow.setOptions({pixelOffset: getInfowindowOffset(marker)});
            infowindow.open(map, marker);
        });

    });
    map.fitBounds(bounds);

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

}

function autoCompleteforPropertyListing() {
    var input = document.getElementById('goToSearch');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
}


// common map functions for placing marker and infowindow
function createMarkerForProperties(propertyLatLng, price, address) {
    var latLng = new google.maps.LatLng(propertyLatLng);
    var marker = new google.maps.Marker({
        position: latLng,
        label: price,
        icon: image,
        title: address
    });
    return marker;
}

function createInfoWindowForProperties(propertyInfo) {
    var contentString = '<div id="iw-container">' +
        '<img src="/images/' + propertyInfo.propertyPhoto + '" class="responsive-img"> ' +
        '<div class="rt-info-window-propertyInfo-bg">' +
        '<p>Address: ' + propertyInfo.address + '</p>' +
        '<p> <span>Price: ' + propertyInfo.price + '</span></p>' +
        '</div>' +
        '</div>';

    var infowindowCreated = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true,
        maxWidth: 328
    });
    infowindowCreated.addListener('domready', function () {
        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display': 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display': 'none'});

        // bottom kuj
        iwBackground.children(':nth-child(3)').css({'display': 'none'});

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({left: '0px'});
        iwOuter.parent().parent().css({right: '0px'});
        iwOuter.parent().parent().css({top: '0px'});
        iwOuter.parent().parent().css({bottom: '0px'});

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({
            width: '20px',
            height: '20px',
            overflow: 'hidden',
            position: 'absolute',
            opacity: '1',
            right: '33px',
            top: '4px',
            'z-index': '10000',
            cursor: 'pointer',
            border: '4px solid rgb(72, 181, 233)',
            'border-radius': '13px',
            'box-shadow': '0 0 5px #3990B9'
        });

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function () {
            $(this).css({opacity: '1'});
        });

    });
    return infowindowCreated;
}

function getInfowindowOffset(marker) {
    var center = getPixelFromLatLng(map.getCenter()),
        point = getPixelFromLatLng(marker.getPosition()),
        quadrant = "",
        offset;
    quadrant += (point.y > center.y) ? "b" : "t";
    quadrant += (point.x < center.x) ? "l" : "r";
    if (quadrant == "tr") {
        offset = new google.maps.Size(-180, 220);
    } else if (quadrant == "tl") {
        offset = new google.maps.Size(200, 220);
    } else if (quadrant == "br") {
        offset = new google.maps.Size(-180, 20);
    } else if (quadrant == "bl") {
        offset = new google.maps.Size(180, 20);
    }

    return offset;
}

function getPixelFromLatLng(latLng) {
    var projection = map.getProjection();
    var point = projection.fromLatLngToPoint(latLng);
    return point;
}
// end common map functions


// map for add property
function userInputedLocationIndicator() {
    var imagePlaceIndicator = {
        url: './images/rt_marker.png',
        scaledSize: new google.maps.Size(65, 65)
    };
    map = new google.maps.Map(document.getElementById('locationIndicator'), {
        center: {lat: 38.317971, lng: -97.844799},
        zoom: 4
    });
    var input = document.getElementById('locationFinder');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
        map: map,
        icon: imagePlaceIndicator,
        draggable: true,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}

// Home photo multiple uploading for property adding
$(function () {

    // multiple uploading and preview display
    $("#trigureFile").click(function () {
        $("#file").trigger("click");
    });
    $("#file").change(function (e) {
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i];

            var img = document.createElement("img");
            var reader = new FileReader();
            reader.onloadend = function () {
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            $("#onChangeImage").before(img);
        }
    });

    // property listing page
    $('.rt-property-listing-filter').sideNav({
            menuWidth: 350, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        }
    );

    // payed received history
    $('#payedBtn').click(function () {
        $('#receivedTableShow').css('display', 'none');
        $('#payedTableShow').css('display', 'block');
        $('#payedBtn').addClass('rt-payed-received-btn-active');
        $('#receivedBtn').removeClass('rt-payed-received-btn-active');
    });
    $('#receivedBtn').click(function () {
        $('#receivedTableShow').css('display', 'block');
        $('#payedTableShow').css('display', 'none');
        $('#receivedBtn').addClass('rt-payed-received-btn-active');
        $('#payedBtn').removeClass('rt-payed-received-btn-active');
    });

});

