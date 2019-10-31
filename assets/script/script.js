$(document).ready(function () {

    var foodDiv = $("#foodDiv")
    var drinkDiv = $("#drinkDiv")


    var lat;
    var lon;
    $("a").on("click", function () {
        $("header").css("visibility", "hidden");
    });

    // starts function for the brewery search
    $("#drinkSearch").on("click", function () {
        var city = $("#drinkCity").val();
        var state = $("#drinkState").val();
        var breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + encodeURI(city) + "&by_state=" + encodeURI(state);
        console.log(breweryURL);
        $.ajax({
            url: breweryURL,
            method: "GET"
        }).then(function (response) {
            var breweryResults = response;
            console.log(breweryResults);
            for (var i = 0; i < breweryResults.length; i++) {
                console.log(breweryResults[i].name);
                var breweryName = breweryResults[i].name;
                var breweryType = breweryResults[i].brewery_type;
                var brewerySite = breweryResults[i].website_url;
                var breweryInfo = breweryResults[i].city + " " + breweryResults[i].street;

                var resultRow = $("<div class='row mb-3'>")
                var resultCard = $("<div class='card col-md-12' data-aos='zoom-in'>")
                var resultContent = $("<div class='card-body'>")
                var resultName = $("<h2 class='card-title'>")
                var resultType = $("<h5 class='card-subtitle'>")
                var resultInfo = $("<h4 class='card-text'>")
                var resultLink = $("<button class='btn btn-outline-secondary'>Visit Website</button>")

                resultInfo.text(breweryInfo);
                resultName.text(breweryName);
                resultType.text(breweryType);
                resultLink.attr("href", brewerySite);

                $("#drinkDivContainer").append(resultRow);
                resultRow.append(resultCard);
                resultCard.append(resultContent);
                resultContent.append(resultName);
                resultContent.append(resultType);
                resultContent.append(resultInfo);
                resultContent.append(resultLink);
            };
        });

        $("#drinkDiv").hide();

    });

    $("#location").on("click", function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.latitude;
        });
    })
    // starts function for restaurant search
    $("#foodSearch").on("click", function () {
        var keyWord = $("#foodType").val().trim();
        var chooseSorting = $("#selectSorting").val();
        if(chooseSorting === "distance"){
            chooseSorting = "real_distance";
        }
        if (lat === undefined) {
            $("#message").text("Please Enable Location Services");
        }
        else if(keyWord === ""){
            $("#message").text("Please Enter A Type Of Food");
        }
        else if(chooseSorting === ""){
            $("#message").text("Please Select A Type Of Sorting");
        }
        else {
            var theSorting = "real_distance";
            var zomatoUrl = "https://developers.zomato.com/api/v2.1/search?q=" + encodeURI(keyWord) + "&lat=" + lat + "&lon=" + lon +"&sort=" + chooseSorting;
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
                var theFoodresult = response;
                for (i = 0; i < theFoodresult.restaurants.length; i++) {
                    var restaurantName = response.restaurants[i].restaurant.name;
                    var restaurantPhone = response.restaurants[i].restaurant.phone_numbers;
                    var restaurantLocation = response.restaurants[i].restaurant.location.address;
                    // var newDiv = $("<div>");
                    // var nameTag = $("<h3>");
                    // var restNumber = $("<p>");
                    // var restAddress = $("<p>");
                    // nameTag.text(restaurantName);
                    // restNumber.text(restaurantPhone);
                    // restAddress.text(restaurantLocation);
                    // newDiv.append(nameTag);
                    // newDiv.append(restNumber);
                    // newDiv.append(restAddress);
                    // $("#foodResults").append(newDiv);

                    var resultRow = $("<div class='row mb-3'>")
                    var resultCard = $("<div class='card col-md-12' data-aos='zoom-in'>")
                    var resultContent = $("<div class='card-body'>")
                    var resultName = $("<h2 class='card-title'>")
                    var resultSub = $("<h5 class='card-subtitle'>")
                    var resultInfo = $("<h4 class='card-text'>")
                    // var resultLink = $("<button class='btn btn-outline-secondary'>Visit Website</button>")
    
                    resultInfo.text(restaurantLocation);
                    resultName.text(restaurantName);
                    resultSub.text(restaurantPhone);
                    // resultLink.attr("href", brewerySite);
    
                    $("#foodDivContainer").append(resultRow);
                    resultRow.append(resultCard);
                    resultCard.append(resultContent);
                    resultContent.append(resultName);
                    resultContent.append(resultSub);
                    resultContent.append(resultInfo);
                    // resultContent.append(resultLink);
                }
            });
        }
        $("#foodDiv").hide();
    });


    $(".button").on("click", function () {
        var dataID = $(this).attr("data-id");
        $("#searchFields").css("display", "block")
        $("header").css("display", "none");
        if (dataID === "foodDiv") {
            foodDiv.css("display", "block");
            $("#drinkDivContainer").hide();
        } else if (dataID === "drinkDiv") {
            drinkDiv.css("display", "block");
            $("#foodDivContainer").hide();
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

