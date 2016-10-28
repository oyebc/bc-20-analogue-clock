document.addEventListener('DOMContentLoaded', startTimer);


$(function(){
    zoneInfo = zoneInfo.sort(function(a, b) {
        return a["countryName"] > b["countryName"]; //sort the timezone data alphabetically
    });

    var options = '';
    zoneInfo.forEach(function(item){
        var selected = '';
        if(item["countryName"] === "Nigeria" ){ 
             selected = 'selected';
        }
        var zoneOffset = Math.ceil(item.gmtOffset / 3600);
        var zoneValue = item.countryName + '  ' + item.zoneName;
        options += '<option value = "'+ zoneOffset + '"  '+ selected +' >' + 
        zoneValue + ' ' + ' (GMT ' + zoneOffset + ')'  + '</option>';
    })
    
    document.getElementById('tzSelect').innerHTML = options //map the data obtained to the select tag on the html doc
    
    });

//Set the interval between counts. 1000ms translates to 1 second
function startTimer() {
    setInterval(displayTime, 1000);
    displayTime(); //calling the function ensures time displays every time the page is loaded
     // method to play clock sound immediately page loads
}

    
//function to get current time displayed by using methods from the inbuilt Date function
function displayTime() {
    var now = new Date();
    var offset_value = document.getElementById('tzSelect').value - 1;
    var hour = now.getHours() + offset_value; //account for time offsets once zones are changed
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var timeString = formatHour(hour) + ":" + addZero(minute) + ":" + addZero(second) + " " + getPeriod(hour);
    document.querySelector("#current-time").innerHTML = timeString; //Superimpose string obtained on the current-time ID



// --- Analog clock ---//
    var canvas = document.querySelector("#clock");
    var context = canvas.getContext("2d");
     
    // Value of this set to less than half of the whole canvas to ensure clockhands do not exceed boundary
    var clockRadius = 180;
     
    // Centers the clock in the canvas
    var clockX = canvas.width / 2;  
    var clockY = canvas.height / 2;
     
    Math.TAU = 2 * Math.PI; //Introduce Tau; a superior variant of PI that specifies position with refernce to the circumference
 


    //Write function to cater for drawing the three arms of the clock
    function drawArm(progress, armThickness, armLength, armColor) {
        var armRadians = (Math.TAU * progress) - (Math.TAU/4);
        var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
        var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
 
        context.lineWidth = armThickness;
        context.strokeStyle = armColor;
 
        context.beginPath();
        context.moveTo(clockX, clockY); // Start at the center
        context.lineTo(targetX, targetY); // Draw a line outwards
        context.stroke();
    }


        /*Clears the canvas rectangle each time of extra lines
        apart from the default clock hands to account for motion of hands*/
        context.clearRect(0, 0, canvas.width, canvas.height); 

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


    //Initiate background change if the timezone is changed from the dropdown

function changeBG() {
    var zone = document.getElementById("tzSelect");
    var offset = zone.options[zone.selectedIndex].value;
    console.log (offset)
    if (offset < 0) {
        document.body.style.backgroundImage = 'url(images/flowers.jpg)'
    }
    else if (offset > 0){
        document.body.style.backgroundImage = 'url(images/forest.jpg)'
    }
    else {
        document.body.style.backgroundImage = 'url(images/dark.png)'
    }
}




