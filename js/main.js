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

function addTimestamp (className) {
    let timestampsBox = document.getElementById("timestamps");
    let video = document.getElementById("video");
    let timestamp = video.currentTime;
    html = `
        <tr>
        <th scope="row">${className}</th>
        <td>${timestamp}</td>
        </tr>
        `;
    timestampsBox.innerHTML += html;
}

function addClassButton () {
    let buttonContainer = document.getElementById("button-container");
    let className = document.getElementById("class-name");
    let html = `
        <button class="btn btn-primary btn-block" onclick="addTimestamp('${className.value}')">${className.value}</button><br>
        `
    buttonContainer.innerHTML += html;
};