$(document).ready(function () {
    var resultCard = $("<div class='card-body'>")
    var resultName = $("<div class='card-title'>")
    var resultType = $("<h5 class='card-subtitle'>")
    var resultInfo = $("<h3 class='card-text'>")
    var resultLink = $("<button class='btn btn-outline-secondary'>Visit Website</button>")


    $("a").on("click", function () {
        $("header").css("visibility", "hidden");
    });

    // navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log(position);
    //   });

    // starts function for the brewery search

   

    $("#drinkSearch").on("click", function () {
        var city = $("#drinkCity").val();
        var state = $("#drinkState").val();
        var breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + encodeURI(city) + "&by_state=" + encodeURI(state);
        // var breweryName = breweryURL.name;
        // var breweryType = breweryURL.brewery_type;
        // var brewerySite = breweryURL.website_url;
        // console.log(breweryName + breweryType + brewerySite);


        // var breweryName = breweryURL[1];


        // $("#drinkResults").append(breweryName);


        console.log(breweryURL);
        $.ajax({
            url: breweryURL,
            method: "GET"
        }).then(function (response) {
            var breweryURL = response;
            // console.log(theResult);
            for (i = 0; i < breweryURL.length; i++) {
                console.log(breweryURL.length);
                var breweryName = breweryURL[i].name;
                var breweryType = breweryURL[i].brewery_type;
                var brewerySite = breweryURL[i].website_url;

                resultName.text(breweryName);
                resultType.text(breweryType);
                resultLink.attr("href", brewerySite);

                $("main").append(resultCard);
                resultCard.append(resultName);
                resultCard.append(resultType);
                resultCard.append(resultLink);

            };


        });
    });


});


// starts function for restaurant search
$("#foodSearch").on("click", function () {
    var city = $("#foodCity").val().trim();
    var keyWord = $("#foodType").val().trim();

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

$("#home").on("click", function () {
    var foodDiv = $("#foodDiv")
    var drinkDiv = $("#drinkDiv")
    $("header").css("display", "block");
    $("header").css("visibility", "visible");
    foodDiv.css("display", "none");
    drinkDiv.css("display", "none");
    $("#searchFields").css("display", "none")
    $("#spaceArea").css("display", "none")

});
});

