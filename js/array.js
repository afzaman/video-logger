//Global Video Upload Module
(function localFileVideoPlayer() {
	'use strict'
  var URL = window.URL || window.webkitURL
  var displayMessage = function (message, isError) {
    var element = document.querySelector('#message')
    element.innerHTML = message
    element.className = isError ? 'error' : 'info'
  }
  var playSelectedFile = function (event) {
    var file = this.files[0]
    var type = file.type
    var videoNode = document.querySelector('video')
    var canPlay = videoNode.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    var message = 'Can play type "' + type + '": ' + canPlay
    var isError = canPlay === 'no'
    displayMessage(message, isError)

    if (isError) {
      return
    }

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
  }
  var inputNode = document.querySelector('input')
  inputNode.addEventListener('change', playSelectedFile, false)
})();

//CSV Download Code
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"}); 
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
  }
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

let timestampLog = JSON.parse(localStorage.getItem("timestampLog"));
//Create Blank Array
function initializeTimestampLog (){
    if (timestampLog === null) {
        timestampLog = [];
        updateLocalStorage(timestampLog);
    }
}

//Upload array to Localstorage
function updateLocalStorage(timestampLog){
    localStorage.setItem("timestampLog", JSON.stringify(timestampLog));
}

function Timestamp(className, time){
    this.className = className;
    this.time = time;
}

//Function Timestamp
function addTimestamp(className){
    timestampLog = JSON.parse(localStorage.getItem("timestampLog"));
    //Grab the current video time
    let video = document.getElementById("video");
    let time = video.currentTime;
    //Create a new timestamp
    let timestamp = new Timestamp(className, time);
    //Add both object name and time to the array
    timestampLog.push(timestamp);
    //Save to local storage
    updateLocalStorage(timestampLog);
    updateCounter(className);
    //Update the display
    render();
}

function updateCounter(className) {
    let btn = document.getElementById(className);
    let counter = btn.value;
    counter++;
    btn.innerText = className + " - " + counter;
    btn.value = counter;
}

function render(){
    let timestampsTable = document.getElementById("timestamps");
    timestampLog = JSON.parse(localStorage.getItem("timestampLog"));
    const html = timestampLog.map(log => `
        <tr>
        <th scope="row">${log.className}</th>
        <td>${log.time}</td>
        </tr>
        `).join('');
    timestampsTable.innerHTML = html;
}

//Factory Function Create Button
function addClassButton () {
    let buttonContainer = document.getElementById("button-container");
    let className = document.getElementById("class-name");
    let html = `
        <button class="btn btn-primary vallue=0 btn-block" id="${className.value}" onclick="addTimestamp('${className.value}')">${className.value}</button><br>
        `
    buttonContainer.innerHTML += html;
};
window.onload = function () {
    initializeTimestampLog();
    render();
  };

function clearLog () {
    timestampLog = [];
    updateLocalStorage(timestampLog);
    render();
}

var slider = document.getElementById("playBackSpeed");
var output = document.getElementById("playBackSpeedDisplay");
var vid = document.getElementById("video");
output.innerHTML = "1x"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    // var playbackRate = Math.round(Math.log(this.value));
    var playbackRate = this.value / 20;
    output.innerHTML = playbackRate + "x";
    vid.playbackRate = playbackRate;
}