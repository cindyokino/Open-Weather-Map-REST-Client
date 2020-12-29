var MY_WEATHER_API_KEY = 'a2b981f27643b4c19892f48e562a9d22';


$(document).ready(function () {  

    requestButtonClick();

});


// Function for button click: validate and call the 2 forecast functions 
function requestButtonClick() {
    $('#requestButton').click(function (event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#zipCode').find('input')); 
       
        if(haveValidationErrors) {
            return false;
        }
    
        clearCurrentConditions();
        currentConditions();
        fiveDayForecast();
    })
}


// Function for Current Conditions in |City|
function currentConditions() {
    var zip = $("#zipCode").val(); 
    var unit = $('#units').val();
    var tempSymbol = " F";
    var speedSymbol = " miles/hour";

    $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=' + unit + '&appid=' + MY_WEATHER_API_KEY, 
        
        success: function(data) {
            var img = data.weather[0].icon;
            var weather = data.weather[0].main;
            var description = data.weather[0].description;

            if (unit == 'metric') {
                tempSymbol = " °C";
                speedSymbol = " km/h";
            }
                                   
            $('#cityName').append(data.name); 
            $('#leftDisplay').append('<img src=http://openweathermap.org/img/w/' + img + '.png width="80px">');
            $('#leftDisplay').append(weather + ': ' + description);

            $('#rightDisplay').append('<p>Temperature: ' + data.main.temp + tempSymbol + '</p>');
            $('#rightDisplay').append('<p>Humidity: ' + data.main.humidity + ' %</p>');
            $('#rightDisplay').append('<p>Wind: ' + data.wind.speed + speedSymbol + '</p>');
        },

        error: function () {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
        }
    })
    
    $('#currentConditionsDiv').show();
}


// Function for Five Day Forecast
function fiveDayForecast() {
}


// Function to clean Current Conditions Forecast data
function clearCurrentConditions() {
    $('#cityName').empty(); 
    $('#leftDisplay').empty();
    $('#rightDisplay').empty();
}


// second layer of validation to double-check the data and display the error messages with JavaScript
