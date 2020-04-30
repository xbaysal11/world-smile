var keyword;
var locationinput;
var thisObject;
var larray = [],
    graphdata = [],
    Chartlabel = [],
    bckg = [],
    knownlocations = [],
    graphtest = [];
var executed = false;
var step = 0;
var smile = 0;
var wasshown;

// flickr api
fAPI = '12a89bbffb51e4d3c9a0d7d0487a597c';
// googlemaps api
gmaps = 'AIzaSyDXxwQQFKd1MnsNS7uM2CaZHPdQO6KSeAE';
// face++ api 1
fpApi1 = 'wFWG_FRfUrjhQGlPeJ9azjAH6UVQospR';
// face++ api 2
fpApi2 = 'mL2l6w_rHAeVnsrvYQy19mQ8EttOxfFo';

$(document).ready(function () {
    var indexOfCurrent,
        counter = 0;

    $('#qs').click(function () {
        keyword = $('#keyword').val();
        locationinput = $('#location').val();

        if (locationinput == null && keyword == null) {
            alert('please complete all fields');
        } else {
            $('.loadercontainer').css('display', 'block');
            if ($('.charts').css('display') == 'block') {
                $('.charts').hide();
                $('#compute').html('compute results');
            }
            locationEncoder(locationinput);
        }
    });

    $('#compute').click(function () {
        $('.gallery-container').toggle();
        $('.charts').toggle();
        $(this).html(
            $(this).html() == 'go back' ? 'compute results' : 'go back'
        );

        if ($('#page-selection').css('display') == 'block') {
            $('#page-selection').css('display', 'none');
            wasshown = true;
        } else {
            if (
                wasshown == true &&
                $('#page-selection').css('display') == 'none'
            ) {
                $('#page-selection').css('display', 'block');
                wasshown = false;
            }
        }

        if ($('.gallery-container').css('display') == 'none') {
            knownlocations = [];
            graphdata = [];
            Chartlabel = [];
            bckg = [];
            executed = false;
            $('.chartsdetails').empty();

            $.each(larray, function (position, value) {
                if (IsValidArray(value)) {
                    knownlocations[indexOfCurrent].push(value);
                } else {
                    var arr = [];
                    arr.push(value);
                    knownlocations.push(arr);
                }
            });

            function IsValidArray(value) {
                if (knownlocations.length > 0) {
                    for (var i = 0; i < knownlocations.length; i++) {
                        if (knownlocations[i][0].location == value.location) {
                            indexOfCurrent = i;
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            }

            $.each(knownlocations, function (position, value) {
                $.each(value, function (pos, val) {
                    if (!executed) {
                        bckg.push(getRandomColor());
                        Chartlabel.push(val.location);
                        executed = true;
                    }
                    smile += val.smile;
                    step++;
                });
                smile = smile / step;
                graphdata.push(smile);
                executed = false;
                smile = 0;
                step = 0;
            });

            console.log(knownlocations);
            startGraph();

            $.each(knownlocations, function (pos, val) {
                $('.chartsdetails').append(
                    '<div class="" align="center" style=" width: 350px; border-radius: 10px; background:white; margin: 10px auto; padding: 10px 30px"><p style="font-family: Zilla Slab;">Faces detected and included in graph from <b>' +
                        $(this)[0].location +
                        '</b><b style="color:green; margin-left: 5px;"> ' +
                        $(this).length +
                        '</b>&nbspfaces' +
                        '</b></p></div>'
                );
            });
        } else {
            $('.chartsdetails').empty();
        }
    });

    function getRandomColor() {
        var hue =
            'rgb(' +
            Math.floor(Math.random() * 256) +
            ',' +
            Math.floor(Math.random() * 256) +
            ',' +
            Math.floor(Math.random() * 256) +
            ')';
        return hue;
    }

    $('#help').click(function () {
        $('#helpModal').modal('show');
    });
});

function showWarning() {
    $('#landingModal').modal('show');
}
