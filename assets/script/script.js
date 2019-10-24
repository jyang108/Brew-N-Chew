$(document).ready(function () {

    // $(".submit").on("click", function (event) {
<<<<<<< HEAD
        // event.preventDefault()

        var initialBreweryURL = "https://api.openbrewerydb.org/breweries?by_city={cityname}&by_state={state}";
        var city = "minneapolis";
        var state = "Minnesota";

        var cityBreweryURL = initialBreweryURL.replace("{cityname}", city);
        var stateBreweryURL = cityBreweryURL.replace("{state}",state);
        
        var breweryURL = stateBreweryURL;

        console.log(breweryURL);

        // ajax for zomato
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=minneapolis&entity_type=city&q=burgers",
            dataType: 'json',
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('user-key',
                    'd88928eafacfec3391be0d039bd9daa4');
            },
        }).then(function (response) {
            console.log(response);
        });
    };

        
// ajax for brewery
=======
    // event.preventDefault()

    var initialBreweryURL = "https://api.openbrewerydb.org/breweries?by_city={cityname}&by_state={state}";
    var city = "Des Moines";
    var state = "Iowa";

    for(i=0; i < city.length; i++){
        if (city.charAt[i] === "d") {
            city.replace( "d", "%20");
        }
    }
    console.log(city)

    for(i=0; i < state.length; i++){
        if (state.charAt[i] === " ") {
            state.replace(" ", "%20");
        }
    }
    console.log(state)

    var cityBreweryURL = initialBreweryURL.replace("{cityname}", city);
    var stateBreweryURL = cityBreweryURL.replace("{state}", state);

    var breweryURL = stateBreweryURL;

    // console.log(breweryURL);

    // ajax for zomato
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=minneapolis&entity_type=city&q=burgers",
        dataType: 'json',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'd88928eafacfec3391be0d039bd9daa4');
        },
    }).then(function (response) {
        // console.log(response);
    });

    // ajax for brewery
>>>>>>> dce9fc9c8cd9f6118f27139b29895a90cb154b11
    $.ajax({
        url: breweryURL,
        method: "GET"
    }).then(function (response) {
        // var theResult = response;
        // console.log(theResult);
    });
});
    });
