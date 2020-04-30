function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (document.getElementById('location')),
        { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    var place = autocomplete.getPlace();
}

function locationEncoder(location) {
    var lat = 0;
    var lon = 0;
    var res = encodeURIComponent(location);

    var settings = {
        async: false,
        crossDomain: true,
        url:
            'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDXxwQQFKd1MnsNS7uM2CaZHPdQO6KSeAE&address=' +
            res +
            '',
        method: 'POST',
    };

    $.ajax(settings).done(function (response) {
        if (response.status == 'OK') {
            lat = response.results[0].geometry.location.lat;
            lon = response.results[0].geometry.location.lng;
        } else {
            alert(response.status);
        }

        FlickrRequest(lat, lon);
    });
}
