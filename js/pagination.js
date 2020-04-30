$('#page-selection')
    .bootpag({
        total: 2,
        page: 1,
        maxVisible: 0,
        leaps: false,
        next: '<i class="fa fa-angle-right fa-4x" aria-hidden="true"></i>',
        prev: null,
    })
    .on('page', function (event, num) {
        $('.loadercontainer').css('display', 'block');

        var flickrOptions = {
            page: num,
            tags: keyword,
            lat: myLAT,
            lon: myLON,
            per_page: 100,
        };

        $.getJSON(flickrAPI, flickrOptions, function (json) {
            SortPhotos(json);

            if (pagecount > 250) {
                $(this).bootpag({ total: 250 });
            } else {
                $(this).bootpag({ total: pagecount });
            }
            finish();
        });
    });
