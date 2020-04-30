var pagecount,
    myLAT,
    myLON,
    api_size,
    flickrAPI,
    fAPI,
    defaultsize,
    flickrOptions,
    totalImages;

function FlickrRequest(lat, lng) {
    if (lat != null) {
        myLAT = lat;
    } else {
        alert('latitude returned ' + String(lat));
    }

    if (lng != null) {
        myLON = lng;
    } else {
        alert('longitude returned ' + String(lng));
    }

    flickrAPI =
        'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
        fAPI +
        '&format=json&nojsoncallback=1';
    defaultsize = 'Medium 640';

    flickrOptions = {
        tags: keyword,
        lat: myLAT,
        lon: myLON,
        per_page: 10,
        page: 1,
    };

    $.getJSON(flickrAPI, flickrOptions, function (json) {
        SortPhotos(json);
        finish();
    });
}

function SortPhotos(json) {
    if (json.photos.total == 0) {
        alert('I found no images!');
        $('.loadercontainer').css('display', 'none');
        $('#page-selection').hide();
        $('#sresults').html('Results found: ' + json.photos.total);
        return;
    }

    if (json.photos.total > 100) {
        $('#page-selection').show();
        totalImages = json.photos.total;
        $('#sresults').html('Results found: ' + json.photos.total);
    } else {
        $('#sresults').html('Results found: ' + json.photos.total);
    }
    $('#photo-result').empty();

    $('#photo-result').empty();

    $.each(json.photos.photo, function (s1, myresult) {
        eachSize(myresult.id);
    });
}

function eachSize(id) {
    var settings = {
        async: false,
        crossDomain: true,
        url:
            'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' +
            fAPI +
            '&photo_id=' +
            id +
            '&format=json&nojsoncallback=1',
        method: 'POST',
    };

    $.ajax(settings).done(function (response) {
        SortSizes(response);
    });
}

function SortSizes(size) {
    $.each(size.sizes.size, function (s2, myresult_size) {
        if (myresult_size.label == defaultsize) {
            initFace(myresult_size.source);
        }
    });
}

function finish() {
    $('.loadercontainer').css('display', 'none');
}
