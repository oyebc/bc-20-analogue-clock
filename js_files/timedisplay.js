document.addEventListener('DOMContentLoaded', startTimer);

  // Get timezone data from api and sort according to zone names

  $.get("https://api.timezonedb.com/v2/list-time-zone?key=4E8GH2Z6KVYV&format=json", function(data){
    zones = data.zones.sort(function(a, b){return a['zoneName'].toLowerCase() > b['zoneName'].toLowerCase();
    });

    var options = '';
    zones.forEach(function(item){
        selected = '';
        if(item['zoneName'].toLowerCase() === 'africa/lagos' ){
             selected = 'selected ="selected"';
        }
        options += '<option value="'+ (item.gmtOffset/3600) + '" ' + selected + '>' + item.zoneName + '</option>';
    })
    document.getElementById('tzSelect').innerHTML = options
    });

  //Set time interval
function startTimer() {
    setInterval(displayTime, 1000);
    // displayTime();
}

    //function to get current time
function displayTime() {
    audio.play() //play tick tock sound
    var now = new Date();
    var offset_value = document.getElementById('tzSelect').value-1
    var hour = now.getHours() + offset_value;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // Digital time
    var timeString = formatHour(hour) + ":" + addZero(minute) + ":" + addZero(second) + " " + getPeriod(hour);
    document.querySelector("#current-time").innerHTML = timeString;


     // --- Analog clock ---//
    var canvas = document.querySelector("#clock");
    var context = canvas.getContext("2d");

    //make changes to the clock size
    var clockRadius = 180;
    // Centers the clock in the canvas
    var clockX = canvas.width / 2;
    var clockY = canvas.height / 2;

    Math.TAU = 2 * Math.PI;

    //Initiate drawing on the canvas created

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
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawArm(hour / 12, 5, 0.30, '#FFD700'); // Draw Hour hand, set color to gold
    drawArm(minute / 60,  2, 0.50, '#FFD700'); // Draw Minute hand, set color to gold
    drawArm(second / 60,  1, 0.55, '#FF0000'); // Draw Second hand, set color to red

}

    // Function will add extra zero behind, if time is less than 10 so as to always display 2 digits
function addZero(num) {
    if (num < 10) {
        return "0" + String(num);
    }
    else {
        return String(num);
    }

}
    // Ensure the time is in the 24hr format

function formatHour(hour) {
    var new_hour = hour % 12;
    if (new_hour == 0) {
        new_hour = 12;
    }
    return String(new_hour)
}

    //Initiate background change if the timezone is changed from the dropdown

function changeBG() {
    var zone = document.getElementById("tzSelect");
    var offset = zone.options[zone.selectedIndex].value;
    console.log (offset)
    if (offset < 0) {
        document.body.style.backgroundImage = 'url(images/drippingbulbs.jpg)'
    }
    else if (offset > 0){
        document.body.style.backgroundImage = 'url(images/nature.jpg)'
    }
    else {
        document.body.style.backgroundImage = 'url(images/abstract-music-speaker.jpg)'
    }
}


