//  9797b0cab9598da515a7cb02493600e9
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9797b0cab9598da515a7cb02493600e9

$(document).ready(function(){

    let city;
    let queryURL;

    $("#search").on("click", function(event){
        event.preventDefault();

        city = $("#searchFor").val();
        $("#searchFor").empty();
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9797b0cab9598da515a7cb02493600e9";
        console.log(queryURL);
        getCity();
        setCity();
    })
        
    function getCity(){

        $.ajax({
            url : queryURL,
            method : "GET"
        }).then(function(response){
            console.log(response);

        });

    }

    // clean up inputs and prevent duplicates
    function setCity(){
        let li = $("<li>").text(city);
        
        $("#cityList").prepend(li);
    }
});