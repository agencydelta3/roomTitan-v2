// map for profile public view
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
        price: "121$",
        address: 'E Broad St & E Fairfax St',
        propertyPhoto: 'arch.jpg'
    },
    {
        lat: 38.880570,
        lng: -77.169038,
        price: "160$",
        address: 'Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-1.jpg'
    },
    {
        lat: 38.880796,
        lng: -77.170668,
        price: "125$",
        address: '115 East Fairfax Street Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-2.jpg'
    },
    {
        lat: 38.880194,
        lng: -77.170025,
        price: "180$",
        address: '203 Katie Court Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-3.jpg'
    },
    {
        lat: 38.881840,
        lng: -77.171033,
        price: "120$",
        address: '104 East Broad Street Falls Church, VA 22046, USA',
        propertyPhoto: 'arch-4.jpg'
    },
    {
        lat: 38.879543,
        lng: -77.167857,
        price: "160$",
        address: '304 East Broad Street Falls Church, VA 22046, USA',
        propertyPhoto: 'city.jpg'
    }
];

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
            infowindow = createInfoWindowForProperties(marker, property);
            infowindow.setOptions({pixelOffset: getInfowindowOffset(marker)});
            infowindow.open(map, marker);
        });

    });
    map.fitBounds(bounds);

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

}


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

function createInfoWindowForProperties(marker, propertyInfo) {
    var contentString = '<div id="content">' +
        '<img src="/images/' + propertyInfo.propertyPhoto + '" class="responsive-img"> ' +
        '<div class="rt-info-window-propertyInfo-bg">' +
        '<p>' + propertyInfo.price + '</p>' +
        '<p>Property title</p>' +
        '</div>' +
        '</div>';

    var infowindow_created = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true,
        maxWidth: 350
    });
    return infowindow_created;
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
        offset = new google.maps.Size(180, 220);
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
});
