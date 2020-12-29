# Open-Weather-Map-REST-Client

Overview
The purpose of this exercise is to show your proficiency in using jQuery to respond to browser events, manipulate HTML elements, make Ajax calls, and process Ajax responses. You will show your ability to use these skills by building an HTML page that accesses the Open Weather Map REST API and displays the current weather and the five-day forecast for a given zip code.

This exercise is provided to give you practice applying the skills you have learned in this course, but you will not submit it to your instructor nor will it be graded.

You should complete this exercise before continuing on with the course.
If you have problems completing this exercise, review the course content up to this point and try again.
Contact an instructor or TA if you have questions about this exercise or cannot resolve problems on your own.
Remember to sync your code with your classwork repository after you have completed the exercise.
Instructions
In order to complete this lab successfully, you will have to analyze and understand the Open Weather Map API. The first step in accessing this API is to obtain an API Key. Calls made without the API key will be rejected by the service. You can obtain your key here:

Open Weather Map's How to Start page (Links to an external site.)
Sign up for the free account. You will need this to generate the API key required for this exercise. This page also explains how to use the API key in the URL of your Ajax calls.

Requirements
This exercise requires that you use the following API calls:

Current Weather Data - http://openweathermap.org/current
5 Day/3 Hour Forecast - http://openweathermap.org/forecast5

Requirements
Your goal is to create an HTML page (and the associated CSS and JavaScript files) that matches the functionality outlined in the requirements, wireframes, and screenshots below.

Restrictions and Guidance
Your client must use Bootstrap.
Your HTML file must be called home.html.
Your JavaScript file must be called home.js.
You must obtain and use an API Key as outlined in the Instructions section above.
Use Postman to explore the API before you begin coding.
Details
You must restrict the Zipcode entry field to digits only.
You must require that the Zipcode entry field is exactly 5 digits long.
You must use HTML5 validation and JavaScript code to validate the form input and display the error messages. Follow the pattern shown in the lessons.
The Units drop-down menu choices are "Imperial" or "Metric" (the Open Weather Map API documentation tells you how to switch between the two).
The Units drop-down must default to "Imperial".
Displaying Images from Open Weather Map
The Open Weather Map API returns the name of an image that goes along with the weather description (for example Sunny or Partly Cloudy). The API documentation is not very clear on how to access these images for display on a page so here is some additional guidance.

Consider an HTTP request and response from the API when asking for the current conditions for zip code 94090:

REQUEST GET api.openweathermap.org/data/2.5/weather?zip=94040,us

RESPONSE BODY
{
  "coord":{"lon":-122.09,"lat":37.39},
  "sys":{"type":3,"id":168940,"message":0.0297,
       "country":"US","sunrise":1427723751,"sunset":1427768967},
  "weather":[{"id":800,"main":"Clear",
       "description":"Sky is Clear","icon":"01n"}],
  "base":"stations",
  "main":{"temp":285.68,"humidity":74,
       "pressure":1016.8,"temp_min":284.82,
       "temp_max":286.48},
  "wind":{"speed":0.96,"deg":285.001},
  "clouds":{"all":0},
  "dt":1427700245,
  "id":0,
  "name":"Mountain View",
  "cod":200
}
Take note of the bolded attribute (icon) in the Response JSON. The value of this attribute (01n) is the name of a PNG image file stored on the Open Weather Map server. All Open Weather Map images are stored in this location:

http://openweathermap.org/img/w/
To access a particular image, you must append the name of the image (01n in this case) to the above URL and then append .png to the entire thing. So, in this example, the image is accessed like this:

http://openweathermap.org/img/w/01n.png
You will have to dynamically build a URL like this for the images associated with the Current Weather and each day of the 5-day forecast. (See the page description and screenshots below.)

Page Description
Your home.html page should have starting layout and behavior as follows:

The page should use Bootstrap styles where directed.
A centered row header titled "Weather Page" should be at the top with a horizontal rule underneath it.
A row containing a horizontal form should contain labels and files for the following:
Zipcode - 5 digits for validation.
Units - A select element with values of Imperial and Metric.
A button titled "Get Weather"
When a valid zip code is entered (ex: 44311) and the "Get Weather" button is clicked, two new Bootstrap row content blocks should appear:

Current Conditions in |City|
The |City| in the content block header should be replaced with the JSON data from the open weather map service (ex: Akron).
The content block should be divided into two vertical columns.
The left column should display the icon and description for the current conditions.
The right column should display the temperature, humidity, and wind data.
Five Day Forecast
Beneath the content block header should be 5 columns of data with a similar format.
Each column should have a top line consisting of a date formatted like "3 August".
Beneath the date, an icon for the weather type and description should appear.
Beneath the icon, the high and low temperatures should be listed with the proper units (C or F).
The home.html page in the browser displaying the information in the format above for zipcode 44311
Finally, if a user enters an invalid zip code (not 5 digits), then a Bootstrap contextual error background element should appear above the horizontal form. It should be 100% of the width of the screen and display a validation error: "Zip code: please enter a 5-digit zip code".
