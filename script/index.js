document.addEventListener('DOMContentLoaded', startTimer);


$(function(){

  // var now = moment();
  // var momentZoneInfo =  moment.tz.names();
  // var timezone = moment.tz.guess();
  // var tmz = moment.tz.zone(timezone);
  zoneInfo = zoneInfo.sort(function(a, b) {
    return a["countryName"] > b["countryName"]; //sort the timezone data alphabetically
  });

  var options = '';
  zoneInfo.forEach(function(item){
    var selected = '';
    if(item["countryName"] === "Nigeria" ){ 
      selected = 'selected';
    }
    
    zoneOffset = Math.ceil(item.gmtOffset / 3600);
    var displayedOffset= formatOffset(zoneOffset);
    var zoneValue = item.countryName + ' - ' + item.zoneName;
    options += '<option value = "'+ zoneOffset + '"  '+ selected +' >' + 
    zoneValue + ' ' + ' (GMT' + displayedOffset + ')'  + '</option>';

    // options += '<option value = "'+ moment.tz.zone(timezone) + '"  '+ selected +' >' + 
    // item + '</option>';
  })
    
  document.getElementById('tzSelect').innerHTML = options //map the data obtained to the select tag on the html doc
    
  });

//Set the interval between counts. 1000ms translates to 1 second
function startTimer() {
  setInterval(displayTime, 1000);
  displayTime(); //calling the function ensures time displays every time the page is loaded
}

    
//function to get current time displayed by using methods from the inbuilt Date function
function displayTime() {
  var now = new Date();
  var offset_value = document.getElementById('tzSelect').value - 1;
  var hour = now.getHours() + offset_value; //accounts for time offsets once a particular timezone is selected
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var timeString = formatHour(hour) + ":" + addZero(minute) + ":" + addZero(second) + " " + getPeriod(hour);
  document.querySelector("#current-time").innerHTML = timeString; //Superimposes string obtained on the current-time ID



// --- Analog clock ---//
  var canvas = document.querySelector("#clock");
  var context = canvas.getContext("2d");
     
  // Value of this set to less than half of the whole canvas to ensure clock-hands do not exceed boundary
  var clockRadius = 180;
     
  // Centers the clock in the canvas
  var clockX = canvas.width / 2;  
  var clockY = canvas.height / 2;
     
  TAU = 2 * Math.PI; //Introduce Tau; a variant of PI that specifies position round the circle with reference to the circumference
 


  //Write function to cater for drawing the three arms of the clock
  function drawArm(progress, armThickness, armLength, armColor) {
    var armRadians = (TAU * progress) - (TAU/4); //ensures tracing starts from 12:00(North)
    var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
    var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
 
    context.lineWidth = armThickness;
    context.strokeStyle = armColor;
 
    context.beginPath(); //initiates the drawing process
    context.moveTo(clockX, clockY); // Start at the center
    context.lineTo(targetX, targetY); // Draw a line outwards
    context.stroke(); //Does the actual imprint of the object drawn
  }

    context.clearRect(0, 0, canvas.width, canvas.height); //Clears the canvas rectangle every now and then of any lines drawn

    drawArm(hour / 12, 8, 0.50, '#000000'); // call draw arm method to draw Hour hand
    drawArm(minute / 60,  4, 0.75, '#000000'); // call draw arm method to draw Minute hand
    drawArm(second / 60,  2, 1.00, '#FF0000'); // call draw arm method to draw Second hand
}


//function created to add zero behind single digit values in the clock display
function addZero(num) {
  if (num < 10) {
    return "0" + String(num);
  }
  else {
    return String(num);
  }

}
    // formats 24hrs to 12hrs
function formatHour(hour) {
  var new_hour = hour % 12;
  if (new_hour == 0) {
    new_hour = 12;
  }
  return String(new_hour)
}

// returns AM if hour is less than 12 and PM if not
function getPeriod(hour) {
  return (hour < 12) ? "AM" : "PM";
}
    
function formatOffset(zoneOffset){

  if(zoneOffset < 0)
    return " - "+ Math.abs(zoneOffset);
  else if(zoneOffset > 0)
    return " + "+ zoneOffset;
  else
    return "";
}




