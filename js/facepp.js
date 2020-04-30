var currentImg,
    count = 0,
    tryCount = 0,
    retryLimit = 3;
var fpApi1;
var fpApi2;

function initFace(flickrSource) {
    currentImg = flickrSource;

    var settings = {
        async: false,
        crossDomain: true,
        url: alternateFaceplusplus(count),
        method: 'POST',

        'Content-Type': 'application/json',
        success: function (response) {
            display(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            if (xhr.status == 403) {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return;
                }
                return;
            }
        },
    };
    tryCount = 0;
    retryLimit = 3;
    count++;

    $.ajaxq('queue', settings);
}

function alternateFaceplusplus(i) {
    if (i % 2 == 1) {
        return (
            'https://api-us.faceplusplus.com/facepp/v3/detect?api_key=N_lfn0Xk155RUZj83eBglvtRoWM1QFdr&api_secret=' +
            fpApi1 +
            '&image_url=' +
            currentImg +
            '&return_attributes=gender%2Cage%2Csmiling%2Ceyestatus%2Cethnicity'
        );
    } else {
        return (
            'https://api-us.faceplusplus.com/facepp/v3/detect?api_key=L14duNg-AGMrMQ97DpmBw4GziAk5Mz4D&api_secret=' +
            fpApi2 +
            '&image_url=' +
            currentImg +
            '&return_attributes=gender%2Cage%2Csmiling%2Ceyestatus%2Cethnicity'
        );
    }
}

function display(response) {
    cumulativeData = {
        smile: 0,
        gender: { M: 0, F: 0 },
        ethnicity: '',
        age: 0,
        contains: '',
        location: '',
    };
    Data = {
        smile: 0,
        gender: '',
        ethnicity: '',
        age: 0,
        contains: '',
        location: '',
    };

    if (response.faces.length == 0) {
        if ($('.gallery-container').css('display') == 'none') {
            $('.gallery-container').show();
        }

        $('#photo-result').append(
            '<div class="col-sm-8 col-md-4 animated fadeIn"><div class="thumbnail"><img  class="lightbox" src="' +
                currentImg +
                '" ><div class="caption"><p class="sfa"><i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>' +
                0 +
                '</p><p class="sfg"><i class="fa fa-male fa-lg" aria-hidden="true"></i>' +
                0 +
                '</p><p class="sfs"><i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>' +
                0 +
                '</p></div></div></div>'
        );
    } else {
        if (response.faces.length > 1) {
            for (i = 0; i < response.faces.length; i++) {
                if (response.faces[i].attributes.smile.value != null) {
                    cumulativeData.smile +=
                        response.faces[i].attributes.smile.value;
                }

                if (response.faces[i].attributes.gender.value != null) {
                    if (response.faces[i].attributes.gender.value == 'Male')
                        cumulativeData.gender.M++;

                    if (response.faces[i].attributes.gender.value == 'Female')
                        cumulativeData.gender.F++;
                }

                if (response.faces[i].attributes.age.value != null) {
                    cumulativeData.age +=
                        response.faces[i].attributes.age.value;
                }

                if (response.faces[i].attributes.ethnicity.value != null) {
                    cumulativeData.ethnicity +=
                        response.faces[i].attributes.ethnicity.value;
                }
            }
            cumulativeData.contains = $('#keyword').val();
            cumulativeData.location = $('#location').val();
            cumulativeData.smile =
                cumulativeData.smile / ++response.faces.length;
            cumulativeData.age = cumulativeData.age / response.faces.length;

            if ($('.gallery-container').css('display') == 'none') {
                $('.gallery-container').show();
            }

            $('#photo-result').append(
                '<div class="col-sm-8 col-md-4 animated fadeIn"><div class="thumbnail"><img  class="lightbox" src="' +
                    currentImg +
                    '" ><div class="caption"><p class="mfa"><i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>' +
                    Math.round(cumulativeData.age) +
                    '</p><p class="mmg"><i class="fa fa-male fa-lg" aria-hidden="true"></i>' +
                    cumulativeData.gender.M +
                    '</p>' +
                    '<p class="mfg"><i class="fa fa-female fa-lg" aria-hidden="true"></i>' +
                    cumulativeData.gender.F +
                    '</p>' +
                    '<p class="ms"><i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>' +
                    Math.round(cumulativeData.smile) +
                    '</p></div></div></div>'
            );
            larray.push(cumulativeData);
        } else {
            if (response.faces[0].attributes.smile.value != null) {
                Data.smile = response.faces[0].attributes.smile.value;
            }

            if (response.faces[0].attributes.gender.value != null) {
                Data.gender = response.faces[0].attributes.gender.value;
            }

            if (response.faces[0].attributes.ethnicity.value != null) {
                Data.ethnicity = response.faces[0].attributes.ethnicity.value;
            }
            if (response.faces[0].attributes.age.value != null) {
                Data.age = response.faces[0].attributes.age.value;
            }

            Data.contains = $('#keyword').val();
            Data.location = $('#location').val();
            larray.push(Data);

            if (Data.gender == 'Male') {
                if ($('.gallery-container').css('display') == 'none') {
                    $('.gallery-container').show();
                }
                $('#photo-result').append(
                    '<div class="col-sm-8 col-md-4 animated fadeIn"><div class="thumbnail"><img  class="lightbox" src="' +
                        currentImg +
                        '" ><div class="caption"><p class="sfa"><i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>' +
                        Data.age +
                        '</p><p class="sfg"><i class="fa fa-male fa-lg" aria-hidden="true"></i>' +
                        1 +
                        '</p><p class="sfs"><i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>' +
                        Data.smile +
                        '</p></div></div></div>'
                );
            } else {
                if ($('.gallery-container').css('display') == 'none') {
                    $('.gallery-container').show();
                }
                $('#photo-result').append(
                    '<div class="col-sm-8 col-md-4 animated fadeIn"><div class="thumbnail"><img  class="lightbox" src="' +
                        currentImg +
                        '" ><div class="caption"><p class="sfa"><i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>' +
                        Data.age +
                        '</p><p class="sfg"><i class="fa fa-female fa-lg" aria-hidden="true"></i>' +
                        1 +
                        '</p><p class="sfs"><i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>' +
                        Data.smile +
                        '</p></div></div></div>'
                );
            }
        }
    }
}
