$(document).ready(function () {
    $("a").on("click", function () {
        $("header").css("visibility", "hidden");
    });

    $("#drinkSearch").on("click", function () {
        var initialBreweryURL = "https://api.openbrewerydb.org/breweries?by_city={cityname}&by_state={state}";
        var city = $("#drinkCity").val();
        var state = $("#drinkState").val();

        // replaces spaces with %20
        for (var i = 0; i < city.length; i++) {
            if (city.charAt(i) === " ") {
                var city = city.replace(" ", "%20");
            };
        };

        for (var i = 0; i < state.length; i++) {
            if (state.charAt(i) === " ") {
                var state = state.replace(" ", "%20");
            };
        };

        var cityBreweryURL = initialBreweryURL.replace("{cityname}", city);
        var stateBreweryURL = cityBreweryURL.replace("{state}", state);

        var breweryURL = stateBreweryURL;
console.log(breweryURL);
        $.ajax({
            url: breweryURL,
            method: "GET"
        }).then(function (response) {
            var theResult = response;
            console.log(theResult);
        });
    });

$("#foodSearch").on("click", function(){
    var theCity = $("#foodCity").val().trim();
    var keyWord = $("#foodType").val().trim();
    var theZomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + theCity + "&entity_type=city&q=" + keyWord;
    // ajax for zomato
    $.ajax({
        url: theZomatoUrl,
        dataType: 'json',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'd88928eafacfec3391be0d039bd9daa4');
        },
    }).then(function (response) {
        console.log(response);
    });
})


    $(".button").on("click", function () {
        var foodDiv = $("#foodDiv")
        var drinkDiv = $("#drinkDiv")
        var dataID = $(this).attr("data-id");
        if (dataID === "foodDiv") {
            foodDiv.css("visibility", "visible");
        } else if (dataID === "drinkDiv") {
            drinkDiv.css("visibility", "visible");
        } else if (dataID === "both") {
            foodDiv.css("visibility", "visible");
            drinkDiv.css("visibility", "visible");
        }
    });



    $("#home").on("click", function () {
        var foodDiv = $("#foodDiv")
        var drinkDiv = $("#drinkDiv")
        $("header").css("visibility", "visible");
        foodDiv.css("visibility", "hidden");
        drinkDiv.css("visibility", "hidden");

    });

    function changeTheSpaces(name){
        var theName = name;
        for (var i = 0; i < theName.length; i++) {
            if (theName.charAt(i) === " ") {
                var theName = theName.replace(" ", "%20");
            };
        };
        return theName;
    }

});

