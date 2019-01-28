var audio;
var audioUrl
const recordButton = document.getElementById("record");

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
        const audioBlob = new Blob(audioChunks);
        audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);
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
  element.click();
  document.body.removeChild(element);


  audio.lastModifiedDate = new Date();
  audio.name = "recording.wav";
  
  var formData = new FormData();
  formData.append("audioData",audio,"recording.wav");

  fetch('../saveAudio.php', {
    method: 'POST',
    body: formData
}).then(response => {
    console.log(response);
});
});