$.ajax({  
    url: "https://developers.zomato.com/api/v2.1/search?entity_id=minneapolis&entity_type=city&q=burgers",
    dataType: 'json',
    async: true,
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    'd88928eafacfec3391be0d039bd9daa4');},
}).then(function(response){
    console.log(response);
})