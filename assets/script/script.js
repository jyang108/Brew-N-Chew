$(document).ready(function () {
    var resultCard = $("<div class='card-body'>")
    var resultName = $("<div class='card-title'>")
    var resultInfo = $("<h3 class='card-text>")


    $("a").on("click", function () {
        $("header").css("visibility", "hidden");
    });

    // navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log(position);
    //   });

    // starts function for the brewery search

    var resultCard = $("<div class='card'>")

    $("#drinkSearch").on("click", function () {
        var city = $("#drinkCity").val();
        var state = $("#drinkState").val();
        var breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + encodeURI(city) + "&by_state=" + encodeURI(state);
        var breweryName = breweryURL.name;
        var breweryType = breweryURL.brewery_type;
        var brewerySite = breweryURL.website_url;
        console.log(breweryName + breweryType + brewerySite);

        
        // $("#drinkResults").append(breweryName);

        console.log(breweryURL);
        $.ajax({
            url: breweryURL,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < response.length; i++ ) {
            console.log(response[i].name);
            resultName.text(response[i].name);
            resultInfo.text(response[i].city + response[i].street);
            
            $("main").append(resultCard);
            resultCard.append(resultName);
            resultCard.append(resultInfo);

            }
        });
        
        $("#foodDiv").css("display", "none");
    });

    // starts function for restaurant search
$("#foodSearch").on("click", function(){
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
});

