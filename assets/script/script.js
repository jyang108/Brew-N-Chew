$.ajax({  
    url: "https://api.openbrewerydb.org/breweries?by_state=minnesota&by_city=minneapolis",
    dataType: 'json',
    async: true,
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    'd88928eafacfec3391be0d039bd9daa4');},
}).then(function(response){
    console.log(response);
})
