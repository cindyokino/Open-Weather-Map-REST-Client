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
    })

    currentConditions();
    fiveDayForecast();
}


// Function for Current Conditions in |City|
function currentConditions() {
    $('#requestButton').click(function (event) {

        $.ajax({
           type: 'POST',
           url: 'https://tsg-contactlist.herokuapp.com/contact',
           data: JSON.stringify({
                firstName: $('#addFirstName').val(),
                lastName: $('#addLastName').val(),
                company: $('#addCompany').val(),
                phone: $('#addPhone').val(),
                email: $('#addEmail').val()
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               $('#errorMessages').empty();
               $('#addFirstName').val('');
               $('#addLastName').val('');
               $('#addCompany').val('');
               $('#addphone').val('');
               $('#addEmail').val('');
               loadContacts();
           },
           error: function () {
               $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
           }
        })
    })
}


// Function for Five Day Forecast
function fiveDayForecast(){
    $('#requestButton').click(function (event){
    var zipCode = $('#zipCode').val();
    $.ajax({
        type:'GET',
        url:'https://api.openweathermap.org/data/2.5/forecast?zip='+$('#zipCode').val()+',us&appid=put you key here',
        
        success: function(results){
            var list = results.list;
            var min_temps = [];
            var max_temps = [];
            var icons = [];
            var weathers = [];
            var date = list[0].dt_txt.split(" ")[0];
            var days = [date];
            var tmp_min = 1000;
            var tmp_max = -1000;
            
            $.each(list, function(index, forecast){
                
                if (index%7===0){
                    icons.push("http://openweathermap.org/img/w/"+forecast.weather[0].icon+".png");
                    weathers.push(forecast.weather[0].main);
                }
                if (forecast.main.temp_min<tmp_min){
                    tmp_min = forecast.main.temp_min;
                }
                if (forecast.main.temp_max>tmp_max){
                    tmp_max = forecast.main.temp_max;
                }
                if (forecast.dt_txt.split(" ")[0] !== date){
                    date = forecast.dt_txt.split(" ")[0];
                    days.push(displayDate(date));
                    min_temps.push(tmp_min);
                    max_temps.push(tmp_max);
                    tmp_min = 1000;
                    tmp_max = -1000;                    
                }
            });
            min_temps.push(tmp_min);
            max_temps.push(tmp_max);
            
            var i;
            for (i = 0; i < 5; i++){                
                var contentcol = $('#day'+(i+1));
                contentcol.empty();
                var img = document.createElement("img");
                img.src = icons[i];
                var col = '';
                col += '<tr>';
                col += '<td style="text-align:center;">' + days[i] + '</td>';
                col += '</tr>';                

                contentcol.append(col);
                contentcol.append(img);
                contentcol.append('</td>'+ weathers[i] + '</td>');
                contentcol.append('<td>H ' + max_temps[i] + ' L ' + min_temps[i] + '</td>');
            }
        }
    });
    });
}

function checkAndDisplayValidationErrors(input) {
    $('#errorMessages').empty();
    
    var errorMessages = [];
    
    input.each(function() {
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }  
    });
    
    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message) {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}
