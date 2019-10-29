$(document).ready(function () {

    // var resultRow =$("<div class='row'>")
    // var resultCard = $("<div class='card col-md-5'>")
    // var resultContent = $("<div class='card-body'>")
    // var resultName = $("<h2 class='card-title'>")
    // var resultType = $("<h5 class='card-subtitle'>")
    // var resultInfo = $("<h3 class='card-text'>")
    // var resultLink = $("<button class='btn btn-outline-secondary'>Visit Website</button>")
    

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
            var breweryResults = response;
            console.log(breweryResults);
            for (var i = 0; i < breweryResults.length; i++) {
                console.log(breweryResults[i].name);
                var breweryName = breweryResults[i].name;
                var breweryType = breweryResults[i].brewery_type;
                var brewerySite = breweryResults[i].website_url;

                var resultRow =$("<div class='row'>")
                var resultCard = $("<div class='card col-md-5'>")
                var resultContent = $("<div class='card-body'>")
                var resultName = $("<h2 class='card-title'>")
                var resultType = $("<h5 class='card-subtitle'>")
                var resultInfo = $("<h3 class='card-text'>")
                var resultLink = $("<button class='btn btn-outline-secondary'>Visit Website</button>")

                resultName.text(breweryName);
                resultType.text(breweryType);
                resultLink.attr("href", brewerySite);

                $("main").append(resultRow);
                resultRow.append(resultCard);
                resultCard.append(resultContent);
                resultContent.append(resultName);
                resultContent.append(resultType);
                resultContent.append(resultLink);
            };
        });
        
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
        if (lat === undefined) {
            alert("need to know your location");
        }
        else {
            var keyWord = $("#foodType").val().trim();
            var zomatoUrl = "https://developers.zomato.com/api/v2.1/search?q=" + encodeURI(keyWord) + "&lat=" + lat + "&lon=" + lon;
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
        }
    });


    $(".button").on("click", function () {
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

