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
function fiveDayForecast() {
}