var queryUrl = "https://developers.zomato.com/api/v2.1/search?q=";
var apiKey = "&apikey=d88928eafacfec3391be0d039bd9daa4";


$.ajax({
    url: queryUrl + "getAllCategories" + apiKey,
    method: "GET"

});

    .then(function(response) {
        console.log(response);
    });





