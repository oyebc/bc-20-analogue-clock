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

