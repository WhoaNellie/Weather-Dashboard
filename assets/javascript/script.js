//  9797b0cab9598da515a7cb02493600e9
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9797b0cab9598da515a7cb02493600e9
// 
$(document).ready(function(){

    let city;
    let pastCities = [];

    $("#search").on("click", function(event){
        event.preventDefault();

        city = $("#searchFor").val();
        $("#searchFor").val('');
        getCity();
    })
        
    async function getCity(){

        let lat;
        let long;

        // current weather and coords
        try{
            let response = await $.ajax({
                url : "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9797b0cab9598da515a7cb02493600e9&units=imperial",
                method : "GET"
            });


            console.log(response);
            $("#currentCity").text(response.name);
            $("#currentTemp").text("Temperature: " + response.main.temp + " F");
            $("#currentHumid").text("Humidity: " + response.main.humidity + "%");
            $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");

            lat = response.coord.lat;
            long = response.coord.lon;

            city = response.name;
            
        }catch(error){
            console.log("weather is dumb");
            console.log(error);
        }

        // set the city name in the list
        if(!pastCities.includes(city)){
            pastCities.push(city);
        }

        setCity(pastCities);


        // UV
        $.ajax({
            url : "http://api.openweathermap.org/data/2.5/uvi?appid=9797b0cab9598da515a7cb02493600e9&lat="+lat+"&lon="+long,
            method : "GET"
        }).then(function(response){
            console.log(response);
            $("#currentUV").text("UV Index: " + response.value);
        });

        // 5-day
        $.ajax({
            url : "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=9797b0cab9598da515a7cb02493600e9&units=imperial",
            method : "GET"
        }).then(function(response){
            console.log(response);

            $("#fiveDay").empty();
            $("#fiveDay").append($("<h2>Five-Day Forecast</h2>"));

            for(let i = 0; i < 5; i++){

                let totalTemp = 0;
                let totalHumid = 0;
                for (let j = i*8; j < i*8 + 7; j++) {
                    totalTemp = totalTemp + response.list[j].main.temp;

                    totalHumid = totalHumid+response.list[j].main.humidity;
                }

                totalTemp = (totalTemp/8).toFixed(2);
                totalHumid = Math.round(totalHumid/8);

                let day = $("<div>");
                let temp = $("<p>").text("Temp: " + totalTemp + " F");
                let humid = $("<p>").text("Humidity: " + totalHumid + "%");

                day.append(temp);
                day.append(humid);

                $("#fiveDay").append(day);
    
            }


        });
        

    }

    $("#cityList").on("click", ".pastCity", function(){
        city = $(this).attr("data-city");
        getCity();
    })

    // clean up inputs and prevent duplicates
    // alphapetize?
    function setCity(cities){
        $("#cityList").empty();
        
        for(let i = 0; i < cities.length; i++){
            let li = $("<li>");
            let a = $("<a>").attr({
                href : "#",
                class : "pastCity",
                "data-city" : cities[i]
            });
            a.text(cities[i]);

            li.append(a);
            $("#cityList").append(li);
        }
    }
});