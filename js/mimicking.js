import * as pg from "./pitchGraphing.js";

var audio;
var audioUrl;
const recordButton = document.getElementById("record");
var csvDataLocation;
var rawResponse;
var audioBlob;

function record(){
  navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      recordButton.style.backgroundColor = "red";

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        audioBlob = new Blob(audioChunks,{type : 'audio/wav; codecs=MS_PCM'});
        audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);
		audio.type = "audio/wave";
      });

      setTimeout(() => {
        mediaRecorder.stop();
        recordButton.style.backgroundColor = "green";
        document.getElementById("save").href = audioUrl;
      }, 2000);
  });
};

document.getElementById("play").addEventListener("click", () => {
    audio.play();
});

document.getElementById("record").addEventListener("click", () => {
  record();
});



document.getElementById("save").addEventListener("click", () => {
  var element = document.createElement('a');
  element.setAttribute('href', audioUrl);
  element.setAttribute('download', "recording.wav");
  element.style.display = 'none';
  document.body.appendChild(element);
 //  element.click();
  document.body.removeChild(element);

  audio.lastModifiedDate = new Date();
  audio.name = "recording.wav";

  var formData = new FormData();
  formData.append("audioData",audioBlob);

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST","mimicking.php",true);
  xhttp.send(formData);
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200) {
      //put graph display here
      //console.log(this.responseText); 
	//rawResponse = this.responseText;
	//var start = rawResponse.indexOf('Pitchtier') + 26;
	//var end = rawResponse.indexOf('<!DOCTYPE html>');
	//csvData = rawResponse.substring(start,end);	
	//csvData = "time	frequency\n" + csvData;
	//console.log(csvData);
	rawResponse = this.responseText;
	var start = rawResponse.indexOf("***")+3;
	var end = rawResponse.indexOf("&&&");
	csvDataLocation = rawResponse.substring(start,end);
	console.log(csvDataLocation);
	pg.drawPitchCurve(csvDataLocation);
    }
  }; 
  // document.getElementById("recording-form").
  // fetch('mimicking.php', {
  //   method: 'POST',
  //   redirect: "follow",
  //   body: formData
  // }).then(response => {
  //     console.log(response);
  // });
});
