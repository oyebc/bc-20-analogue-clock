document.addEventListener('DOMContentLoaded', startTimer)

$.get("https://api.timezonedb.com/v2/list-time-zone?key=LOHJU4QICLFS&format=json", function(data){
    zones = data.zones.sort(function(a, b) {
        return a['zoneName'].toLowerCase() - b['zoneName'].toLowerCase();
    });

    var options = '';
    zones.forEach(function(item){
        selected = '';
        if(item['zoneName'].toLowerCase() === 'africa/lagos' ){
             selected = 'selected ="selected"';
        }
        options += '<option value = "'+ (item.gmtOffset/3600) + '" ' + selected + '>' + item.zoneName + "                        GMT   " 
        + (+item.gmtOffset/3600) + '</option>';
    })

    document.getElementById('tzSelect').innerHTML = options
    });


//Set the interval between counts. 1000ms translates to 1 second
function startTimer() {
    setInterval(displayTime, 1000);
}

    
//function to get current time
function displayTime() {
    audio.play() // method to play clock sound immediately page loads
    var now = new Date();
    var offset_value = document.getElementById('tzSelect').value - 1
    var hour = now.getHours() + offset_value;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    
    
    // Digital time
    var timeString = day + "-" + month + "-" + year + " " + addZero(formatHour(hour)) + 
        ":" + addZero(minute) + ":" + addZero(second) + " " + 
        getPeriod(hour);
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

        context.beginPath(); //method to initiate revolution of hands of the clock
        context.moveTo(clockX, clockY); // Start at the center
        context.lineTo(targetX, targetY); // Draw a line outwards
        context.stroke();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawArm(hour / 12, 6, 0.50, '#08286D'); // Draw Hour hand, set color to navy blue
    drawArm(minute / 60,  4, 0.8, '#08286D'); // Draw Minute hand, set color to navy blue
    drawArm(second / 60,  1, 1.1, '#FF0000'); // Draw Second hand, set color to red

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




