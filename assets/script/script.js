$(document).ready(function () {
    $("a").on("click", function () {
        $("header").css("visibility", "hidden");
    });

    // starts function for the brewery search
    $("#drinkSearch").on("click", function () {
        var initialBreweryURL = "https://api.openbrewerydb.org/breweries?by_city={cityname}&by_state={state}";
        var city = $("#drinkCity").val();
        var state = $("#drinkState").val();

        // replaces spaces with %20
        var city = changeTheSpaces(city);
        var state = changeTheSpaces(state);


        // for (var i = 0; i < state.length; i++) {
        //     if (state.charAt(i) === " ") {
        //         var state = state.replace(" ", "%20");
        //     };
        // };

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

    // starts function for restaurant search
$("#foodSearch").on("click", function(){
    var city = $("#foodCity").val().trim();
    var keyWord = $("#foodType").val().trim();

    var city = changeTheSpaces(city);
    var keyWord = changeTheSpaces(keyWord);

    var zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + city + "&entity_type=city&q=" + keyWord;

    // ajax for zomato
    $.ajax({
        url: zomatoUrl,
        dataType: 'json',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'd88928eafacfec3391be0d039bd9daa4');
        },
    }).then(function (response) {
        console.log(response);
    });
    console.log(zomatoUrl)
})


    $(".button").on("click", function () {
        var foodDiv = $("#foodDiv")
        var drinkDiv = $("#drinkDiv")
        var dataID = $(this).attr("data-id");
        $("#searchFields").css("display", "block")
        $("header").css("display", "none");
        if (dataID === "foodDiv") {
            foodDiv.css("display", "block");
        } else if (dataID === "drinkDiv") {
            drinkDiv.css("display", "block");
        } else if (dataID === "both") {
            foodDiv.css("display", "block");
            $("#spaceArea").css("display", "block")
            drinkDiv.css("display", "block");
            
        }
    });

    $("#home").on("click", function(){
        var foodDiv = $("#foodDiv")
        var drinkDiv = $("#drinkDiv")
        $("header").css("display", "block");
        $("header").css("visibility", "visible");
        foodDiv.css("display", "none");
        drinkDiv.css("display", "none");
        $("#searchFields").css("display", "none")
        $("#spaceArea").css("display", "none")
    
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

